const axios = require("axios");


exports.queryBreweries = async function (req, res){
  let params = req.query;
  let brewResponse = await axios.get('https://api.openbrewerydb.org/breweries/search?query='+params.query);
  return res. json({success: true, breweryList: brewResponse.data});
}
