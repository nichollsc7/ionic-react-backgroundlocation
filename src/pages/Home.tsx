import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useAppSelector } from '../store/hooks';
import PlayPauseButton from '../components/PlayPauseButton';
import './Home.css';

const Home: React.FC = () => {
  const { locationEnabled, currentLocation, loadingStatus } = useAppSelector(state => state.location);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Location Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Location Tracking</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PlayPauseButton />
        
        {currentLocation && (
          <div className="location-info">
            <h3>Current Location:</h3>
            <p>Latitude: {currentLocation.latitude}</p>
            <p>Longitude: {currentLocation.longitude}</p>
            <p>Time: {currentLocation.timestamp}</p>
          </div>
        )}
        
        {loadingStatus === 'loading' && (
          <div className="loading-indicator">
            <p>Sending location data...</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
