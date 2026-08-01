<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyHorasExtraAndBonoNocturnoInPrimerQuincenaTable extends Migration
{
    /**
     * Ejecuta las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('primer_quincena', function (Blueprint $table) {
            // Convertir la columna horas_extra a decimal(10,2) para guardar con dos decimales
            $table->decimal('horas_extra', 10, 2)->nullable()->change();
            // Asegurar que bono_nocturno sea decimal(10,2)
            $table->decimal('bono_nocturno', 10, 2)->nullable()->change();
        });
    }

    /**
     * Revierte las migraciones.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('primer_quincena', function (Blueprint $table) {
            // Revertir la columna horas_extra a integer (según la migración original)
            $table->integer('horas_extra')->nullable()->change();
            // Bono nocturno se puede mantener o revertir a otro tipo según sea necesario
            $table->decimal('bono_nocturno', 10, 2)->nullable()->change();
        });
    }
}
