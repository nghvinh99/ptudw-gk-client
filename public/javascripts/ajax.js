$(function() { //update on cart item adding
    $(".ti-bag").on('click', function() {
        const id = ($(this).attr('value'));
        $.ajax({
            url: '/shop/cart/add/' + id,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                let itemList = [];
                if (localStorage.getItem('cart')) {
                    itemList = JSON.parse(localStorage.getItem('cart'));
                }
                duplicate = itemList.find(function (item) { return item.id == id });
                if (duplicate) {
                    if (duplicate.quantity < duplicate.stock) {
                        duplicate.quantity += 1;
                        $('#itemCount-'+duplicate.id).html(duplicate.quantity);
                    } else alert('Đã đạt số lượng tối đa trong kho hàng: ' + duplicate.stock);
                } else {
                    itemList.push({
                        id: data.id,
                        name: data.name,
                        image: data.images[0],
                        price: data.price,
                        stock: data.quantity,
                        quantity: 1
                    });
                    $('#cart').append('<a id="cart-item-' + data.id + '" style="color:inherit" href="/shop/' + data.id + '">' + data.name + ' &#xd7; \
                    <em id="itemCount-'+ data.id + '">' + 1 +'</em><br></a>');
                    $('#shopping-cart').attr("data-count", itemList.length);
                    alert('Đã thêm sản phẩm '+ data.name +' vào giỏ hàng');
                };
                localStorage.setItem('cart', JSON.stringify(itemList));
            }
        });
    })
});

$(function() { //update on cart item adding
    $("#addCart").on('click', function() {
        const id = ($(this).attr('value'));
        const quantity = parseInt($("#quantity").val());
        $.ajax({
            url: '/shop/cart/add/' + id,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                let itemList = [];
                if (localStorage.getItem('cart')) {
                    itemList = JSON.parse(localStorage.getItem('cart'));
                }
                duplicate = itemList.find(function (item) { return item.id == id });
                if (duplicate) {
                    if ((duplicate.quantity + quantity) <= duplicate.stock) {
                        duplicate.quantity += quantity;
                        $('#itemCount-'+duplicate.id).html(duplicate.quantity);
                        alert('Đã thêm '+ quantity + ' ' + duplicate.name +' vào giỏ hàng');
                    } else alert('Đã vượt quá số lượng tối đa trong kho hàng: ' + duplicate.stock);
                } else {
                    if (quantity <= data.quantity) {
                        itemList.push({
                            id: data.id,
                            name: data.name,
                            image: data.images[0],
                            price: data.price,
                            stock: data.quantity,
                            quantity: quantity
                        });
                        $('#cart').append('<a id="cart-item-' + data.id + '" style="color:inherit" href="/shop/' + data.id + '">' + data.name + ' &#xd7; \
                        <em id="itemCount-'+ data.id + '">' + quantity +'</em><br></a>');
                        $('#shopping-cart').attr("data-count", itemList.length);
                        alert('Đã thêm sản phẩm '+ data.name +' vào giỏ hàng');
                    } else alert('Đã vượt quá số lượng tối đa trong kho hàng: ' + data.quantity);
                };
                localStorage.setItem('cart', JSON.stringify(itemList));
            }
        });
    })
});

$(function() { //show items in localStorage to cart when load pages
    $("#main_menu").ready(function() {
        const itemList = JSON.parse(localStorage.getItem('cart'));
        if (itemList) {
            itemList.forEach((item) => {
                $('#cart').append('<a id="cart-item-' + item.id + '" style="color:inherit" href="/shop/' + item.id + '">' + item.name + ' &#xd7; \
                <em id="itemCount-'+ item.id + '">' + item.quantity +'</em><br></a>');
            })
            $('#shopping-cart').attr("data-count", itemList.length);
        }
    })
});

function removeItem(id) {
    const itemList = JSON.parse(localStorage.getItem('cart'));
    const item = itemList.find(function (item) { return item.id == id });
    if (item) {
        let sumMoney = parseInt($('#sumMoney').html());
        sumMoney -= parseInt(item.quantity) * parseInt(item.price);
        itemList.splice(itemList.indexOf(item), 1);
        localStorage.setItem('cart', JSON.stringify(itemList));
        $('#cart-item-' + id).remove();
        $('#cart-items-' + id).remove();
        $('#shopping-cart').attr("data-count", itemList.length);
        $('#sumMoney').html(sumMoney + " VNĐ");
    }
}

