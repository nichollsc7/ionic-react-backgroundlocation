import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { play, pause } from 'ionicons/icons';
import { useLocationTracking } from '../hooks/useLocationTracking';
import './PlayPauseButton.css';

const PlayPauseButton: React.FC = () => {
  // Hook personalizado que maneja el seguimiento de ubicación
  const { locationEnabled, toggleLocationTracking } = useLocationTracking();

  // Función que se ejecuta al hacer clic en el botón
  const handleToggle = () => {
    console.log(`Location tracking ${locationEnabled ? 'stopping' : 'starting'}...`);
    toggleLocationTracking();
  };

  return (
    <div className="play-pause-container">
      <IonButton
        className={`play-pause-button ${locationEnabled ? 'playing' : 'paused'}`}
        onClick={handleToggle}
        fill="clear"
        size="large"
        aria-label={locationEnabled ? 'Pause location tracking' : 'Start location tracking'}
      >
        <IonIcon 
          icon={locationEnabled ? pause : play} 
          className="play-pause-icon"
        />
      </IonButton>
      
      {/* Indicador de estado */}
      <div className="status-indicator">
        <p className="status-text">
          {locationEnabled ? '📍 Tracking active' : '⏸️ Tracking paused'}
        </p>
      </div>
    </div>
  );
};

export default PlayPauseButton; 