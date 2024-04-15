import { useSelector } from "react-redux";



function SpotifyPlayer(){

    const spotify_user=useSelector(state => state.spotify_user);
    const spotify_playlists=useSelector(state => state.spotify_playlists);

    return (
        <div>
            <div>
                <img src={spotify_user?.images[0]?.url} alt={spotify_user?.display_name} />
                <h4>{spotify_user?.display_name}</h4>
            </div>

            <div>
                <h1>Playlists:</h1>
                {spotify_playlists?.items?.map((playlist)=>(
                <div>
                    <h3>{playlist.name}</h3>
                    {/* <img src={playlist.images[0]?.url} alt="" /> */}
                </div>
                ))}
            </div>

            <div>
                {/* {spotify_current_playlist?.tracks.items.map((item) =>(
                    <div>
                        <audio src={item.added_by.href}/>
                    </div>
                    
                ))} */}
                
                
                
            </div>
        </div>
    )
};

export default SpotifyPlayer;