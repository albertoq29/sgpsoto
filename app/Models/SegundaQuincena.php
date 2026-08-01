<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SegundaQuincena extends Model
{
    use HasFactory;

    protected $table = 'segunda_quincena';

    protected $fillable = [
        'empleado_id',
        'sueldo_basico_quincenal',
        'prima_profesionalizacion',
        'prima_hijos',
        'prima_antiguedad',
        'cestaticket',
        'seguro_social_obligatorio',
        'regimen_prestaciones_empleo',
        'ley_vivienda_habitat',
        'tesoreria_seguridad_social',
        'caja_ahorro',
        'fecha_pago',
        'horas_extra',   // Nuevo campo
        'bono_nocturno', // Nuevo campo
        'dias_feriados', // Nuevo campo añadido
    ];

    protected $casts = [
        'fecha_pago' => 'datetime',
    ];
    
    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }
}