<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand');
            $table->string('short_des');
            $table->unsignedInteger('price');
            $table->unsignedInteger('actual_price');
            $table->string('discount');
            $table->string('image');
            $table->enum('category', ['laptop', 'mobile', 'television']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};