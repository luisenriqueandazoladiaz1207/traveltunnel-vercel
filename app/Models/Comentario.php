<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    // Si prefieres especificar la tabla (en caso de que no se nombre en plural de forma estándar)
    protected $table = 'comentarios';

    protected $fillable = ['user_id', 'content', 'rating'];
}
