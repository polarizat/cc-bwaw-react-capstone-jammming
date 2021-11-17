const clientId = '3e10c5de635d46c2a4804427595681ba';
const redirectUri = "http://localhost:3000/";
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {
    getAccessToken(){
        console.log("INTO getAccessToken")
        if (accessToken ) {
            return accessToken ;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
          accessToken = urlAccessToken[1];
          expiresIn = urlExpiresIn[1];
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
        } else {
          window.location = spotifyUrl;
        }
    },

    async search(term) {
        if (!accessToken) this.getAccessToken();
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
        const response = await fetch(searchUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks)
            return [];
        return jsonResponse.tracks.items.map(track => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            };
        });
    },

    savePlaylist(name, trackUris) {
      console.log("Pasul 1");
        if (!name || !trackUris || trackUris.length === 0) return;
        const userUrl = 'https://api.spotify.com/v1/me';
        const headers = {
          Authorization: `Bearer ${accessToken}`
        };
        let userId = undefined;
        let playlistId = undefined;
        fetch(userUrl, {
          headers: headers 
        })
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)
        .then(() => {
          console.log("Pasul 2");
          const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
          fetch(createPlaylistUrl, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                name: name
              })
            })
            .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)
            .then(() => {
              console.log("Pasul 3" + userId + " playlistId: " + playlistId);
              const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
              fetch(addPlaylistTracksUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                  uris: trackUris
                })
              });
            })
        })
    }
};

export { Spotify };