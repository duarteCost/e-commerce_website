$( document ).ready(function() {
    $('.add_cart').click(function (e) {
        var product_id = $('.product_id').val();
        var products = getCookie('products');
        if (products === ""){
            var products_array = [{'product_id':product_id, 'quantity':1}];
            var products_string = JSON.stringify(products_array);
            setCookie('products',products_string , 0.01);
            console.log(getCookie('products'))
            window.location = "/cart?cart_products="+getCookie('products')
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
                    setCookie('products', products_string, 0.01);
                    different = false;
                    window.location = "/cart?cart_products="+getCookie('products');
                }
            });
            if(different === true)
            {
                products_array.push({'product_id': product_id, 'quantity': 1});
                console.log(products_array);
                products_string = JSON.stringify(products_array);
                setCookie('products', products_string, 0.01);
                window.location = "/cart?cart_products="+getCookie('products');
            }
        }

    })
    $('#go_cart').click(function (e) {

        e.preventDefault()
        window.location = "/cart?cart_products="+getCookie('products');
    })


    var total = 0;
    $(".product_form").each(function(){
        console.log($(this))
        var amount = $('.amount', this).val()
        console.log(amount)
        var quantity = $('.quantity', this).val()
        total = total + amount * quantity;
        console.log(total)
    });
    $('#total_value').html(total.toFixed(2));

});