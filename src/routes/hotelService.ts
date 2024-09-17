import { hotels } from '../stores/hotels';

export async function loadHotels() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
        const response = await fetch(`${apiBaseUrl}/hotel/search`);
        const data = await response.json();
        if (data.Status === "success" && Array.isArray(data.Data?.HotelRecords?.Items)) {
            hotels.set(data.Data.HotelRecords.Items);
        } else {
            console.error('Expected an array of hotels but received:', data);
            hotels.set([]);
        }
    } catch (error) {
        console.error('Error fetching hotels:', error);
        hotels.set([]);
    }
}
