<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class horasextra extends Model
{
    use HasFactory;

    protected $table = 'horas_extras'; // Asegúrate que coincide con tu migración

    protected $fillable = [
        'empleado_id',
        'cantidad_horas',
        'mes_anio',
    ];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }
}
