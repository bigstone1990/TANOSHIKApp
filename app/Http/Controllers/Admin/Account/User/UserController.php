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
    public function index()
    {
        $staff = User::select('id', 'office_id', 'name', 'kana', 'email', 'can_manage_job_postings', 'can_manage_groupings')
        ->with(['office:id,name'])
        ->where('role', intval(AccountRoleType::STAFF->value))
        ->orderBy('kana')
        ->get();

        $members = User::select('id', 'office_id', 'name', 'kana', 'email', 'can_manage_job_postings', 'can_manage_groupings')
        ->with(['office:id,name'])
        ->where('role', intval(AccountRoleType::MEMBER->value))
        ->orderBy('kana')
        ->get();

        return Inertia::render('Admin/Account/User/Index', [
            'staff' => $staff,
            'members' => $members,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roleroleTypeOptions =  AccountRoleType::options();

        $offices = Office::select('id', 'name')
            ->orderBy('kana')
            ->get()
            ->prepend(['id' => 0, 'name' => '未所属']);

        return Inertia::render('Admin/Account/User/Create', [
            'roleTypeOptions' => $roleroleTypeOptions,
            'offices' => $offices,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
