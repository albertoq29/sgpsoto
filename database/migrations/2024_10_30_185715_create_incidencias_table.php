<?php

// database/migrations/xxxx_xx_xx_create_incidencias_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncidenciasTable extends Migration
{
    public function up()
    {
        Schema::create('incidencias', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descripcion');
            $table->foreignId('empleado_id')->constrained('empleados')->onDelete('cascade');
            $table->date('fecha')->default(now());
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('incidencias');
    }
}
