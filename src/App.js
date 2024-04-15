
import './App.css';

import TrackDetails from './components/TrackDetails';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { useRef} from 'react';



function App() {

  const trackIndex=useSelector(state => state.trackIndex);
  const uploadedTracks=useSelector(state => state.uploadedTracks);

  const trackRef=useRef();
  const progressBarRef=useRef();

  const dispatch = useDispatch();

  dispatch(
    {
    type:'CHANGE_CURRENT_TRACK',
    value: uploadedTracks[trackIndex]
    }
  );

  const onLoadedMetadata = () => {
    
  const timeInSeconds=trackRef.current.duration;
  progressBarRef.current.max=timeInSeconds;
  dispatch(
    {
      type:'CHANGE_TRACK_DURATION',
      value: timeInSeconds
    }
    );
  };

  const handleEndOfTrack= () => {
      if (trackIndex >= uploadedTracks.length -1){
        dispatch({
          type:'CHANGE_TRACK_INDEX',
          value:0
        });

        dispatch({
          type:'CHANGE_CURRENT_TRACK',
          value: uploadedTracks[0]
        });
      } else {
        dispatch({
          type:'CHANGE_TRACK_INDEX',
          value: trackIndex +1
        });

        dispatch({
          type:'CHANGE_CURRENT_TRACK',
          value: uploadedTracks[trackIndex + 1]
        });
      }
  };

  return (
    <div className="App container-md pt-5">
      <div style={{border: 1, borderColor: 'gray', borderStyle:"solid", borderRadius: 20}}>
        <h1 className='m-4'>Mazzika Audio Player</h1>
        <audio src={URL.createObjectURL(uploadedTracks[trackIndex])} ref={trackRef} onLoadedMetadata={onLoadedMetadata} onEnded={handleEndOfTrack}/>
        <TrackDetails/>
        <Controls {...{progressBarRef, trackRef}}/>
        <ProgressBar {...{progressBarRef, trackRef}}/>
      </div>
    </div>
  );
}

export default App;
