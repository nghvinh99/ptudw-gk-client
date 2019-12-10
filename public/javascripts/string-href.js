$("#select-per-page").change(() => {
    let pathname = window.location.pathname;
    let perPage = $('#select-per-page option:selected').val();
    let url = pathname + "?page=1&perPage=" + perPage;

    window.location.href = url;
});

$("#select-order").change(() => {
    let pathname = window.location.pathname;
    let orderList = $('#select-order option:selected').val();
    let url = pathname + "?" + orderList;
    window.location.href = url;
});