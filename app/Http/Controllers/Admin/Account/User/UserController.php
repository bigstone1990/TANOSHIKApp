<?php

namespace App\Http\Controllers\Admin\Account\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Account\User\StoreUserRequest;
use App\Http\Requests\Admin\Account\User\UpdateUserRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Exception;
use App\Jobs\SendUserCreatedMail;
use App\Exceptions\OptimisticLockException;

use App\Models\User;
use App\Models\Office;
use App\Enums\Account\AccountRoleType;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $staff = User::select('id', 'office_id', 'name', 'kana', 'email', 'can_manage_job_postings', 'can_manage_groupings')
        ->with(['office:id,name'])
        ->where('role', intval(AccountRoleType::STAFF->value))
        ->orderBy('id')
        ->get();

        $members = User::select('id', 'office_id', 'name', 'kana', 'email', 'can_manage_job_postings', 'can_manage_groupings')
        ->with(['office:id,name'])
        ->where('role', intval(AccountRoleType::MEMBER->value))
        ->orderBy('id')
        ->get();

        return Inertia::render('Admin/Account/User/Index', [
            'staff' => $staff,
            'members' => $members,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $roleTypeOptions =  AccountRoleType::options();

        $offices = Office::select('id', 'name')
            ->orderBy('id')
            ->get()
            ->prepend(['id' => 0, 'name' => '未所属']);

        return Inertia::render('Admin/Account/User/Create', [
            'roleTypeOptions' => $roleTypeOptions,
            'offices' => $offices,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        try {
            $password = Str::random(8);
            $user = null;

            DB::transaction(function () use ($request, &$user, $password) {
                $user = User::create([
                    'office_id' => intval($request->office) === 0 ? null : intval($request->office),
                    'name' => $request->name,
                    'kana' => $request->kana,
                    'email' => $request->email,
                    'password' => Hash::make($password),
                    'role' => intval($request->role),
                    'can_manage_job_postings' => $request->can_manage_job_postings,
                    'can_manage_groupings' => $request->can_manage_groupings,
                ]);
            });

            SendUserCreatedMail::dispatch($user, $password);

            return to_route('admin.account.users.index')->with([
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
    public function show(User $user): Response
    {
        $user = User::select('id', 'office_id', 'name', 'kana', 'email', 'role', 'can_manage_job_postings', 'can_manage_groupings')
            ->with(['office:id,name'])
            ->findOrFail($user->id);

        $roleTypeOptions =  AccountRoleType::options();
        
        return Inertia::render('Admin/Account/User/Show', [
            'user' => $user,
            'roleTypeOptions' => $roleTypeOptions,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        $roleTypeOptions =  AccountRoleType::options();

        $offices = Office::select('id', 'name')
            ->orderBy('id')
            ->get()
            ->prepend(['id' => 0, 'name' => '未所属']);

        return Inertia::render('Admin/Account/User/Edit', [
            'user' => [
                'id' => $user->id,
                'office_id' => $user->office_id,
                'name' => $user->name,
                'kana' => $user->kana,
                'email' => $user->email,
                'role' => $user->role,
                'can_manage_job_postings' => $user->can_manage_job_postings,
                'can_manage_groupings' => $user->can_manage_groupings,
                'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
            ],
            'roleTypeOptions' => $roleTypeOptions,
            'offices' => $offices,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, String $id): RedirectResponse
    {
        $user = User::find($id);

        if (!$user) {
            return to_route('admin.account.users.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '対象のデータが見つかりません',
                'flash_status' => 'error',
            ]);
        }

        try {
            DB::transaction(function () use ($request, $user) {
                if ($user->updated_at->format('Y-m-d H:i:s') !== $request->updated_at) {
                    throw new OptimisticLockException;
                }
                
                $user->office_id = intval($request->office) === 0 ? null : intval($request->office);
                $user->name = $request->name;
                $user->kana = $request->kana;
                $user->role = intval($request->role);
                $user->can_manage_job_postings = $request->can_manage_job_postings;
                $user->can_manage_groupings = $request->can_manage_groupings;
                $user->save();
            });

            return to_route('admin.account.users.show', ['user' => $user->id])->with([
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
        $user = User::find($id);

        if (!$user) {
            return to_route('admin.account.users.index')->with([
                'flash_id' => Str::uuid(),
                'flash_message' => '対象のデータが見つかりません',
                'flash_status' => 'error',
            ]);
        }

        try {
            DB::transaction(function () use ($user) {
                $user->delete();
            });

            return to_route('admin.account.users.index')->with([
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
            'ids.*' => 'integer|exists:users,id',
        ], [
            'ids.required' => '削除対象を選択してください',
            'ids.array' => '削除対象の形式が正しくありません',
            'ids.*.integer' => '無効なIDが含まれています',
            'ids.*.exists' => '存在しないデータが選択されていたのでページを更新しました。再試行してください。',
        ]);

        try {
            DB::transaction(function () use ($request) {
                User::whereIn('id', $request->ids)->delete();
            });

            return to_route('admin.account.users.index')->with([
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