$(function() {
    $('.cart included').ready(function() {
        const itemList = JSON.parse(localStorage.getItem('cart'));
        let sumMoney = 0;
        if (itemList) {
            itemList.forEach((item) => {
                const itemSum = parseInt(item.price) * parseInt(item.quantity);
                sumMoney += parseInt(itemSum);
                $('#itemList').after(
                    "<tr id='cart-items-" + item.id + "'>\<td>\<div class='media'>\<div class='d-flex'>\
                    <a href='/shop/"+ item.id +"'><img src='"+ item.image + "' alt='' />\</div>\
                    <div class='media-body'>\<p>"+ item.name + "</p></a>\</div>\</div>\
                    </td>\<td>\<h5>"+ item.price + " VNĐ</h5>\</td>\<td>\<div class='product_count'>\
                    <span value='"+ item.id + "' class='input-number-decrement'> <i class='ti-minus'></i></span>\
                    <input readonly id='quantity-"+ item.id + "' class='input-number' type='text' value='" + item.quantity + "' min='0'>\
                    <span value='"+ item.id + "' class='input-number-increment'> <i class='ti-plus'></i></span>\
                    </div>\</td>\<td>\<h5 id='itemSum-"+ item.id + "'>" + itemSum + " VNĐ</h5>\</td>\<td>\
                    <a href='javascript:removeItem("+ item.id + ");'>&#x2716; Xóa</a>\</td>\</tr>"
                );
                $('#sumMoney').html(sumMoney + " VNĐ");
            })
        }
    })
});

$(function() {
    $(".input-number-decrement").ready(function() {
        $(".input-number-decrement").on("click", function() {
            const id = $(this).attr("value");
            const itemList = JSON.parse(localStorage.getItem('cart'));
            const item = itemList.find(function (item) { return item.id == id });
            if (item.quantity > 1) {
                item.quantity -= 1;
                $('#quantity-' + item.id).attr("value", item.quantity);
                localStorage.setItem('cart', JSON.stringify(itemList));
                let itemSum = parseInt($('#itemSum-' + item.id).html());
                itemSum -= parseInt(item.price);
                $('#itemSum-' + item.id).html(itemSum + "VNĐ");
                let sumMoney = parseInt($('#sumMoney').html());
                sumMoney -= parseInt(item.price);
                $('#sumMoney').html(sumMoney + " VNĐ");
                $('#itemCount-'+item.id).html(item.quantity);
            } else alert('Số lượng đặt hàng tối thiểu là 1');
        })
    })
});

$(function() {
    $(".input-number-increment").ready(function() {
        $(".input-number-increment").on("click", function() {
            const id = $(this).attr("value");
            const itemList = JSON.parse(localStorage.getItem('cart'));
            const item = itemList.find(function (item) { return item.id == id });
            if (item.quantity < item.stock) {
                item.quantity += 1;
                $('#quantity-' + item.id).attr("value", item.quantity);
                localStorage.setItem('cart', JSON.stringify(itemList));
                let itemSum = parseInt($('#itemSum-' + item.id).html());
                itemSum += parseInt(item.price);
                $('#itemSum-' + item.id).html(itemSum + "VNĐ");
                let sumMoney = parseInt($('#sumMoney').html());
                sumMoney += parseInt(item.price);
                $('#sumMoney').html(sumMoney + " VNĐ");
                $('#itemCount-'+item.id).html(item.quantity);
            } else alert('Số lượng đặt hàng đã vượt số lượng trong kho hàng: ' + item.stock);
        })
    })
});

$(function() {
    $('.cart included').ready(function() {
        const itemList = JSON.parse(localStorage.getItem('cart'));
        let sumMoney = 0;
        if (itemList) {
            itemList.forEach((item) => {
                const itemSum = parseInt(item.price) * parseInt(item.quantity);
                sumMoney += parseInt(itemSum);
                $('#itemCheck').after(
                    "<li id='itemCheck'>\<a href='/shop/cart'>" + item.name + " &#xd7; " + item.quantity + "\
                    <span class='last'>"+ itemSum + " VNĐ</span>\</a>\</li>"
                );
                $('#sumMoney').html(sumMoney + " VNĐ");
                $('#sumMoneysi').html(sumMoney + " VNĐ");
            })
        }
    })
});

$(function() {
    $('#checkout-req').on('click', function(err) {
        const itemList = localStorage.getItem('cart');
        if (!itemList) {
            alert('Giỏ hàng của bạn đang trống');
            err.preventDefault();
        }
    })
});

function postCart(itemList, done) {
    let COD = true;
    if(!document.getElementById('f-option5').checked) {
        COD = false;
    }
    $.ajax({
        url: '/services/checkout',
        type: 'POST',
        data: {
            itemList: itemList,
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val(),
            note: $('#message').val(),
            payment: COD
        },
        success: function() {
            localStorage.removeItem('cart');
            window.location.href='/services/confirm';

        },
    });
}

$(function() {
    $('#checkout').on('click', function(err) {
        const itemList = localStorage.getItem('cart');
        if (itemList) {
            postCart(itemList);
        } else {
            alert('Giỏ hàng của bạn đang trống');
            err.preventDefault();
        }
    })
});