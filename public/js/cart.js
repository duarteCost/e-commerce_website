function cart_remove(product_purchased){

    var cart_products = getCookie('cart_products')
    var cart_products = JSON.parse(cart_products);
    for (var z = 0; z<cart_products.length; z++){
        if(product_purchased['product_id'] === cart_products[z]['product_id'])
        {
            cart_products.splice(z,1);
        }
    }
    console.log('Cart remove!')
    var cart_products_str = JSON.stringify(cart_products);
    setCookie('cart_products', cart_products_str , 0.1);

}


$( document ).ready(function() {
    $('.add_cart').click(function (e) {
        var product_id = $('.product_id').val();
        var products = getCookie('cart_products');
        if (products === ""){
            var products_array = [{'product_id':product_id, 'quantity':1}];
            var products_string = JSON.stringify(products_array);
            setCookie('cart_products',products_string , 0.1);
            console.log(getCookie('cart_products'))
            window.location = "/cart?cart_products="+getCookie('cart_products')
        }
        else
        {
            console.log(products);
            var different = true;
            var products_array = JSON.parse(products);
            $.each(products_array, function( key, product_array ) {
                if(product_array['product_id'] === product_id)
                {
                    product_array['quantity']++;
                    products_string = JSON.stringify(products_array);
                    setCookie('cart_products', products_string, 0.1);
                    different = false;
                    window.location = "/cart?cart_products="+getCookie('cart_products');
                }
            });
            if(different === true)
            {
                products_array.push({'product_id': product_id, 'quantity': 1});
                console.log(products_array);
                products_string = JSON.stringify(products_array);
                setCookie('cart_products', products_string, 0.1);
                window.location = "/cart?cart_products="+getCookie('cart_products');
            }
        }

    })
    $('#go_cart').click(function (e) {

        e.preventDefault()
        window.location = "/cart?cart_products="+getCookie('cart_products');
    })


    var total = 0;
    $(".product_form").each(function(){
        var amount = $('.amount', this).val()
        var quantity = $('.quantity', this).val()
        total = total + amount * quantity;
    });
    $('#total_value').html(total.toFixed(2));

});