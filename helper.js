obj = {};

obj.setParam = (url, param, value, isPage1) => {
    let searchParams = new URLSearchParams(url.search);
    searchParams.set(param, value);
    if(isPage1 === 1){
        searchParams.set('page', 1);
    }
    return searchParams.toString();
}

obj.setTowParams = (url, param1, value1, param2, value2, isPage1) => {
    let searchParams = new URLSearchParams(url.search);
    searchParams.set(param1, value1);
    searchParams.set(param2, value2);
    if(isPage1 === 1){
        searchParams.set('page', 1);
    }
    return searchParams.toString();
}

module.exports = obj;