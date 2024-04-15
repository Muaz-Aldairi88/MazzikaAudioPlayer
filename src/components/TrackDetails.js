import { useSelector } from "react-redux";

import appImage from './appImage.jpg'



function TrackDetails(){

    const currentTrack=useSelector(state=> state.currentTrack);
    const trackIndex=useSelector(state => state.trackIndex);
    const uploadedTracks= useSelector(state => state.uploadedTracks)
    return(
        <div className='d-inline-flex'>
            <div className="track_img">
                {currentTrack.thumbnail ? 
                    (<img className='rounded' height={400} src={appImage} alt="track"/>) :
                    (<img className='rounded' height={400} src={appImage} alt="default track"/>)}
            </div>
            <div className="card">
                    <div className='card-body d-flex justify-content-center align-items-center'>
                        <div>
                            <h1>{currentTrack.name}</h1>
                            <h4> Playing track {trackIndex + 1} of {uploadedTracks.length}</h4>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default TrackDetails;