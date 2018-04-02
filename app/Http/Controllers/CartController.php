<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;use Illuminate\Support\Facades\App;

class CartController extends Controller
{
    public function cart_products(Request $request){
        //$cart_products = json_encode($request->cart_products, true);
        $cart_products = $request->cart_products;
        $cart_products_quantities = json_decode($cart_products);
        $products_id_array = [];
        if($cart_products != "") {
            foreach ($cart_products_quantities as $product) {
                array_push($products_id_array, $product->product_id);
            }
            $products = DB::table('products')
                ->whereIn('id', $products_id_array)->get();
            $products_images = DB::table('product_images')
                ->whereIn('product_id', $products_id_array)->get();
            return view('cart', ['cart_products' => $products, 'cart_products_quantities' => $cart_products_quantities,
                'products_images' => $products_images, 'cart_state'=>"with products" ]);
        }
        else
        {
            return view('cart', ['cart_state'=>"empty"]);
        }
    }
}
