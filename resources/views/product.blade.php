@extends('layouts.app')
@section('content')
    <div class = "content">
            <h1>Produtos</h1>
            @foreach($products as $product)
                <div class="product">
                    <p>{{$product->name}}</p>
                </div>
            @endforeach
    </div>