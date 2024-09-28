import { api as apiService, ApiService } from "./api";

const googleMapsKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";

class GoogleMapsService {
  constructor(
    private readonly api: ApiService,
    private readonly mapsKey: string,
  ) {}

  async getGeocode(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.mapsKey}`;
    const response = await this.api.get(url);
    return response.results;
  }
}

export const googleMapsService = new GoogleMapsService(
  apiService,
  googleMapsKey,
);
