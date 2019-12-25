$(function () { 
    $(".ti-bag").on('click', function() {
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
                array.push(data);
                localStorage.setItem('cart', JSON.stringify(array));
                console.log(array);
                $('#cart').append('<a href="/shop/'+ data.id + '">' + data.name + '</a><br>');
            }
        });
    })
});

$(function () {
    $("#main_menu").ready(function() {
        const itemList = JSON.parse(localStorage.getItem('cart'));
        console.log(itemList);
        itemList.forEach((item) => {
            $('#cart').append('<a href="/shop/' + item.id + '">' + item.name + '</a><br>');
        })
    })
});