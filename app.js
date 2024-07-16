let currency_container  = document.querySelector(".currency-container");
let fromAmountElement = document.querySelector("#fromAmountElement");
let convertedAmountElement = document.querySelector("#toAmountElement");
let fromCurrency = document.querySelector("#fromCurrency");
let toCurrency = document.querySelector("#toCurrency");
let result = document.querySelector(".result-msg");

countryList.forEach(countryCode=>{
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.value=option2.value = countryCode.code;
    option1.textContent=option2.textContent = countryCode.code;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);

    fromCurrency.value = "USD";
    toCurrency.value= "INR";
})

const exchangeRate = async ()=>{
    result.innerHTML = "Fetching Exchange Rate...";
    let amount = parseFloat(fromAmountElement.value);
    if(amount <= 0 )
    {
        alert('You must enter valid amount');
    }
   try{
    let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`);
    let data = await response.json();
    let rate = data.rates[toCurrency.value];

    let convertedRate = (amount * rate).toFixed(2);
    convertedAmountElement.value = convertedRate;
    result.innerHTML = `${amount}${fromCurrency.value} = ${convertedRate}${toCurrency.value}`;
   }
   catch(error)
   {
      currency_container.innerHTML = "<h2>Error, while fetching data for selected country </h2>";
    
   }
}

fromAmountElement.addEventListener("input",exchangeRate);
fromCurrency.addEventListener("change",exchangeRate);
toCurrency.addEventListener("change",exchangeRate);
window.addEventListener("load",exchangeRate);