import fetch from 'node-fetch';

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

export default async (token) => {
  let response;
  let data;
  const playlistId = '1VwivpVmOCfQj0jw7qCKYm';

  // get maximum number of songs
  response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.total`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  data = await response.json();

  const randomOffset = getRandomInt(data.tracks.total);

  response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=1&offset=${randomOffset}&fields=items(track(name,external_urls(spotify),artists(name),album(name,images,external_urls(spotify))))`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  data = await response.json();
  const result = data.items[0];
  const artists = result.track.artists.map((artist) => artist.name).join(', ');

  return (
    "<figure>" +
    `<img width="300" height="300" src="${result.track.album.images[0].url}" alt="${result.track.name}" />` +
    `<figcaption align="center"><a href="${result.track.external_urls.spotify}" target="_blank">${result.track.name}</a> by ${artists}</figcaption>` +
    "</figure>"
  )
}