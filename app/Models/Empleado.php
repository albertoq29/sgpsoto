<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    /**
     * Los atributos que se pueden asignar en masa.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'apellido',
        'cedula',
        'centro_pago',
        'fecha_ingreso',
        'tipo_personal',
        'cargo',
    ];

    public function hijos()
    {
        return $this->hasMany(Hijo::class, 'empleado_id');
    }
    // Agregar esta nueva relación
    public function extrasueldo()
    {
        return $this->hasOne(ExtraSueldo::class, 'empleado_id');
    }
    public function incidencias()
    {
        return $this->hasMany(Incidencia::class, 'empleado_id');
    }

    public function profesionalizacion()
    {
        return $this->hasOne(profesionalizacion::class, 'empleado_id');
    }
    
}
