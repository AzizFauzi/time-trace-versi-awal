const https = require('https');
const key = 'AIzaSyAyHABnIHtU02YfBdzsXoK8wDg2_N324Uc';

const spots = [
  { name: 'Jayapura Kota (Taman Imbi)', lat: -2.5337, lng: 140.7181 },
  { name: 'Abepura Jalan Raya', lat: -2.6025, lng: 140.6698 },
  { name: 'Bandara Sentani', lat: -2.5768, lng: 140.5165 },
  { name: 'Danau Sentani Doyo', lat: -2.5480, lng: 140.4500 },
  { name: 'Jalan Raya Sentani - Abepura', lat: -2.5800, lng: 140.5800 },
  { name: 'Jalan Danau Sentani Kalkhote', lat: -2.5950, lng: 140.5400 }
];

spots.forEach(s => {
  const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${s.lat},${s.lng}&radius=3000&source=default&key=${key}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const parsed = JSON.parse(data);
      console.log(`[${s.name}]:`, parsed.status, parsed.copyright, parsed.date, parsed.location);
    });
  });
});
