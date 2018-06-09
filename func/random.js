const axios = require('axios');
const qs = require('qs');

export function handler(event, context, callback) {
  const { API_URL, API_ID, AFFILIATE_ID, SITE } = process.env;
  const API_PARAMS = qs.stringify(event.queryStringParameters);
  const URL = `${API_URL}ItemList?${API_PARAMS}&api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=${SITE}`;

  const respond = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  const get = () => {
    axios
      .get(URL)
      .then(response => {
        console.log(response.data);
        console.log(response.data.result.items[0]);
        respond(response.data);
      })
      .catch(err => {
        console.error(err);
        respond(err);
      });
  };

  if (event.httpMethod == 'GET') {
    get();
  } else {
    callback(null, {
      statusCode: 410,
      body: 'Unsupported Request Method'
    });
  }
}
