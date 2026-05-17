<?php

use App\Http\Controllers\BadController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::apiResource('/service', ServiceController::class);
Route::post('/workers/{worker}/services', [ServiceController::class, 'store']);
Route::delete('/service/{service}', [ServiceController::class, 'destroy']);
Route::get('/service', [ServiceController::class, 'index']);
Route::post('/badUsers', [BadController::class, 'store']);
