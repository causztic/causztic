import fetch from 'node-fetch';

export const getToken = async () => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');


  const response = await fetch(
    'https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    body: params
  });

  const data = await response.json();

  return data.access_token;
}
