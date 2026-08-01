<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHorasExtraAndBonoNocturnoToPrimerQuincenaTable extends Migration
{
    /**
     * Ejecuta las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('primer_quincena', function (Blueprint $table) {
            $table->integer('horas_extra')->nullable()->after('fecha_pago'); // Campo de horas extra
            $table->decimal('bono_nocturno', 10, 2)->nullable()->after('horas_extra'); // Campo de bono nocturno
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
            $table->dropColumn(['horas_extra', 'bono_nocturno']);
        });
    }
}
