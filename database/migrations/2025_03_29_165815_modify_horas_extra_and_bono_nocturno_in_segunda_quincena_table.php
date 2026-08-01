<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyHorasExtraAndBonoNocturnoInSegundaQuincenaTable extends Migration
{
    /**
     * Ejecuta las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('segunda_quincena', function (Blueprint $table) {
            // Modificar la columna horas_extra para que sea decimal(10,2) en lugar de integer
            $table->decimal('horas_extra', 10, 2)->nullable()->change();
            // Asegurar que la columna bono_nocturno sea decimal(10,2)
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
        Schema::table('segunda_quincena', function (Blueprint $table) {
            // Revertir horas_extra a integer (como estaba originalmente)
            $table->integer('horas_extra')->nullable()->change();
            // Se mantiene bono_nocturno como decimal(10,2) o se puede ajustar según sea necesario
            $table->decimal('bono_nocturno', 10, 2)->nullable()->change();
        });
    }
}
