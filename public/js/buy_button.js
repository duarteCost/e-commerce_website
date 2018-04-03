
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
function initiate_transaction(token, bank_id, account_id, amount, currency) {
    var data_serialized = {"amount": amount, "currency": currency};
    console.log(data_serialized);
    return $.ajax({
        type:"POST",
        url: "https://127.0.0.1:5002/pisp/bank/"+bank_id+"/account/"+account_id+"/initiate-transaction-request",
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
        url: "https://127.0.0.1:5002/pisp/bank/"+bank_id+"/account/"+account_id+"/answer-challenge",
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
            console.log("entrou");
            result = true;
            return false;
        }
    });
    return result;
}

function purchase_products(token, products_array, index) {
    if(index<products_array.length){
        var amount = products_array[index]['amount'];
        var currency = products_array[index]['currency'];
        index++;
        purchase(token, amount, currency ).done(function () {
            console.log("Purchase done!");
            purchase_products(token, products_array, index);
        });
    }
}

function purchase(token, amount, currency) {
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
                        var continue_operation =confirm("You do not have enough money in this account to complete the purchase!\n" +
                            "Do you want to pay with the account "+account_id+" of bank "+bank_id+"?");
                        if(!continue_operation) {
                            alert("Purchase was canceled.");
                            deferred.resolve();
                        }
                    }
                    get_charge(token, bank_id, account_id).done(function (data) {
                        console.log(data);
                        var continue_operation =confirm("This transaction is subject to a charge of "+data.response.charge+". Do you want to proceed with payment?");
                        if(continue_operation){
                            //initialize the transaction and wait for result
                            initiate_transaction(token, bank_id, account_id, amount, currency).done(function (data) {
                                console.log(data);
                                //If status is initiated is necessary answer the challenge
                                if(data.response.status === "INITIATED"){
                                    var continue_operation =confirm("Your purchase is over 100 €.  Do you want to proceed with payment?");
                                    if(continue_operation)
                                    {
                                        var data_serialized = {"challenge_query": data.response.challenge.id, "transaction_req_id": data.response.id.value};
                                        answer_challenge(token, data_serialized, bank_id, account_id).done(function (data) {
                                            console.log(data);
                                            if(data.response.status === "COMPLETED"){
                                                alert("Purchase made successfully!");
                                                deferred.resolve();
                                            }
                                            else
                                            {
                                                alert("Some error occurred.");
                                                deferred.resolve();
                                            }
                                        }).fail(function (data) {
                                            alert(data.responseJSON.response);
                                            deferred.resolve();
                                        });
                                    }
                                    else
                                    {
                                        alert("Purchase was canceled.");
                                        deferred.resolve();
                                    }
                                }
                                //if the transaction status is completed the its done
                                else if(data.response.status === "COMPLETED") {
                                    alert("Purchase made successfully!");
                                    deferred.resolve();
                                }
                            }).fail(function (data) {
                                console.log(data);
                                alert(data.responseJSON.response);
                                deferred.resolve();
                            });
                        }
                        else
                        {
                            alert("Purchase was canceled.");
                            deferred.resolve();
                        }

                    }).fail(function (data) {
                        console.log(data);
                        alert(data.responseJSON.response);
                        deferred.resolve();
                    });
                }
                else
                {
                    alert("No account has enough money to purchase in any account.");
                    deferred.resolve();
                }

            }).fail(function (data) {
                console.log(data);
                alert(data.responseJSON.response);
                deferred.resolve();
            });

        }).fail(function (data) {
            console.log(data);
            alert(data.responseJSON.response);
            deferred.resolve();
        });
    });
    return deferred.promise();
}


//end of methods called form popup

$( document ).ready(function() {

    //add button and button css
    $(".buy_now").append('<button onclick="document.getElementById(\'id01\').style.display=\'block\'" type="submit" class = "my_button buyNow" style="vertical-align:middle"><span>Buy Now</span></button>');
    $(".buy_all").append('<button onclick="document.getElementById(\'id01\').style.display=\'block\'" type="button" class = "my_button buyAll" style="vertical-align:middle"><span>Buy All</span></button>');
    $("head").append($("<link rel='stylesheet' href='../css/button_style.css' type='text/css' media='screen' />"));


    //When user click buy now

    var operation = "";
	$('.product_form').submit(function (e) {
        e.preventDefault();
        var products_array = [];
        var amount = $('.amount', this).val();
        //var description = $('.description', this).val();
        var currency = $('.currency', this).val();
        var quantity = $('.quantity', this).val();
        var product_id = $('.product_id', this).val();
        console.log('id:'+ product_id)
        for(var i = 1; i <= quantity; i++ )
        {
            products_array.push({'amount':amount, 'currency':currency, 'product_id':product_id});
        }
        var products_string = JSON.stringify(products_array);
        setCookie('buy_now_products', products_string, 0.01);
        console.log(getCookie('buy_now_products'))
        operation = "buyNow";

    });
    $('.buyAll').click(function (e) {
        e.preventDefault();
        var products_array = [];
        $(".product_form").each(function(){
            var amount = $('.amount', this).val();
            var currency = $('.currency', this).val();
            var quantity = $('.quantity', this).val();
            var product_id = $('.product_id', this).val();
            for(var i = 1; i <= quantity; i++ )
            {
                products_array.push({'amount':amount, 'currency':currency, 'product_id':product_id});
            }
        });
        var products_string = JSON.stringify(products_array);
        setCookie('buy_all_products', products_string, 0.01);
        console.log(getCookie('buy_all_products'))
        operation = "buyAll";

    })



    //When the user login
    $('#login-form').submit(function signup(e){
        e.preventDefault();
        login_nearsoft_payment_provider($(this)).done(function(data){
            console.log('Submission was successful.');
            console.log(data);
            $('#id01').css({"display":"none"})
            var continue_operation = confirm("Login successfully. Do you want to proceed with payment?");
            if(continue_operation)
            {
                if(operation === "buyNow"){
                    console.log("Buy now operation")
                    buy_now_products = getCookie("buy_now_products");
                    products_array = JSON.parse(buy_now_products);
                    console.log(products_array);
                    purchase_products(data.token, products_array, 0);
                }
                else if(operation === "buyAll"){
                    console.log("Buy all operation");
                    var buy_all_products = getCookie("buy_all_products");
                    products_array = JSON.parse(buy_all_products);
                    console.log(products_array);
                    purchase_products(data.token, products_array, 0);

                }


            }
            else
            {
                alert("Purchase was canceled.");
            }
        }).fail(function(data){

            console.log(data);
            $('#error-message').html(data.responseJSON.response);
            console.log('An error occurred.');
        });
    });

    $('#sing_up').click(function () {
        window.open("./../Web-app/Pages/user-register.html"); //Go to the register form
    });

});