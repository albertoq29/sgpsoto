<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hijo extends Model
{
    use HasFactory;

    protected $fillable = [
        'empleado_id',
        'cantidad',
    ];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }

    public function variablePago()
    {
        return $this->belongsTo(VariablePago::class, 'variable_pago_id');
    }
}
