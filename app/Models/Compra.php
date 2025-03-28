<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $fillable = ['user_id', 'items', 'total'];

    // Para que el campo items se convierta automáticamente a array
    protected $casts = [
        'items' => 'array',
    ];
}
