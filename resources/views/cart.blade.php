@extends('layouts.app')
@section('header')
    <title>Umazon - Products</title>
    <link rel="stylesheet" href="../css/login_modal.css">
    <link rel="stylesheet" href="../css/cart.css">
    <script src="../js/buy_button.js"></script>
@endsection
@section('content')
    <div class="product">
        <div  class="product_image  product_header">
            <p><b>Product</b></p>
        </div>
        <div   class="product_text product_header">
            <p><b>Description</b></p>
        </div>
        <div class="product_price product_header">
            <p class="price"><b>Price</b></p>
        </div>
        <div class="product_quantitaty product_header">
            <p class="price"><b>Quantity</b></p>
        </div>
    </div>
    <hr class="hr">
    @if($cart_state === "with products")
        @foreach($cart_products as $product)
            <div class="product">
                <div class="product_image">
                    @foreach($products_images as $product_image)
                        @if($product->id == $product_image->product_id)
                           <img  src="{{asset($product_image->path.$product_image->title)}}">
                            @break
                        @endif
                    @endforeach
                </div>
                <div class="product_text">
                    <p><b>{{$product->name}}</b></p>
                    <p> {{str_limit($product->description,50)}}<a href="/product/{{$product->id}}">Learn more</a></p>
                    {{--<p class="availability">{{$product->availability}}</p>--}}
                </div>
                <div class="product_price">
                    <p class="price"><b>€{{$product->price}}</b></p>
                </div>
                <div class="product_quantitaty">
                    @foreach($cart_products_quantities as $cart_product_quantity)
                        @if($cart_product_quantity->product_id == $product->id)
                            <p class="quantity"><b>{{$cart_product_quantity->quantity}}</b></p>
                            @php ($quantity = $cart_product_quantity->quantity)
                        @endif
                    @endforeach
                </div>
                <div class="product_form_div">
                    <form  class="product_form">
                        <input class="amount" type="hidden" name="amount" value="{{$product->price}}">
                        <input class="product_id" type="hidden" name="product_id" value="{{$product->id}}">
                        <input class="quantity" type="hidden" name="quantity" value={{$quantity}}>
                        <input class="description" type="hidden" name="description" value="{{$product->name}}">
                        <input class="currency" type="hidden" name="currency" value="{{$product->currency}}">
                        <div class="buy_now">
                        </div>
                    </form>
                </div>
            </div>
            <hr style="height: 10px; background-color: #0c5460; opacity: 0">
        @endforeach
        <hr class="hr">
        <div class = "buy_all">
            <p class="footer_header"><b>Subtotal:<span id = "total_value"></span></b></p>
        </div>
        @include('login_modal')
    @endif


@endsection