<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('profesionalizacion', function (Blueprint $table) {
            $table->dropForeign(['variable_pago_id']); // Eliminar la clave foránea
            $table->dropColumn('variable_pago_id');   // Eliminar la columna
        });
    }

    public function down(): void
    {
        Schema::table('profesionalizacion', function (Blueprint $table) {
            $table->foreignId('variable_pago_id')
                ->constrained('variables_pago')
                ->onDelete('cascade');
        });
    }
};

