<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

Route::get('/', function () {
    return 'Hello Api';
})->name('api');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rejestracja
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->name('register');

// Logowanie
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');

// Wylogowanie
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum')
    ->name('logout');
