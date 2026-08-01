<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('variables_pago', function (Blueprint $table) {
            $table->unique('nombre', 'unique_nombre_variables_pago');
        });
    }
    
    public function down()
    {
        Schema::table('variables_pago', function (Blueprint $table) {
            $table->dropUnique('unique_nombre_variables_pago');
        });
    }
    
};
