

import FileUpload from "./components/UploadFile";
import App from "./App";


import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import SpotifyPlayer from "./components/SpotifyPlayer";
import { getTokenFromUrl } from './components/Spotify';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();



function Mazzika(){

const uploadedTracks=useSelector(state => state.uploadedTracks);

// ============================== Spotify ===================================

const spotify_token=useSelector(state => state.spotify_token);
const dispatch= useDispatch();

useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    
    if (_token) {
        dispatch({
        type:"SET_SPOTIFY_TOKEN",
        value: _token
        });

        spotify.setAccessToken(_token);

        spotify.getMe().then((user) => {
        dispatch({
            type:"SET_SPOTIFY_USER",
            value: user
                });
        });

        spotify.getUserPlaylists().then((playlists) => {
        dispatch({
            type:"SET_SPOTIFY_PLAYLISTS",
            value: playlists
                });
        });
        spotify.getPlaylist("5m4zqT35KAW1EiHzQ5rreI").then((playlist) => {
            dispatch({
                type:"SET_SPOTIFY_CURRENT_PLAYLIST",
                value: playlist
            });
        });
    }
}, [dispatch]);


    let component;

    if (!uploadedTracks.length || !spotify_token){
        component= <FileUpload/>;
    }
    if (uploadedTracks.length){
        component= <App/>; 
    }
    if (spotify_token){
        component=  <SpotifyPlayer />;
    }
        return (
            <div>
                {component}
            </div>
        );
}

export default Mazzika;