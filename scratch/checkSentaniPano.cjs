const https = require('https');
const key = 'AIzaSyAyHABnIHtU02YfBdzsXoK8wDg2_N324Uc';

function check(name, lat, lng, radius, source = 'default') {
  const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&radius=${radius}&source=${source}&key=${key}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`[${name}] radius ${radius}m:`, JSON.parse(data));
    });
  });
}

check('Sentani Bukit Tungkuwiri original', -2.5855, 140.4850, 1000);
check('Sentani Bukit Tungkuwiri 5km', -2.5855, 140.4850, 5000);
check('Sentani Danau jalan utama', -2.5700, 140.5100, 5000);
check('Jayapura Youtefa check', -2.5975, 140.7161, 1000);
