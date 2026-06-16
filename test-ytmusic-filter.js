const payload = {
  context: {
    client: {
      clientName: "WEB_REMIX",
      clientVersion: "1.20231214.00.00",
      gl: "US",
      hl: "en"
    }
  },
  query: "Blinding Lights",
  params: "EgWKAQIIAWoMEAMQBBAJEA4QChAF"
};

fetch('https://music.youtube.com/youtubei/v1/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
  },
  body: JSON.stringify(payload)
}).then(res => res.json())
  .then(data => {
    const fs = require('fs');
    fs.writeFileSync('ytm_filtered.json', JSON.stringify(data, null, 2));
    console.log("Written");
  });
