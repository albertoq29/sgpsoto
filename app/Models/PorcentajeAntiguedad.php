<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PorcentajeAntiguedad extends Model
{
    use HasFactory;

    protected $table = 'porcentajes_antiguedad'; // Nombre correcto de la tabla

    protected $fillable = ['años', 'porcentaje'];

    public $timestamps = false;
}

