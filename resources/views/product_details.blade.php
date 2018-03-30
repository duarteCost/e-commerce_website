@extends('layouts.app')
@section('header')
    <title>Umazon - Products</title>
    <link rel="stylesheet" href="../css/login_modal.css">
    <link rel="stylesheet" href="../css/product_details.css">
    <script src="../js/buy_button.js"></script>
    <script src="../js/cart.js"></script>
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
            <p class="price"><b>Price: {{$product->price}}</b></p>
        </div>
        <form  class="product_form">
            <input class="product_id" type="hidden" name="product_id" value="{{$product->id}}">
            <input class="amount" type="hidden" name="amount" value="{{$product->price}}">
            <input class="description" type="hidden" name="description" value="{{$product->name}}">
            <input class="currency" type="hidden" name="currency" value="{{$product->currency}}">
            <div class="buttuns">
                <a href="#"  class="btn btn-lg add_cart">
                    <span class="glyphicon glyphicon-shopping-cart"></span> Add to Cart
                </a>
                <br>
            </div>
        </form>
    </div>

    <!--modal-->
    <!-- The Modal -->
    <div id="id01" class="modal">
        <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
        <!-- Modal Content -->
        <div class="modal-content form-content">

            <div class="form-header login-form-header ">
                <div class="form-header-right">
                    <img style="width: 50%"  src="../images/logo.png">
                </div>
                <div  class="form-header-left">
                    <h4>Enjoy the Nearsoft payment services</h4>
                    <h3>Login</h3>
                </div>
                <br style="clear:both"/>
            </div>
            <div class="form-body">
                <form id="login-form" method="POST" action="index.html">
                    <div class="form-group email">
                        <label><span class="glyphicon glyphicon-user span-customized"></span> Email</label>
                        <input type="textbox" class="form-control form-element" name="email" placeholder="Email" required>
                    </div>
                    <div class="form-group password">
                        <label><span class="glyphicon glyphicon-eye-open span-customized"></span> Password</label>
                        <input type="password" class="form-control form-element" name="password" placeholder="Password" required>
                    </div>
                    <p class="submit-error" id="error-message"></p>
                    <br>
                    <button type="submit" class="btn btn-block submit-btn"><span class="glyphicon glyphicon-lock"></span>&nbsp; Login</button>
                </form>
            </div>
            <div class="modal-footer">

                <div class="pull-left"><button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button></div>
                <p>Don't have an account?<a id = "sing_up"> Sign up here</a></p><br>
            </div>
        </div>
    </div>
@endsection