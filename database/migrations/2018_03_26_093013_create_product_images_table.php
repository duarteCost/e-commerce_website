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
            $table->string('title');
            $table->string('path');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
        DB::table('product_images')->insert(
            array(
                'title' => '41KWCE1daL.jpg',
                'path' => 'images/',
                'product_id'=> '2'
            )
        );
        DB::table('product_images')->insert(
            array(
                'title' => '51Xo88YE2gL._SL1000_.jpg',
                'path' => 'images/',
                'product_id'=> '2'
            )
        );
        DB::table('product_images')->insert(
            array(
                'title' => '61qaMh0rSIL._SL1000_.jpg',
                'path' => 'images/',
                'product_id'=> '1'
            )
        );
        DB::table('product_images')->insert(
            array(
                'title' => '61ikAJnULvL._SL1000_.jpg',
                'path' => 'images/',
                'product_id'=> '1'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '512LVtU86dL.jpg',
                'path' => 'images/',
                'product_id'=> '3'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '81lWbJN4qUL._SL1500_.jpg',
                'path' => 'images/',
                'product_id'=> '3'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '718NVofDrCL._SL1500_.jpg',
                'path' => 'images/',
                'product_id'=> '4'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '81YqefIFZDL._SL1500_.jpg',
                'path' => 'images/',
                'product_id'=> '4'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '41NUc0XCTuL._SL1001_.jpg',
                'path' => 'images/',
                'product_id'=> '5'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '518xPbs7mBL._SL1000_.jpg',
                'path' => 'images/',
                'product_id'=> '5'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '711hEr3abeL._SL1000_.jpg',
                'path' => 'images/',
                'product_id'=> '6'
            )
        );

        DB::table('product_images')->insert(
            array(
                'title' => '711hEr3abeL._SL1000_.jpg',
                'path' => 'images/',
                'product_id'=> '6'
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
