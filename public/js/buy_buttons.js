////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       please implement these methods                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cart_remove(product_purchased){
    console.log(product_purchased);
    var cart_products = getCookie('cart_products')
    if(cart_products!=="") {
        var cart_products = JSON.parse(cart_products);
        for (var z = 0; z < cart_products.length; z++) {
            if (product_purchased['product_id'] === cart_products[z]['product_id']) {
                cart_products.splice(z, 1);
            }
        }
        console.log('Cart remove!')
        var cart_products_str = JSON.stringify(cart_products);
        setCookie('cart_products', cart_products_str, 0.1);
    }

}

function return_from_purchase() {
    var pathname = window.location.pathname;
    if(pathname === '/cart')
    {
        window.location = "/cart?cart_products="+getCookie('cart_products');
    }
    else
    {
        window.location = "/products";
    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function login_modal() { /*change*/
    //var deferred = new $.Deferred(function () {
        var $content =
            '<div class="modal">'+
            '<span class="close" title="Close Modal">&times;</span>'+
            '<div class="modal-content form-content">'+
            '<div class="form-header login-form-header">'+
            '<div class="form-header-right">'+
            '<img style="width: 50%"  src="../images/logo.png">'+
            '</div>'+
            '<div  class="form-header-left">'+
            '<h4>Enjoy the Nearsoft payment services</h4>'+
            '<h3>Login</h3>'+
            '</div>'+
            '<br style="clear:both"/>'+
            '</div>'+
            '<div class="form-body">'+
            '<form id="login-form" method="POST">'+
            '<div class="form-group email">'+
            '<label><span class="glyphicon glyphicon-user span-customized"></span> Email</label>'+
            '<input type="textbox" class="form-control form-element" name="email" placeholder="Email" required>'+
            '</div>'+
            '<div class="form-group password">'+
            '<label><span class="glyphicon glyphicon-eye-open span-customized"></span> Password</label>'+
            '<input type="password" class="form-control form-element" name="password" placeholder="Password" required>'+
            '</div>'+
            '<p class="submit-error" id="error-message"></p>'+
            '<br>'+
            '<button type="submit" class="btn btn-block submit-btn"><span class="glyphicon glyphicon-lock"></span>&nbsp; Login</button>'+
            '</form>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<div class="pull-left"><button type="button" class="cancelbtn">Cancel</button></div>'+
            '<p>Dont have an account?<a id = "sing_up"> Sign up here</a></p><br>'+
            '</div>'+
            '</div>'+
            '</div>';
        $('body').prepend($content);
        $('.cancelbtn, .close').click(function () {
            $(this).parents('.modal').fadeOut(500, function () {
                $(this).remove();
            });
            //deferred.resolve();
        });


    // });
    // return deferred.promise();

}


function Confirm(title, msg, $true, $false) { /*change*/
    var deferred = new $.Deferred(function () {
        var $content =  "<div class='confirm-modal-overlay'>" +
            "<div class='confirm-modal'><header>" +
            " <h3> " + title + " </h3> " +
            "<i class='fa fa-close'></i>" +
            "</header>" +
            "<div class='message'>" +
            " <p> " + msg + " </p> " +
            "</div>" +
            "<footer>" +
            "<div class='controls'>" +
            " <button class='button button-danger doAction'>" + $true + "</button> " +
            " <button class='button button-default cancelAction'>" + $false + "</button> " +
            "</div>" +
            "</footer>" +
            "</div>" +
            "</div>";
        $('body').prepend($content);
        $('.doAction').click(function () {
            $(this).parents('.confirm-modal-overlay').fadeOut(500, function () {
                $(this).remove();
            });
            deferred.resolve();
        });
        $('.cancelAction, .fa-close').click(function () {
            $(this).parents('.confirm-modal-overlay').fadeOut(500, function () {
                $(this).remove();
            });
            deferred.reject();
        });

    });
    return deferred.promise();

}

function Alert(title, msg) { /*change*/
    var deferred = new $.Deferred(function () {
        var $content =  "<div class='alert-modal-overlay'>" +
            "<div class='alert-modal'><header>" +
            " <h3> " + title + " </h3> " +
            "<i class='fa fa-close'></i>" +
            "</header>" +
            "<div class='message'>" +
            " <p> " + msg + " </p> " +
            "</div>" +
            // "<footer>" +
            // "<div class='controls'>" +
            // " <button class='button button-danger doAction'>" + $true + "</button> " +
            // "</div>" +
            // "</footer>" +
            "</div>" +
            "</div>";
        $('body').prepend($content);
        // $('.doAction').click(function () {
        //     $(this).parents('.confirm-modal-overlay').fadeOut(500, function () {
        //         $(this).remove();
        //     });
        //     deferred.resolve();
        // });
        setTimeout(function(){
            $('.alert-modal-overlay').fadeOut(500, function () {
                $(this).remove();
                deferred.resolve();
            });
        }, 2000);

    });
    return deferred.promise();

}

function play_loader(){
    $('.loader_container').css({ display: "block" });
    $('.content').css({opacity: "0.5"})
}

function stop_loader(){
    $('.loader_container').css({ display: "none" });
    $('.content').css({opacity: "1"})
}


function login_nearsoft_payment_provider(data) {
    return $.ajax({
        method: "POST",
        url: "https://127.0.0.1:5001/user/login",
        data: data.serializeArray()
    });
}
//Get default payment accont
function get_default_payment_account(token) {
    return $.ajax({
        method: "GET",
        url: "https://127.0.0.1:5003/aisp/payment/bank/account/default",
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", token);
        },
    });
}
function get_all_possible_payment_accounts(token, amount) {
    return $.ajax({
        method: "GET",
        url: "https://127.0.0.1:5003/aisp/payment/bank/accounts?amount="+amount,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", token);
        },
    });
}


