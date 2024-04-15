import { useSelector } from "react-redux";



function ProgressBar({progressBarRef,trackRef}){

    const trackProgress=useSelector(state => state.trackProgress);
    const trackDuration= useSelector(state => state.trackDuration);

    const handleProgressChange = () => {
        trackRef.current.currentTime= progressBarRef.current.value;
    };

    const showTimeInMinutes = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes =
            minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    };

    return (
        <div className="mb-4 p-2">
            <span className="current">{showTimeInMinutes(trackProgress)}</span>
            <input type="range" ref={progressBarRef} defaultValue="0" onChange={handleProgressChange}/>
            <span className="duration">{showTimeInMinutes(trackDuration)}</span>
        </div>
    );
}

export default ProgressBar;