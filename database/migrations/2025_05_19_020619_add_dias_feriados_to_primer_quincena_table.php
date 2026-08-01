<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDiasFeriadosToPrimerQuincenaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('primer_quincena', function (Blueprint $table) {
            $table->unsignedInteger('dias_feriados')->default(0)->after('horas_extra');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('primer_quincena', function (Blueprint $table) {
            $table->dropColumn('dias_feriados');
        });
    }
}
