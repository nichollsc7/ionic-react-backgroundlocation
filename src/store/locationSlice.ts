import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { locationService, LocationData } from '../services/locationService';

export interface LocationState {
  locationEnabled: boolean;
  currentLocation: LocationData | null;
  locationHistory: LocationData[];
  loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorMessage: string | null;
}

const initialState: LocationState = {
  locationEnabled: false,
  currentLocation: null,
  locationHistory: [],
  loadingStatus: 'idle',
  errorMessage: null,
};

// Thunk for sending locations
export const sendLocationAsync = createAsyncThunk(
  'location/sendLocation',
  async (locationData: LocationData) => {
    const response = await locationService.sendLocation(locationData);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }
);

// Thunk for getting locations
export const getLocationsAsync = createAsyncThunk(
  'location/getLocations',
  async () => {
    return await locationService.getLocations();
  }
);

// Thunk for deleting locations
export const deleteLocationsAsync = createAsyncThunk(
  'location/deleteLocations',
  async () => {
    const response = await locationService.deleteLocations();
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationEnabled: (state, action: PayloadAction<boolean>) => {
      state.locationEnabled = action.payload;
    },
    setCurrentLocation: (state, action: PayloadAction<LocationData>) => {
      state.currentLocation = action.payload;
    },
    addLocationToHistory: (state, action: PayloadAction<LocationData>) => {
      state.locationHistory.push(action.payload);
    },
    clearLocationHistory: (state) => {
      state.locationHistory = [];
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send location
      .addCase(sendLocationAsync.pending, (state) => {
        state.loadingStatus = 'loading';
        state.errorMessage = null;
      })
      .addCase(sendLocationAsync.fulfilled, (state) => {
        state.loadingStatus = 'succeeded';
      })
      .addCase(sendLocationAsync.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.errorMessage = action.error.message || 'Error sending location';
      })
      // Get locations
      .addCase(getLocationsAsync.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(getLocationsAsync.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.locationHistory = action.payload;
      })
      .addCase(getLocationsAsync.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.errorMessage = action.error.message || 'Error getting locations';
      })
      // Delete locations
      .addCase(deleteLocationsAsync.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(deleteLocationsAsync.fulfilled, (state) => {
        state.loadingStatus = 'succeeded';
        state.locationHistory = [];
      })
      .addCase(deleteLocationsAsync.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.errorMessage = action.error.message || 'Error deleting locations';
      });
  },
});

export const {
  setLocationEnabled,
  setCurrentLocation,
  addLocationToHistory,
  clearLocationHistory,
  clearError,
} = locationSlice.actions;

export default locationSlice.reducer; 