function updateCart(array) {
    $.ajax({
        url: '/shop/cart',
        type: 'POST',
        data: {
            itemList: array
        }
    });
}

$(function () { //update on cart item adding
    $(".ti-bag").on('click', function () {
        const id = ($(this).attr('value'));
        $.ajax({
            url: '/shop/cart/add/' + id,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                let array = [];
                if (localStorage.getItem('cart')) {
                    array = JSON.parse(localStorage.getItem('cart'));
                }
                duplicate = array.find(function (item) { return item.id == id });
                if (duplicate) {
                    duplicate.quantity += 1;
                } else {
                    array.push({
                        id: data.id,
                        name: data.name,
                        quantity: 1
                    });
                    $('#cart').append('<a style="color:inherit" href="/shop/' + data.id + '">' + data.name + '</a><br>');
                    $('#shopping-cart').attr("data-count", array.length);
                };
                localStorage.setItem('cart', JSON.stringify(array));
                updateCart(localStorage.getItem('cart'));
            }
        });
    })
});

$(function () { //update on cart item adding
    $("#addCart").on('click', function () {
        const id = ($(this).attr('value'));
        const quantity = parseInt($("#quantity").val());
        $.ajax({
            url: '/shop/cart/add/' + id,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                let array = [];
                if (localStorage.getItem('cart')) {
                    array = JSON.parse(localStorage.getItem('cart'));
                }
                duplicate = array.find(function (item) { return item.id == id });
                if (duplicate) {
                    duplicate.quantity += quantity;
                } else {
                    array.push({
                        id: data.id,
                        name: data.name,
                        quantity: quantity
                    });
                    $('#cart').append('<a style="color:inherit" href="/shop/' + data.id + '">' + data.name + '</a><br>');
                    $('#shopping-cart').attr("data-count", array.length);
                };
                localStorage.setItem('cart', JSON.stringify(array));
                updateCart(localStorage.getItem('cart'));
            }
        });
    })
});

$(function () { //show items in localStorage to cart when load pages
    $("#main_menu").ready(function () {
        const itemList = JSON.parse(localStorage.getItem('cart'));
        if (itemList) {
            itemList.forEach((item) => {
                $('#cart').append('<a style="color:inherit" href="/shop/' + item.id + '">' + item.name + '</a><br>');
            })
            $('#shopping-cart').attr("data-count", itemList.length);
            $('#shopping-cart').load();
        }
    })
});

// $(function () {
//     $(".cart included").ready(function() {
//         $.ajax({
//             url: '/shop/cart',
//             type: 'GET',
//             data: {
//                 localStorage.getItem('cart')
//             }
//         })
//     })
// });

