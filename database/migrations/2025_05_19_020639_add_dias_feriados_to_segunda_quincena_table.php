<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDiasFeriadosToSegundaQuincenaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('segunda_quincena', function (Blueprint $table) {
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
        Schema::table('segunda_quincena', function (Blueprint $table) {
            $table->dropColumn('dias_feriados');
        });
    }
}
