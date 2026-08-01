<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorasExtrasTable extends Migration
{
    /**
     * Ejecuta las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('horas_extras', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('empleado_id');
            $table->integer('cantidad_horas');
            $table->timestamps();

            // Definición de la clave foránea, asumiendo que la tabla de empleados se llama "empleados"
            $table->foreign('empleado_id')
                  ->references('id')
                  ->on('empleados')
                  ->onDelete('cascade');
        });
    }

    /**
     * Revierte las migraciones.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('horas_extras');
    }
}
