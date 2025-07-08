<?php

namespace App\Http\Controllers\Admin\Office;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Office\StoreOfficeRequest;
use App\Http\Requests\Admin\Office\UpdateOfficeRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Exception;
use App\Exceptions\OptimisticLockException;

use App\Models\Office;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $offices = Office::select('id', 'name', 'kana')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Office/Index', [
            'offices' => $offices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Office/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficeRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                Office::create([
                    'name' => $request->name,
                    'kana' => $request->kana,
                    'created_by' => Auth::guard('admins')->user()->name,
                    'updated_by' => Auth::guard('admins')->user()->name,
                ]);
            });

            return to_route('admin.offices.index')->with([
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
    public function show(Office $office): Response
    {
        return Inertia::render('Admin/Office/Show', [
            'office' => [
                'id' => $office->id,
                'name' => $office->name,
                'kana' => $office->kana,
                'created_at' => $office->created_at->format('Y-m-d H:i:s'),
                'created_by' => $office->created_by,
                'updated_at'=> $office->updated_at->format('Y-m-d H:i:s'),
                'updated_by' => $office->updated_by,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Office $office): Response
    {
        return Inertia::render('Admin/Office/Edit', [
            'office' => [
                'id' => $office->id,
                'name' => $office->name,
                'kana' => $office->kana,
                'updated_at' => $office->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfficeRequest $request, String $id): RedirectResponse
    {
        $office = Office::find($id);

        if (!$office) {
            return to_route('admin.offices.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '対象のデータが見つかりません',
                'flash_status' => 'error',
            ]);
        }

        try {
            DB::transaction(function () use ($request, $office) {
                if ($office->updated_at->format('Y-m-d H:i:s') !== $request->updated_at) {
                    throw new OptimisticLockException;
                }

                $office->name = $request->name;
                $office->kana = $request->kana;
                $office->updated_by = Auth::guard('admins')->user()->name;

                $office->save();
            });

            return to_route('admin.offices.show', ['office' => $office->id])->with([
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
        $office = Office::find($id);

        if (!$office) {
            return to_route('admin.offices.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '対象のデータが見つかりません',
                'flash_status' => 'error',
            ]);
        }

        try {
            DB::transaction(function () use ($office) {
                $office->delete();
            });

            return to_route('admin.offices.index')->with([
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
            'ids.*' => 'integer|exists:offices,id',
        ], [
            'ids.required' => '削除対象を選択してください',
            'ids.array' => '削除対象の形式が正しくありません',
            'ids.*.integer' => '無効なIDが含まれています',
            'ids.*.exists' => '存在しないデータが選択されていたのでページを更新しました。再試行してください。',
        ]);

        try {
            DB::transaction(function () use ($request) {
                Office::whereIn('id', $request->ids)->delete();
            });

            return to_route('admin.offices.index')->with([
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