// Get the transaction charge
function get_charge(token, bank_id, account_id) {
    return $.ajax({
        url: "https://127.0.0.1:5002/pisp/bank/"+bank_id+"/account/"+account_id+"/charge",
        type: "GET",
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization",token);
        }
    })
}

//The transaction is initiated and the result can be the concluded status or initiated all depends the transaction amount
function initiate_transaction(token, bank_id, account_id, amount, currency, description) {
    var data_serialized = {"amount": amount, "currency": currency, "description":description};
    console.log(data_serialized);
    return $.ajax({
        type:"POST",
        url: "https://127.0.0.1:5002/pisp/bank/"+bank_id+"/account/"+account_id+"/initiate-transaction-request?merchantKey="+merchantData.merchantKey,
        data:data_serialized,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", token);
        }
    })
}

//In case of transaction status is initiated its necessary answer one challenge
function answer_challenge(token, data_serialized, bank_id, account_id) {
    return $.ajax({
        type: "POST",
        url: "https://127.0.0.1:5002/pisp/bank/"+bank_id+"/account/"+account_id+"/answer-challenge?merchantKey="+merchantData.merchantKey,
        data: data_serialized,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", token);
        }
    })
}

function account_amount_verification(accounts, bank_id_default , account_id_default) {
    var result = false;
    $.each(accounts, function (key, account) {
        if (bank_id_default === account.bank_id && account_id_default === account.account_id) {
            result = true;
            return false;
        }
    });
    return result;
}

function purchase_products(token, products_array, index) {
    //products_array is the products to purchase
        if (index < products_array.length) {
            var amount = products_array[index]['amount'];
            var currency = products_array[index]['currency'];
            purchase(token, amount, currency, products_array[index]).done(function () {
                console.log("End of purchase!");
                index++;
                purchase_products(token, products_array, index);
            });

        }
        else
        {
            stop_loader();
            return_from_purchase();
        }
}




