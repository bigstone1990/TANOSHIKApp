<?php

use App\Http\Controllers\Admin\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\Account\Admin\AdminController;
use App\Http\Controllers\Admin\Office\OfficeController;

Route::prefix('admin')->name('admin.')->middleware(['auth:admins', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('top');
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
});

Route::prefix('admin')->name('admin.')->middleware('auth:admins')->group(function () {
    Route::prefix('account')->name('account.')->group(function () {
        Route::resource('admins', AdminController::class);
    });
});

Route::prefix('admin')->name('admin.')->middleware('auth:admins')->group(function () {
    Route::resource('offices', OfficeController::class);
});

Route::prefix('admin')->name('admin.')->middleware('auth:admins')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/adminAuth.php';
