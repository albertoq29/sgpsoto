<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('extrasueldos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empleado_id')->constrained()->onDelete('cascade');
            $table->decimal('sueldo_quincenal', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('extrasueldos');
    }
};