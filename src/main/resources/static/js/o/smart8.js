var cart = {}; // корзина

//оболочка, запускает после загрузки html
$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
    showMiniCart2();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('js/goods.json', function (data) {
        //console.log(data);

            var out = '';
            for (var key in data){
                if (key==000007)
                {
                    out+='<div class="css-smart">';
                    out+='<h3>'+data[key]['name']+'</h3>';

                    out+='<p>Производитель: '+data[key]['wender']+'</p>';
                    out+='<p>Цена: '+data[key]['cost']+'</p>';

                    out+='<p>ОС: '+data[key]['OS']+'</p>';

                    out+='<p>Дата выпуска: '+data[key]['year']+'</p>';

                    out+='<img src="'+data[key].image+'">';
                    // out+='<a href='+[key]+'"/"><img src="'+data[key].image+'" alt="Пример"></a>';
                    out+='<button class="add-to-cart" data-art="'+key+'">Купить</button>';
                    out+='</div>';
                }



            }
            $('#goods').html(out); //вывод в html id="goods"
            $('button.add-to-cart').on('click', addToCart); //обработчик кнопок с функцией addToCart


    });
}

function addToCart() {
    //добавление товара в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart) );
    showMiniCart();
    showMiniCart2();
}

function checkCart(){
    // наличие корзины в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart(){
    // содержимое корзины

    var out ='';

    num =0;
    for (var w in cart){
        // out =  w + ' --- '+cart[w]+'<br>';
        num=num+cart[w];
    }
    if (num!=0)
    out+=   "+"+num;
    out+='</form>';

    // out+='<br><a href ="/cart"> Корзина  </a>';

    $('#mini-cart').html(out);
}
function showMiniCart2(){
    var out ='';
    out+='<form action="/cart" > ' +
        ' <input type="hidden" name="_csrf" value="{{_csrf.token}}" /> ' +
        '<input type="submit" value="Корзина"  class="submit"/>' +
        ' </form>';
    $('#mini-cart2').html(out);
}
