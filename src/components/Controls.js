
import { useState, useEffect, useRef, useCallback } from 'react';

import {IoPlayOutline,
    IoPauseOutline,
    IoPlayBackOutline,
    IoPlayForwardOutline,
    IoPlaySkipBackOutline,
    IoPlaySkipForwardOutline
} from 'react-icons/io5';

import {
    IoMdVolumeHigh,
    IoMdVolumeOff,
    IoMdVolumeLow,
} from 'react-icons/io';

import { useDispatch, useSelector } from 'react-redux';


function Controls({trackRef, progressBarRef}){

    const uploadedTracks=useSelector(state => state.uploadedTracks);

    const [isPlaying, setIsPlaying]=useState(false);
    const trackDuration=useSelector(state =>state.trackDuration);
    const trackIndex=useSelector(state =>state.trackIndex);

    const [volume, setVolume] = useState(50);
    const [muteVolume, setMuteVolume] = useState(false);
    
    const dispatch=useDispatch();

    const togglePlayPause = () => {
        setIsPlaying((p) => !p);
    };

    useEffect(() => {
        if (isPlaying) {
            trackRef.current.play();
        } else {
            trackRef.current.pause();
        }
        }, [isPlaying, trackRef]
    );

    const playAnimationRef = useRef();
    const repeat = useCallback(() => 
    {
        const currentTime = trackRef.current.currentTime;
        dispatch({
            type:"CHANGE_TRACK_PROGRESS",
            value: currentTime
        });
        progressBarRef.current.value=currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / trackDuration) * 100}%`
        );
        
        playAnimationRef.current = requestAnimationFrame(repeat)
    },[trackRef,trackDuration,progressBarRef,dispatch]);
    

    useEffect(() => {
        if (isPlaying) {
        trackRef.current.play();
        } else {
        trackRef.current.pause();
        playAnimationRef.current=requestAnimationFrame(repeat);
        }
    }, [isPlaying, trackRef, repeat]);

    const skipForward = () => {
        trackRef.current.currentTime += 10;
    };

    const skipBackward = () => {
        trackRef.current.currentTime -= 10;
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
            let lastTrackIndex = uploadedTracks.length - 1;
            dispatch({
                type:'CHANGE_TRACK_INDEX',
                value:lastTrackIndex
            });
            dispatch({
                type:'CHANGE_CURRENT_TRACK',
                value: uploadedTracks[lastTrackIndex]
            });
        } else {
            dispatch({
                type:'CHANGE_TRACK_INDEX',
                value: trackIndex - 1
            });
            dispatch({
                type:'CHANGE_CURRENT_TRACK',
                value:uploadedTracks[trackIndex-1]
            });
        }
    };

    const handleNext = () => {
        if (trackIndex >= uploadedTracks.length - 1) {
            dispatch({
                type:'CHANGE_TRACK_INDEX',
                value:0
            });
            dispatch({
                type:'CHANGE_CURRENT_TRACK',
                value:uploadedTracks[0]
            });
        } else {
            dispatch({
                type:'CHANGE_TRACK_INDEX',
                value: trackIndex +1
            });
            dispatch({
                type:'CHANGE_CURRENT_TRACK',
                value:uploadedTracks[trackIndex +1]
            });
        }
    };

    useEffect(() => {
        if (trackRef) {
        trackRef.current.volume = volume / 100;
        trackRef.current.muted = muteVolume;
        }
    }, [volume, trackRef, muteVolume]);

    return(
        <div className="d-flex justify-content-center mb-3">
            <div>
                <button className="btn btn-lg m-3 btn-outline-secondary"  onClick={handlePrevious}>
                <IoPlaySkipBackOutline />
                </button>
                <button className="btn btn-lg m-3 btn-outline-secondary" onClick={skipBackward}>
                <IoPlayBackOutline />
                </button>
                <button className="btn btn-lg m-3 btn-outline-secondary" onClick={togglePlayPause}>
                {isPlaying ? <IoPauseOutline/> : <IoPlayOutline/>}
                </button>
                <button className="btn btn-lg m-3 btn-outline-secondary" onClick={skipForward}>
                <IoPlayForwardOutline />
                </button>
                <button className="btn btn-lg m-3 btn-outline-secondary" onClick={handleNext}>
                <IoPlaySkipForwardOutline />
                </button>
            </div>
            <div className="p-4">
                <button className="btn btn-sm me-2 btn-outline-secondary" onClick={() => setMuteVolume((prev) => !prev)}>
                {muteVolume || volume < 5 ? 
                (<IoMdVolumeOff />) : 
                volume < 40 ? (<IoMdVolumeLow />) : (<IoMdVolumeHigh />)}
                </button>
                <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)}/>
            </div>
        </div>
    );
}

export default Controls;