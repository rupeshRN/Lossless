const fs = require('fs');
const data = JSON.parse(fs.readFileSync('ytm_filtered.json'));

let songs = [];
function extractSongs(obj) {
  if (!obj) return;
  if (Array.isArray(obj)) {
    for (let item of obj) extractSongs(item);
  } else if (typeof obj === 'object') {
    if (obj.musicResponsiveListItemRenderer) {
      const item = obj.musicResponsiveListItemRenderer;
      const flexColumns = item.flexColumns;
      if (flexColumns && flexColumns.length >= 2) {
        const titleObj = flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0];
        const title = titleObj?.text;
        
        const detailsRuns = flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs || [];
        let artist = '';
        for(let run of detailsRuns) {
           if(run.text === ' • ') break;
           if(run.text === 'Song') continue;
           if(run.text === 'Video') continue;
           artist += run.text;
        }
        
        const thumbnails = item.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails || [];
        const thumbnail = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url : '';

        if (title && artist) {
          if (!songs.find(s => s.title === title && s.artist === artist)) {
            songs.push({ title, artist, thumbnail });
          }
        }
      }
    }
    for (let key in obj) {
      if (key !== 'musicResponsiveListItemRenderer') {
        extractSongs(obj[key]);
      }
    }
  }
}

extractSongs(data.contents);
console.log(songs.slice(0, 5));
