$("#select-per-page").change(() => {
    let pathname = window.location.pathname;
    let perPage = $('#select-per-page option:selected').val();
    let url = pathname + "?page=1&perPage=" + perPage;

    console.log(url);
    window.location.href = url;
});