import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    const response = await fetch(`http://localhost:7272/api/v1/hotel/${params.id}`);
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
