<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre'); // Campo para el nombre
            $table->string('apellido'); // Campo para el apellido
            $table->string('cedula')->unique(); // Campo para la cédula
            $table->string('centro_pago'); // Campo para el centro de pago
            $table->date('fecha_ingreso'); // Campo para la fecha de ingreso
            $table->string('tipo_personal'); // Campo para el tipo de personal
            $table->string('cargo'); // Campo para el cargo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
