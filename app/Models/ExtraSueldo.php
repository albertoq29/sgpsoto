<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraSueldo extends Model
{
    use HasFactory;

    protected $table = 'extrasueldos';

    protected $fillable = [
        'empleado_id',
        'sueldo_quincenal'
    ];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }
}