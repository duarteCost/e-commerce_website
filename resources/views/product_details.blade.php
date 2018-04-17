@extends('layouts.app')
@section('header')
    <title>Umazon - Products</title>
    <link rel="stylesheet" href="../css/product_details.css">
    <script src="../js/common.js"></script>
    <script src="../js/config.js"></script>
    <script src="../js/buy_buttons.js"></script>
@endsection
@section('content')
    <div class="left_side">
        <div class="images_icon">
            @foreach($product_images as $product_image)
                <div class = "image_icon">
                    <img src="{{asset($product_image->path.$product_image->title)}}" align="left">
                </div>
            @endforeach
        </div>
        @foreach($product_images as $product_image)
            <div class="product_img">
                <img src="{{asset($product_image->path.$product_image->title)}}" align="left">
            </div>
            @break
        @endforeach
    </div>

    <div class="product_details">
        <div class="product_text">
            <p><b>{{$product->name}}</b></p>
            <hr>
            <p> {{$product->description}}<a href="#">Learn more</a></p>
            <p class="availability">{{$product->availability}}</p>
            <p class="price"><b>Price: €{{$product->price}}</b></p>
        </div>
        <form  class="product_form">
            <input class="product_id" type="hidden" name="product_id" value="{{$product->id}}">
            <input class="amount" type="hidden" name="amount" value="{{$product->price}}">
            <input class="quantity" type="hidden" name="quantity" value=1>
            <input class="product_name" type="hidden" name="product_name" value="{{$product->name}}">
            <input class="currency" type="hidden" name="currency" value="{{$product->currency}}">
            <br>
            <a href="#"  class="btn btn-lg add_cart">
                <span class="glyphicon glyphicon-shopping-cart"></span> Add to Cart
            </a>
            <br>
        </form>
    </div>
    {{--@include('login_modal')--}}
@endsection