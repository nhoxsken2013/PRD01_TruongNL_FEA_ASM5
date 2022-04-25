const axios = require("axios");
const urlApi = "https://api.covid19api.com/summary";
async function getCovidDataFromApi() {
  try {
    const response = await axios.get(`${urlApi}`);
    return response;
  } catch (error) {
    error = "Failed";
    return error;
  }
}

function getDataCovid(response) {
  let newConfirmed = response.data.Global.NewConfirmed;
  let newDeaths = response.data.Global.NewDeaths;
  let totalDeaths = response.data.Global.TotalDeaths;
  let CountryHaveHighestNumberOfDeaths = getCountryHaveHighestNumberOfDeaths(response);
  let highestNumberOfDeaths = CountryHaveHighestNumberOfDeaths.TotalDeaths;
  let CountryHaveHighestNumberOfNewConfirmedInDay = getCountryHaveHighestNumberOfNewConfirmedInDay(response);
  let highestNumberOfDeathsInDay = CountryHaveHighestNumberOfNewConfirmedInDay.NewConfirmed;
  
  console.log(`Today Covid's data:
NewConfirmed: ${newConfirmed} - NewDeaths: ${newDeaths} - TotalDeaths: ${totalDeaths}
Country have highest deaths by Covid: ${CountryHaveHighestNumberOfDeaths.Country}(${highestNumberOfDeaths})
Country have highest number of newcase Covid: ${CountryHaveHighestNumberOfNewConfirmedInDay.Country}(${highestNumberOfDeathsInDay})
`);
  return { newConfirmed, newDeaths, totalDeaths, highestNumberOfDeaths };
}

function getCountryHaveHighestNumberOfDeaths(response) {
  return response.data.Countries.reduce((accumulator, currentValue, index) => {
    // console.log(index,":    ",accumulator.NewDeaths)
    return accumulator.TotalDeaths > currentValue.TotalDeaths
      ? accumulator
      : currentValue;
  });
}

function getCountryHaveHighestNumberOfNewConfirmedInDay(response) {
  return response.data.Countries.reduce((accumulator, currentValue, index) => {
    return accumulator.NewConfirmed > currentValue.NewConfirmed
      ? accumulator
      : currentValue;
  });
}
console.log("------------With ASYNC/AWAIT way-----------")
console.log("Loading Covid Data...");
getCovidDataFromApi()
  .then((response) => {
    console.log("Get data successfully");
    getDataCovid(response);
  })
  .catch((error) => {
    console.log(error);
    console.log("Loaded Covid Data Failed");
  });