function purchase(token, amount, currency, product) {
    var deferred = new $.Deferred(function () {
        get_default_payment_account(token).done(function (data) { //get default payment account
            console.log(data);
            var bank_id = data.response.bank_id;  //bank_id _default
            var account_id = data.response.account_id; //account_id _default
            get_all_possible_payment_accounts(token, amount).done(function (data) { //get all user accounts with enough amount for pay the product
                console.log(data);
                var accounts = data.response;
                if(accounts.length !== 0){  //Check if there is at least one account with money for the purchase
                    if(!account_amount_verification(accounts, bank_id, account_id))
                    {
                        bank_id = accounts[0].bank_id;
                        account_id = accounts[0].account_id;
                        console.log("não tem dinheiro");
                        Confirm("Nearsoft Payment Provider", "You do not have enough money in this account to complete the purchase of \"<b>"+product['product_name'].substring(0, 30)+"...</b> \" " +
                            "Do you want to pay with the account \"<b>"+account_id+"</b>\" of bank \"<b>"+bank_id+"</b>\"?",'Yes', 'Cancel').fail(function (data)
                        {
                            Alert("Nearsoft Payment Provider","The purchase of \"<b>"+product['product_name'].substring(0, 30)+"...</b>\" was canceled...").done(
                                function () {
                                    deferred.resolve();
                                }
                            );
                        });
                    }
                    get_charge(token, bank_id, account_id).done(function (data) {
                        console.log(data);
                        Confirm("Nearsoft Payment Provider","The purchase of \"<b>"+product['product_name'].substring(0, 30)+"...</b>\" is" +
                            " subject to a charge of "+data.response.charge+"€. Do you want to proceed with payment?", 'Yes', 'Cancel').done(function (data) {
                            initiate_transaction(token, bank_id, account_id, amount, currency, product['product_name']).done(function (data)      //initialize the transaction and wait for result
                            {
                                console.log(data);
                                if(data.response.status === "INITIATED")  //If status is initiated is necessary answer the challenge
                                {
                                    var data_serialized = {"challenge_query": data.response.challenge.id, "transaction_req_id": data.response.id.value};
                                    Confirm("Nearsoft Payment Provider", "The price of \"<b>"+product['product_name'].substring(0, 30)+"...</b>\" is over 100 €.  Do you want to proceed with payment?",
                                        'Yes', 'Cancel').done(function (data)   //Wait for challenge confirmation by customer
                                    {
                                        answer_challenge(token, data_serialized, bank_id, account_id).done(function (data)   //ajax request to answer challenge
                                        {
                                            console.log(data);
                                            if(data.response.status === "COMPLETED"){
                                                Alert("Nearsoft Payment Provider", "The purchase of \"<b>"+product['product_name'].substring(0, 30)+"...</b>\" was made successfully!").done(function () {
                                                    cart_remove(product);
                                                    deferred.resolve();
                                                });
                                            }
                                            else
                                            {
                                                Alert("Nearsoft Payment Provider", "Some error occurred.").done(function () {
                                                    deferred.resolve();
                                                });
                                            }
                                        }).fail(function (data) {          //fail ajax answer challenge
                                            Alert("Nearsoft Payment Provider", data.responseJSON.response).done(function () {
                                                deferred.resolve();
                                            });
                                        });
                                    }).fail(function (data) {             //fail confirmation of challenge
                                        Alert("Nearsoft Payment Provider", "The purchase of \"<b>"+product['product_name'].substring(0, 30)+"...</b>\" was canceled...").done(function () {
                                            deferred.resolve();
                                        });
                                    });
                                }
                                //if the transaction status is completed the its done
                                else if(data.response.status === "COMPLETED") {
                                    Alert("Nearsoft Payment Provider","The purchase of \"<b>"+product['product_name'].substring(0, 30)+"...</b>\" was made successfully!").done(function () {
                                        cart_remove(product);
                                        deferred.resolve();
                                    });
                                }
                            }).fail(function (data) {
                                console.log(data);
                                Alert("Nearsoft Payment Provider", data.responseJSON.response).done(function () {
                                    deferred.resolve();
                                });
                            });
                        }).fail(function (data) {
                            Alert("Nearsoft Payment Provider","The purchase of \"<b>"+product['product_name'].substring(0, 30)+"...</b>\" was canceled...").done(function () {
                                deferred.resolve();
                            });
                        });

                    }).fail(function (data) {
                        console.log(data);
                        Alert("Nearsoft Payment Provider", data.responseJSON.response).done(function () {
                            deferred.resolve();
                        });
                    });
                }
                else
                {
                    Alert("Nearsoft Payment Provider", "No account has enough money to purchase in any account for \"<b>"+product['product_name'].substring(0, 30)+"...</b>\".").done(function () {
                        deferred.resolve();
                    });
                }

            }).fail(function (data) {
                console.log(data);
                Alert("Nearsoft Payment Provider", data.responseJSON.response).done(function () {
                    deferred.resolve();
                });
            });

        }).fail(function (data) {
            console.log(data);
            Alert("Nearsoft Payment Provider", data.responseJSON.response).done(function () {
                deferred.resolve();
            });
        });
    });
    return deferred.promise();
}



