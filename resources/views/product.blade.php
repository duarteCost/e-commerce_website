@extends('layouts.app')
@section('header')
    <title>Umazon - Products</title>
    <link rel="stylesheet" href="../css/products.css">
@endsection
@section('content')
    <div class = "content">
            <h1>Produtos</h1>
            @foreach($products as $product)
                @foreach($products_images as $product_image)
                    @if($product->id == $product_image->product_id)
                        <div class="product">
                            <div class="product_img">
                                <a href="/product/{{$product->id}}"><img src="{{asset($product_image->path.$product_image->title)}}" align="left"></a>
                            </div>
                            <div class="product_text">
                                <p><b>{{$product->name}}</b></p>
                                <hr>
                                <p> {{str_limit($product->description,50)}}<a href="/product/{{$product->id}}">Learn more</a></p>
                                {{--<p class="availability">{{$product->availability}}</p>--}}
                                <p class="price"><b>${{$product->price}}</b></p>

                            </div>

                        </div>
                        @break
                    @endif
                @endforeach
            @endforeach
    </div>

@stop