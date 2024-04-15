
import { useDispatch} from 'react-redux';
import { loginUrl } from "./Spotify";
import spotifyLogo from "./spotifyLogo.jpg"
import uploadPhoto  from './uploadPhoto.png';
import '../App.css';


const FileUpload = () => {

    const dispatch=useDispatch();

    const addFile = (e) => {
        dispatch({
            type:"CHANGE_UPLOADED_TRACKS",
            value: [...e.target.files]
        });
    };

  return (

    <div className="App container-md pt-5">
      <h1 className='m-4'>Mazzika Audio Player</h1>
      <div className='d-inline-flex' style={{border: 1, borderColor: 'gray', borderStyle:"solid", borderRadius: 20 }}>
        <div className=" card" style={{width:350}}>
          <img className="card-img-top" src={spotifyLogo} alt="spotify logo"/>
          <div className="card-body">
          <a href={loginUrl} className='btn btn-outline-secondary'>Spotify Account</a>
          </div>
        </div>

        <div className=" card" style={{width:350}}>
          <img className="card-img-top" src={uploadPhoto} alt="spotify logo"/>
          <div className="card-body">
          <input className='btn' type="file" multiple onChange={addFile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;