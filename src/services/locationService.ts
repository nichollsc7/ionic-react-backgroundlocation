import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface LocationResponse {
  success: boolean;
  message: string;
  data?: any;
}

class LocationService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async sendLocation(locationData: LocationData): Promise<LocationResponse> {
    try {
      const response = await this.api.post('/locations', locationData);
      return {
        success: true,
        message: 'Location sent successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error sending location:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error sending location',
      };
    }
  }

  async getLocations(): Promise<LocationData[]> {
    try {
      const response = await this.api.get('/locations');
      return response.data;
    } catch (error) {
      console.error('Error getting locations:', error);
      throw error;
    }
  }

  async deleteLocations(): Promise<LocationResponse> {
    try {
      const response = await this.api.delete('/locations');
      return {
        success: true,
        message: 'Locations deleted successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error deleting locations:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error deleting locations',
      };
    }
  }
}

export const locationService = new LocationService(); 