$( document ).ready(function() {

    //add button and button css
    $(button_config.product_form).append('<button type="submit" class = "my_button buyNow" style="vertical-align:middle"><span>Buy Now</span></button>');
    $(button_config.buy_all).append('<button type="button" class = "my_button buyAll" style="vertical-align:middle"><span>Buy All</span></button>');
    $("head").append($("<link rel='stylesheet' href='"+button_config.css_path+"button_style.css' type='text/css' media='screen' />"));
    $("head").append('<link rel="stylesheet" href="'+button_config.css_path+'login_modal.css">');
    $("head").append('<link rel="stylesheet" href="'+button_config.css_path+'confirm_box.css">');
    $("head").append('<link rel="stylesheet" href="'+button_config.css_path+'alert_box.css">');
    $("head").append('<link rel="stylesheet" href="'+button_config.css_path+'loader.css">');
    $("body").append('<div class="loader_container" style="display: none">')
    $('.loader_container').append('<div class="loader"></div>')

    $('.buyAll').click(function (e) {
        e.preventDefault();
        var products_array = [];
        $('.product_form').each(function(){
            var amount = $('.amount', this).val();
            var currency = $('.currency', this).val();
            var quantity = $('.quantity', this).val();
            var product_id = $('.product_id', this).val();
            var product_name = $('.product_name', this).val();
            for(var i = 1; i <= quantity; i++ )
            {
                products_array.push({'amount':amount, 'currency':currency, 'product_name':product_name, 'product_id':product_id});
            }
        });
        var products_string = JSON.stringify(products_array);
        setCookie('buy_products', products_string, 0.01);
        console.log(getCookie('buy_products'));
        console.log('Buy all products');
        login_modal();
    });

    $('.buyNow').click(function (e) {
        e.preventDefault();
        var products_array = [];
        var product_form = $(this).parent();
        var amount = $('.amount', product_form).val();
        var currency = $('.currency', product_form).val();
        var quantity = $('.quantity', product_form).val();
        var product_id = $('.product_id', product_form).val();
        var product_name = $('.product_name', product_form).val();
        for(var i = 1; i <= quantity; i++ )
        {
            products_array.push({'amount':amount, 'currency':currency, 'product_name':product_name, 'product_id':product_id});
        }
        var products_string = JSON.stringify(products_array);
        setCookie('buy_products', products_string, 0.01);
        console.log(getCookie('buy_products'));
        console.log('Buy now products');
        login_modal();
    })



    //When the user login
    $('body').on('submit', '#login-form', function(e) {
    //$('#login-form').submit(function signup(e){
        e.preventDefault();
        login_nearsoft_payment_provider($(this)).done(function(data){  //Login in user microservice
            console.log('Submission was successful.');
            console.log(data);
            var token = data.token;
            $('.modal').css({"display":"none"})
            //var continue_operation = confirm("Login successfully. Do you want to proceed with payment?");
            Confirm('Nearasoft Payment Provider', 'Login successfully. Do you want to proceed with payment?',
                'Yes', 'Cancel').done(function (data)  //Verify the confirmation of purchase
            {
                console.log("Buy operation")
                buy_now_products = getCookie("buy_products");
                products_array = JSON.parse(buy_now_products);
                console.log(products_array);
                purchase_products(token, products_array, 0);
                play_loader();

            }).fail(function (data) {  //Fail confirmation
                console.log(data);
                Alert('Nearasoft Payment Provider',"Purchase was canceled...");
            });

        }).fail(function(data){    //Fail login
            console.log(data);
            $('#error-message').html(data.responseJSON.response);
            console.log('An error occurred.');
        });
    });

    $('#sing_up').click(function () {
        window.open("./../Web-app/Pages/user-register.html"); //Go to the register form
    });

});