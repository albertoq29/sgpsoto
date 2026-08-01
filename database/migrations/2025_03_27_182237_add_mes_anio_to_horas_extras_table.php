<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMesAnioToHorasExtrasTable extends Migration
{
    /**
     * Ejecuta las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('horas_extras', function (Blueprint $table) {
            $table->string('mes_anio')->after('cantidad_horas')->comment('Mes y año en formato MM-YYYY');
        });
    }

    /**
     * Revierte las migraciones.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('horas_extras', function (Blueprint $table) {
            $table->dropColumn('mes_anio');
        });
    }
}
