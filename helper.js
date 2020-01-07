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

obj.getChecked = (url, name, value) => {
    let searchParams = new URLSearchParams(url.search);
    if(searchParams.get(name) === value.toString()){
        console.log(searchParams.get(name));
        return "checked";
    } else{
        return "";
    }
}

obj.formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  }

module.exports = obj;