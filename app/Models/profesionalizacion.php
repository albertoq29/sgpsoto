<?php
// app/Models/Profesionalizacion.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profesionalizacion extends Model
{
    protected $table = 'profesionalizacion';
    
    protected $fillable = [
        'empleado_id',
        'tiene_profesionalizacion'
    ];

    protected $casts = [
        'tiene_profesionalizacion' 
    ];

    public function empleado(): BelongsTo
    {
        return $this->belongsTo(Empleado::class);
    }


}