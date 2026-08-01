<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profesionalizacion', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empleado_id')
                ->constrained('empleados')
                ->onDelete('cascade');
            $table->foreignId('variable_pago_id')
                ->default(11) // Asumiendo que 11 es el ID para "PRIMA POR PROFESIONALIZACIÓN"
                ->constrained('variables_pago')
                ->onDelete('cascade');
            $table->boolean('tiene_profesionalizacion')
                ->default(false)
                ->comment('Indica si el empleado tiene profesionalización');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profesionalizacion');
    }
};