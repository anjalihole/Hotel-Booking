import type { PageLoad } from './$types';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const load: PageLoad = async ({ params }) => {
  try {
    const response = await fetch(`${apiUrl}/hotel/${params.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch hotel details');
    }
    const data = await response.json();
    return {
      hotel: data.Data.Hotel,
    };
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
};
