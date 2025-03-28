<?php

use App\Http\Middleware\VerifyCsrfToken;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\CompraController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Rutas para el perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rutas para Productos (POST y DELETE sin CSRF)
    Route::get('/api/products', [ProductController::class, 'index']);
    Route::post('/api/products', [ProductController::class, 'store'])
         ->withoutMiddleware([VerifyCsrfToken::class]);
    Route::delete('/api/products/{id}', [ProductController::class, 'destroy'])
         ->withoutMiddleware([VerifyCsrfToken::class]);

    // Rutas para Comentarios
    Route::get('/api/comentarios', [ComentarioController::class, 'index']);
    Route::post('/api/comentarios', [ComentarioController::class, 'store'])
         ->withoutMiddleware([VerifyCsrfToken::class]);

    // Rutas para Compras
    Route::get('/compras', [CompraController::class, 'index']);
    Route::post('/compras', [CompraController::class, 'store'])
         ->withoutMiddleware([VerifyCsrfToken::class]);
});

require __DIR__.'/auth.php';
