<?php

// app/Models/Incidencia.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidencia extends Model
{
    use HasFactory;

    protected $fillable = ['titulo', 'descripcion', 'empleado_id', 'fecha'];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }
}
