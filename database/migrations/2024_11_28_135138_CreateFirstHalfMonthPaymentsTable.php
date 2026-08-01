<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFirstHalfMonthPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('primer_quincena', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empleado_id')->constrained('empleados')->onDelete('cascade');
            $table->decimal('sueldo_basico_quincenal', 10, 2);
            $table->decimal('prima_profesionalizacion', 10, 2)->nullable();
            $table->decimal('prima_hijos', 10, 2)->nullable();
            $table->decimal('prima_antiguedad', 10, 2)->nullable();
            $table->decimal('seguro_social_obligatorio', 10, 2);
            $table->decimal('regimen_prestaciones_empleo', 10, 2);
            $table->decimal('ley_vivienda_habitat', 10, 2);
            $table->decimal('tesoreria_seguridad_social', 10, 2);
            $table->decimal('caja_ahorro', 10, 2);
            $table->date('fecha_pago');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('primer_quincena');
    }
}
