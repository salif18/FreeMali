import React ,{ useState} from 'react';
import { ReactMic } from 'react-mic';

const RecordingVocal = () => {

    const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedData) => {
    // Vous pouvez traiter les données audio ici si nécessaire
    console.log('Données audio en cours d\'enregistrement :', recordedData);
  };

  const onStop = (recordedData) => {
    // recordedData contient le blob audio enregistré
    console.log('Enregistrement terminé :', recordedData);
    setAudioBlob(recordedData.blob);
  };
    return (
        <div className='recorvocal'>
          
           <ReactMic 
              className="sound-wave"
              record={isRecording}             
              onStop={onStop} 
              onData={onData} 
           />
           {audioBlob && (
            <audio controls className='vocal'>
              <source src={URL.createObjectURL(audioBlob)} />
            </audio>
           )}

           <button className='btn-reord' onClick={startRecording} disabled={isRecording}>
           enregistrement
          </button>
          <button className='btn-stop' onClick={stopRecording} disabled={!isRecording}>
           Arrêter 
          </button>
        </div>
    );
}

export default RecordingVocal;