<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.S
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->string('availability');
            $table->string('currency');
            $table->double('price');
            $table->timestamps();
        });
        DB::table('products')->insert(
            array(
                'name' => 'Echo Dot (2nd Generation) - Black',
                'description' => 'This item does not ship to Portugal. Please check other sellers who may ship internationally. Learn more
Ships from and sold by Amazon Digital Services LLC. Gift-wrap available.',
                'availability'=>'In Stock',
                'price' => 49.99,
                'currency' => 'USD',
            )
        );
        DB::table('products')->insert(
            array(
                'name' => 'Amazon Cloud Cam Security Camera, Works with Alexa',
                'description' => 'This item does not ship to Portugal. Please check other sellers who may ship internationally. Learn more',
                'availability'=>'In Stock',
                'price' => 119.99,
                'currency' => 'USD',
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
        Schema::dropIfExists('products');
    }
}
