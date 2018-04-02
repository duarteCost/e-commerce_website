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
                'description' => 'This item does not ship to Portugal. Please check other sellers who may ship internationally.
Ships from and sold by Amazon Digital Services LLC. Gift-wrap available.',
                'availability'=>'In Stock',
                'price' => 49.99,
                'currency' => 'EUR',
            )
        );
        DB::table('products')->insert(
            array(
                'name' => 'Amazon Cloud Cam Security Camera, Works with Alexa',
                'description' => 'This item does not ship to Portugal. Please check other sellers who may ship internationally.',
                'availability'=>'In Stock',
                'price' => 119.99,
                'currency' => 'EUR',
            )
        );

        DB::table('products')->insert(
            array(
                'name' => 'Dash Cam, 4 Inch HD IPS Screen 1080p Dash Cam, Car Recorder, Dashboard Camera with G-Sensor, Parking Monitoring, HDR Night Vision , Loop RecordingMotion Detection',
                'description' => 'This item does not ship to Portugal. Please check other sellers who may ship internationally. 
Sold by SASRL and Fulfilled by Amazon. Gift-wrap available.',
                'availability'=>'In Stock',
                'price' => 	99.99,
                'currency' => 'EUR',
            )
        );

        DB::table('products')->insert(
            array(
                'name' => 'iOttie Easy One Touch 4 Dashboard & Windshield Car Mount Holder for iPhone X 8 8 Plus 7 Plus 6s Plus 6 SE Samsung Galaxy S9 S9 Plus S8 Plus S8 Edge S7 S6 Note 8 5SE',
                'description' => 'This item ships to Portugal. Want it Thursday, April 5? Order within 21 hrs 51 mins and choose AmazonGlobal Priority Shipping at checkout.
Ships from and sold by Amazon.com.',
                'availability'=>'In Stock',
                'price' => 	24.95,
                'currency' => 'EUR',
            )
        );

        DB::table('products')->insert(
            array(
                'name' => 'Bluetooth Headphone,KUPPET Mini Wireless Earphone In-Ear Earphone with 180°Rotation,Headphone for Apple IPhone 8 X 7 7 Plus 6S 6S Plus and Samsung Galaxy S7 S8 S8 Plus',
                'description' => 'This item does not ship to Portugal. Please check other sellers who may ship internationally.
Sold by NASAIBO and Fulfilled by Amazon. Gift-wrap available.',
                'availability'=>'In Stock',
                'price' => 	25.98,
                'currency' => 'EUR',
            )
        );

        DB::table('products')->insert(
            array(
                'name' => 'Pyle Car Rear View Camera and Video Monitor, IP68 Waterproof, Commerical Grade, 4 Cameras, Night Vision, 7-Inch LCD Display for Trailer, RV, Trucks, Pickup Trucks, Cargo Vans, etc.',
                'description' => 'This item ships to Portugal.
Ships from and sold by Audio Dreams.',
                'availability'=>'',
                'price' => 	180.99,
                'currency' => 'EUR',
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
