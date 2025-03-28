<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompraController extends Controller
{
    // Mostrar el historial de compras del usuario autenticado
    public function index()
    {
        $user = Auth::user();
        $compras = Compra::where('user_id', $user->id)->get();

        return response()->json($compras);
    }

    // Realizar una compra
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'total' => 'required|numeric',
        ]);

        $validated['user_id'] = Auth::id();
        // Se almacena el array de items como JSON (gracias al cast del modelo)
        $compra = Compra::create($validated);

        return response()->json($compra, 201);
    }
}
