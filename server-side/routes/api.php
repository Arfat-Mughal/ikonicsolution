<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/forget-password', [ForgotPasswordController::class, 'postEmail'])->name('postEmail');
Route::post('/reset-password', [ForgotPasswordController::class,'updatePassword'])->name('updatePassword');
Route::post('/contact-us', [AuthController::class, 'contact'])->name('contact');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/me',[AuthController::class, 'me'])->name('me');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/update-user-information', [AuthController::class, 'updateProfile'])->name('updateProfile');
    Route::post('/upload-user-Image', [AuthController::class, 'uploadImage'])->name('uploadImage');
});
