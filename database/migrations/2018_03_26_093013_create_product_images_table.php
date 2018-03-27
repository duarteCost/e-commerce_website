<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('path');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
        DB::table('product_images')->insert(
            array(
                'name' => '41KW+CE1daL.jpg',
                'path' => 'public/images/',
                'product_id'=> '1'
            )
        );
        DB::table('product_images')->insert(
            array(
                'name' => '61qaMh0rSIL._SL1000_.jpg',
                'path' => 'public/images/',
                'product_id'=> '1'
            )
        );
        DB::table('product_images')->insert(
            array(
                'name' => '51JezJ432jL._SL1000_.jpg',
                'path' => 'public/images/',
                'product_id'=> '2'
            )
        );
        DB::table('product_images')->insert(
            array(
                'name' => '71FdJfTikFL._SL1000_.jpg',
                'path' => 'public/images/',
                'product_id'=> '2'
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_images');
    }
}
