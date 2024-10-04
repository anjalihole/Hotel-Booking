export let roomName = '';
export let roomDescription = '';
export let roomNumber = '';
export let roomTypesId = '';
export let blocked = 'False';
export let status = 'Yes';
export let inventory = '';
export let phone = '';
export let roomTypeName = '';
export let roomTypeDescription = '';
export let standardRate = '';
export let options = '';
export let occupancyAdult = '';
export let occupancyChildren = '';
export let amenityName = '';
export let roomId = '';
export let hotelId = 'd1ef7472-e31c-441a-bf0e-7dcd77b3ee7e'; 
export let errorMessage = '';
export let successMessage = '';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const submitRoomType = async () => {
  errorMessage = '';
  successMessage = '';

  try {
    const response = await fetch(`${apiUrl}/roomtypes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TypeName: roomTypeName,
        TypeDescription: roomTypeDescription,
        StandardRate: standardRate,
        Options: options,
        OccupancyAdult: occupancyAdult,
        OccupancyChildren: occupancyChildren,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      roomTypesId = data.id; // Assuming the ID of the created room type is returned in the response
      successMessage = 'Room type registered successfully!';
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save room type.');
    }
  } catch (error) {
    errorMessage = error.message;
    console.error('Error submitting room type:', error);
  }
};

export const submitRoom = async () => {
  errorMessage = '';
  successMessage = '';

  try {
    const response = await fetch(`${apiUrl}/room/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: roomName,
        Description: roomDescription,
        RoomTypesId: roomTypesId, // Use the created room type ID
        RoomNumber: roomNumber,
        Blocked: blocked,
        Status: status,
        Inventory: inventory,
        Phone: phone,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      roomId = data.id; // Assuming the ID of the created room is returned in the response
      successMessage = 'Room registered successfully!';
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save room.');
    }
  } catch (error) {
    errorMessage = error.message;
    console.error('Error submitting room:', error);
  }
};

export const submitRoomAmenity = async () => {
  errorMessage = '';
  successMessage = '';

  try {
    const response = await fetch(`${apiUrl}/roomamenities/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AmenityName: amenityName,
        RoomId: roomId, // Use the created room ID
        HotelId: hotelId,
      }),
    });

    if (response.ok) {
      successMessage = 'Room amenity registered successfully!';
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save room amenity.');
    }
  } catch (error) {
    errorMessage = error.message;
    console.error('Error submitting room amenity:', error);
  }
};
