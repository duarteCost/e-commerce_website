@extends('layouts.app')
@section('header')
    <title>Umazon - Products</title>
    <link rel="stylesheet" href="../css/login_modal.css">
    <link rel="stylesheet" href="../css/product_details.css">
    <script src="../js/buy_button.js"></script>
    <script src="../js/cart.js"></script>
@endsection
@section('content')
    @foreach($cart_products as $product)
        <div class="product_text">
            <p><b>{{$product->name}}</b></p>
            <hr>
            <p> {{str_limit($product->description,50)}}<a href="/product/{{$product->id}}">Learn more</a></p>
            {{--<p class="availability">{{$product->availability}}</p>--}}
            <p class="price"><b>${{$product->price}}</b></p>
            @foreach($cart_products_quantities as $cart_product_quantity)
                @if($cart_product_quantity->product_id == $product->id)
                    <p class="quantity"><b>Quantity: {{$cart_product_quantity->quantity}}</b></p>
                @endif
            @endforeach

        </div>
    @endforeach

@endsection