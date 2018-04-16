<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/nav_bar.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/cart.js"></script>
    <style type="text/css">
        .navbar{
            margin-top: 20px;
        }
    </style>
    @yield('header')
</head>
<body>
<div class="container">
    <nav class="navbar navbar-inverse">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="#" class="navbar-brand">Umazon</a>
        </div>
        <!-- Collection of nav links, forms, and other content for toggling -->
        <div id="navbarCollapse" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="/products">Products</a></li>
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Today's deals</a></li>
            </ul>
            <ul style="float:right; width: 10%"  class="nav navbar-nav navbar-right">
                <li><a id = "go_cart" class="btn-lg " href="#"><img style="width: 25px" src="http://www.hortongroup.com/hs-fs/hubfs/Services%20Rework/icons/websites%20and%20custom/ecommerce%20icon.png?t=1521730738518&width=348&height=297&name=ecommerce%20icon.png"></a></li>
            </ul>
            <ul style="float:right; width: 10%"  class="nav navbar-nav">
                <li style="width: 10%;"><a href="#">Login</a></li>
            </ul>
        </div>
    </nav>
    <div class="content">
        @yield('content')
    </div>


    {{--<footer class="footer">--}}
        {{--<div class="footer_container">--}}
            {{--<span class="text-muted">Place sticky footer content here.</span>--}}
        {{--</div>--}}
    {{--</footer>--}}
</div>
</body>
</html>



