const request = require("request");
const dbOptions = { 
  method: 'GET',
  url: 'https://pdubdb-705a.restdb.io/rest/workstations',
  headers: 
   { 
    'cache-control': 'no-cache',
    'x-apikey': '5c9a8400df5d634f46ecaf52',
   } 
 };

export const stationsFetchAll = () => {
  return new Promise(function(resolve,reject){
  	request(dbOptions, function (error, response, body) {
  	  if (error) return reject(error)
      try {
    	  resolve(JSON.parse(body));
      } catch(e) {
        reject(e)
      }
  	});
  })
}