<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;

// Public Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/laptops', [ProductController::class, 'laptops']);
Route::get('/mobiles', [ProductController::class, 'mobiles']);
Route::get('/televisions', [ProductController::class, 'televisions']);

// Protected Auth routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Auth controlled routes
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/user/orders', [OrderController::class, 'index']);
    
    // Cart controlled routes
    Route::get('/user/cart', [CartController::class, 'index']);
    Route::post('/user/cart/sync', [CartController::class, 'sync']);
    Route::post('/user/cart', [CartController::class, 'store']);
    Route::put('/user/cart/{id}', [CartController::class, 'updateQuantity']);
    Route::delete('/user/cart/clear', [CartController::class, 'clear']);
    Route::delete('/user/cart/{id}', [CartController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
