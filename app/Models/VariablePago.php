<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariablePago extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'variables_pago';

    // Campos permitidos para asignación masiva
    protected $fillable = [
        'sueldo_basico_quincenal',
        // Puedes mantener o remover el campo anterior según corresponda:
        'prima_profesionalizacion',
        'prima_hijos',
        'prima_antiguedad',
        'cestaticket',



    ];
}
