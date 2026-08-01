<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('variables_pago', function (Blueprint $table) {
            // Eliminamos las columnas existentes
            $table->dropColumn([
                'nombre',
                'clasificacion',
                'monto',
                'activo'
            ]);

            // Añadimos los nuevos campos como valores numéricos
            $table->decimal('sueldo_basico_quincenal', 10, 2)->default(0);
            $table->decimal('prima_profesionalizacion', 10, 2)->default(0);
            $table->decimal('prima_hijos', 10, 2)->default(0);
            $table->decimal('prima_antiguedad', 10, 2)->default(0);
            $table->decimal('cestaticket', 10, 2)->default(0);
            $table->decimal('seguro_social_obligatorio', 10, 2)->default(0);
            $table->decimal('regimen_prestaciones_empleo', 10, 2)->default(0);
            $table->decimal('ley_vivienda_habitat', 10, 2)->default(0);
            $table->decimal('tesoreria_seguridad_social', 10, 2)->default(0);
            $table->decimal('caja_ahorro', 10, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('variables_pago', function (Blueprint $table) {
            // Restaurar los campos eliminados
            $table->string('nombre');
            $table->string('clasificacion');
            $table->decimal('monto', 10, 2)->nullable();
            $table->boolean('activo')->default(true);

            // Eliminamos los nuevos campos
            $table->dropColumn([
                'sueldo_basico_quincenal',
                'prima_profesionalizacion',
                'prima_hijos',
                'prima_antiguedad',
                'cestaticket',
                'seguro_social_obligatorio',
                'regimen_prestaciones_empleo',
                'ley_vivienda_habitat',
                'tesoreria_seguridad_social',
                'caja_ahorro'
            ]);
        });
    }
};
