<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentarioController extends Controller
{
    // Listar todos los comentarios
    public function index()
    {
        return response()->json(Comentario::all());
    }

    // Crear un nuevo comentario
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'rating'  => 'required|integer|min:1|max:5',
        ]);

        // Asignamos el usuario autenticado
        $validated['user_id'] = Auth::id();

        $comentario = Comentario::create($validated);

        return response()->json($comentario, 201);
    }
}
