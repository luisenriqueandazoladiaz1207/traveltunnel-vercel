<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    // Aquí se pueden configurar rutas que no requieren CSRF
    protected $except = [
        // Productos
        '/api/products',
        '/api/products/*',

        // Comentarios
        '/api/comentarios',

        // Compras
        '/compras',

        // Login (Excluir para evitar error 419)
        '/login',
    ];
}
