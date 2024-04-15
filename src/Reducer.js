
const initState={
    uploadedTracks:[],
    currentTrack: {},
    trackProgress: 0,
    trackDuration: 0,
    trackIndex: 0,
    //===========================
    spotify_user: null,
    spotify_token: null,
    spotify_playlists: [],
    spotify_current_playlist: null,
}

const Reducer = (state = initState, action) =>{

    switch (action.type) {

        case "CHANGE_UPLOADED_TRACKS":
            return { 
                ...state,
                uploadedTracks: action.value
            }
        case "CHANGE_CURRENT_TRACK":
            return { 
                ...state,
                currentTrack: action.value
            }
        case "CHANGE_TRACK_PROGRESS":
            return { 
                ...state,
                trackProgress: action.value
            }
        case "CHANGE_TRACK_DURATION":
            return { 
                ...state,
                trackDuration: action.value
            }
        case "CHANGE_TRACK_INDEX":
            return { 
                ...state,
                trackIndex: action.value
                }
        // ========================================================================
        case "SET_SPOTIFY_USER":
            return {
                ...state,
                spotify_user: action.value
            };
        case "SET_SPOTIFY_TOKEN":
            return {
                ...state,
                spotify_token: action.value
            };
        case "SET_SPOTIFY_PLAYLISTS":
            return {
                ...state,
                spotify_playlists: action.value
            };
        case "SET_SPOTIFY_CURRENT_PLAYLIST":
            return {
                ...state,
                spotify_current_playlist: action.value
            };
        default:
            return state
    }
}

export default Reducer;