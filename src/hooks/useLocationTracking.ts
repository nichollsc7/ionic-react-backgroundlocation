import { Geolocation as CapacitorGeolocation } from "@capacitor/geolocation";
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
import { registerPlugin, Capacitor } from "@capacitor/core";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  setLocationEnabled, 
  setCurrentLocation, 
  addLocationToHistory,
  sendLocationAsync 
} from "../store/locationSlice";
import { LocationData } from "../services/locationService";

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

export const useLocationTracking = () => {
  const dispatch = useAppDispatch();
  const locationEnabled = useAppSelector(state => state.location.locationEnabled);
  const callbackIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const clearWatcher = () => {
      if (callbackIdRef.current) {
        if (Capacitor.isNativePlatform()) {
          BackgroundGeolocation.removeWatcher({ id: callbackIdRef.current });
        } else {
          CapacitorGeolocation.clearWatch({ id: callbackIdRef.current });
        }
        callbackIdRef.current = undefined;
      }
    };

    const sendLocationData = async (locationData: LocationData) => {
      try {
        await dispatch(sendLocationAsync(locationData)).unwrap();
        dispatch(addLocationToHistory(locationData));
        dispatch(setCurrentLocation(locationData));
      } catch (error) {
        console.error('Error sending location data:', error);
      }
    };

    const initializeLocationTracking = async () => {
      if (locationEnabled) {
        if (Capacitor.isNativePlatform()) {
          callbackIdRef.current = await BackgroundGeolocation.addWatcher(
            {
              requestPermissions: true,
              stale: true,
              distanceFilter: 10,
              backgroundMessage: "Location tracking is enabled",
              backgroundTitle: "Location Tracking",
            },
            async function (location, error) {
              if (error) {
                dispatch(setLocationEnabled(false));
                if (error.code === "NOT_AUTHORIZED") {
                  if (window.confirm("Location permissions required...")) {
                    BackgroundGeolocation.openSettings();
                  }
                }
                return console.error(error);
              } else if (location) {
                const now = new Date();
                const options = { timeZone: 'America/Bogota' };
                const currentTime = now.toLocaleTimeString('es-CO', options);
                const timeArray = currentTime.split(' ');
                const time = timeArray[0].substring(0, 4);

                const locationData: LocationData = {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  timestamp: time,
                };

                await sendLocationData(locationData);
              }
            }
          );
        } else {
          await checkCurrentPosition();
          callbackIdRef.current = await CapacitorGeolocation.watchPosition(
            {
              enableHighAccuracy: true,
              timeout: 50000,
              maximumAge: 10000,
            },
            async (coordinates, error) => {
              if (coordinates) {
                const now = new Date();
                const options = { timeZone: 'America/Bogota' };
                const currentTime = now.toLocaleTimeString('es-CO', options);
                const timeArray = currentTime.split(' ');
                const time = timeArray[0].substring(0, 4);

                const locationData: LocationData = {
                  latitude: coordinates.coords.latitude,
                  longitude: coordinates.coords.longitude,
                  timestamp: time,
                };
                await sendLocationData(locationData);
              }
              if (error) {
                dispatch(setLocationEnabled(false));
              }
            }
          );
        }
      } else {
        clearWatcher();
      }
    };

    initializeLocationTracking();

    return () => {
      clearWatcher();
    };
  }, [locationEnabled, dispatch]);

  const checkCurrentPosition = async () => {
    try {
      const now = new Date();
      const options = { timeZone: 'America/Bogota' };
      const currentTime = now.toLocaleTimeString('es-CO', options);
      const timeArray = currentTime.split(' ');
      const time = timeArray[0].substring(0, 4);
      
      await CapacitorGeolocation.checkPermissions();
      const coordinates = await CapacitorGeolocation.getCurrentPosition();

      const locationData: LocationData = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        timestamp: time,
      };
      
      await dispatch(sendLocationAsync(locationData)).unwrap();
      dispatch(addLocationToHistory(locationData));
      dispatch(setCurrentLocation(locationData));
    } catch (error) {
      console.error('Error checking current position:', error);
    }
  };

  const toggleLocationTracking = () => {
    dispatch(setLocationEnabled(!locationEnabled));
  };

  return {
    locationEnabled,
    checkCurrentPosition,
    toggleLocationTracking,
  };
}; 