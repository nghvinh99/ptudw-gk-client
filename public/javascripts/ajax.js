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
                array.push({
                    id: data.id,
                    name: data.name
                });
                localStorage.setItem('cart', JSON.stringify(array));
                console.log(array);
                $('#cart').append('<a style="color:inherit" href="/shop/' + data.id + '">' + data.name + '</a><br>');
                console.log(array.length);
                $('#shopping-cart').attr("data-count", array.length);
                $('#shopping-cart').load();
            }
        });
    })
});

$(function () { //show items in localStorage to cart when load pages
    $("#main_menu").ready(function () {
        const itemList = JSON.parse(localStorage.getItem('cart'));
        $(".dropdown cart").attr("content", "2");
        console.log(itemList);
        if (itemList) {
            itemList.forEach((item) => {
                $('#cart').append('<a style="color:inherit" href="/shop/' + item.id + '">' + item.name + '</a><br>');
            })
            $('#shopping-cart').attr("data-count", itemList.length);
            $('#shopping-cart').load();
        }
    })
});

