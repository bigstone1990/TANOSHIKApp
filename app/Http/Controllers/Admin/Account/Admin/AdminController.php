<?php

namespace App\Http\Controllers\Admin\Account\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Account\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\Account\Admin\UpdateAdminRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Exception;
use App\Jobs\SendAdminCreatedMail;
use App\Exceptions\OptimisticLockException;

use App\Models\Admin;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $admins = Admin::select('id', 'name', 'kana', 'email')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Account/Admin/Index', [
            'admins' => $admins,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Account/Admin/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request): RedirectResponse
    {
        try {
            $password = Str::random(8);
            $admin = null;

            DB::transaction(function () use ($request, &$admin, $password) {
                $admin = Admin::create([
                    'name' => $request->name,
                    'kana' => $request->kana,
                    'email' => $request->email,
                    'password' => Hash::make($password),
                    'created_by' => Auth::guard('admins')->user()->name,
                    'updated_by' => Auth::guard('admins')->user()->name,
                ]);
            });

            SendAdminCreatedMail::dispatch($admin, $password);

            return to_route('admin.account.admins.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '登録しました',
                'flash_status' => 'success',
            ]);
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '登録に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin): Response
    {
        return Inertia::render('Admin/Account/Admin/Show', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'kana' => $admin->kana,
                'email' => $admin->email,
                'created_at' => $admin->created_at->format('Y-m-d H:i:s'),
                'created_by' => $admin->created_by,
                'updated_at'=> $admin->updated_at->format('Y-m-d H:i:s'),
                'updated_by' => $admin->updated_by,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin): Response
    {
        return Inertia::render('Admin/Account/Admin/Edit', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'kana' => $admin->kana,
                'email' => $admin->email,
                'updated_at' => $admin->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, String $id): RedirectResponse
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return to_route('admin.account.admins.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '対象のデータが見つかりません',
                'flash_status' => 'error',
            ]);
        }

        try {
            DB::transaction(function () use ($request, $admin) {
                if ($admin->updated_at->format('Y-m-d H:i:s') !== $request->updated_at) {
                    throw new OptimisticLockException;
                }

                $admin->name = $request->name;
                $admin->kana = $request->kana;
                $admin->updated_by = Auth::guard('admins')->user()->name;

                $admin->save();
            });

            return to_route('admin.account.admins.show', ['admin' => $admin->id])->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '更新しました',
                'flash_status' => 'success',
            ]);
        } catch (OptimisticLockException $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => $e->getMessage(),
                'flash_status' => 'error',
            ])->withInput();
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '更新に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id): RedirectResponse
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return to_route('admin.account.admins.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '対象のデータが見つかりません',
                'flash_status' => 'error',
            ]);
        }

        try {
            DB::transaction(function () use ($admin) {
                $admin->delete();
            });

            return to_route('admin.account.admins.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '削除しました',
                'flash_status' => 'success',
            ]);
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '削除に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:admins,id',
        ], [
            'ids.required' => '削除対象を選択してください',
            'ids.array' => '削除対象の形式が正しくありません',
            'ids.*.integer' => '無効なIDが含まれています',
            'ids.*.exists' => '存在しないデータが選択されていたのでページを更新しました。再試行してください。',
        ]);

        try {
            DB::transaction(function () use ($request) {
                Admin::whereIn('id', $request->ids)->delete();
            });

            return to_route('admin.account.admins.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => count($request->ids) . '件のデータを削除しました',
                'flash_status' => 'success',
            ]);
        } catch (Exception $e) {
            return back()->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '一括削除に失敗しました',
                'flash_status' => 'error',
            ])->withInput();
        }
    }
}
