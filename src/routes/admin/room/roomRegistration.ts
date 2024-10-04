import { onMount } from 'svelte';

let step = 1; // Manage the steps in the form
let roomName = '';
let roomDescription = '';
let roomNumber = '';
let roomTypesId = '';
let blocked = 'False';
let status = 'Yes';
let inventory = '';
let phone = '';
let roomTypeName = '';
let roomTypeDescription = '';
let standardRate = '';
let options = '';
let occupancyAdult = '';
let occupancyChildren = '';
let amenityName = '';
let roomId = '';
let hotelId = 'd1ef7472-e31c-441a-bf0e-7dcd77b3ee7e'; // Replace with the actual hotel ID
let errorMessage = '';
let successMessage = '';

export const validateStep1 = () => {
  if (!roomTypeName || !roomTypeDescription || !standardRate || !occupancyAdult || !occupancyChildren) {
    errorMessage = 'Please fill out all required fields.';
    return false;
  }
  return true;
};

export const validateStep2 = () => {
  if (!roomName || !roomDescription || !roomNumber || !phone) {
    errorMessage = 'Please fill out all required fields.';
    return false;
  }
  return true;
};

export const submitRoomType = async () => {
  errorMessage = '';
  successMessage = '';

  try {
    const response = await fetch('http://localhost:7272/api/v1/roomtypes/', {
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
      roomTypesId = data.Data?.RoomTypes?.id || ''; // Ensure that RoomTypesId is set
      if (!roomTypesId) {
        throw new Error('Failed to retrieve RoomTypesId from the response.');
      }
      successMessage = 'Room type registered successfully!';
      step += 1; // Proceed to the next step
    } else {
      const errorData = await response.json();
      throw new Error(errorData.Message || 'Failed to save room type.');
    }
  } catch (error) {
    errorMessage = error.message;
    console.error('Error submitting room type:', error);
  }
};

export const submitRoom = async () => {
  if (!roomTypesId) {
    errorMessage = 'RoomTypesId is required. Please complete the Room Type step first.';
    return;
  }

  errorMessage = '';
  successMessage = '';

  try {
    const response = await fetch('http://localhost:7272/api/v1/room/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: roomName,
        Description: roomDescription,
        RoomTypesId: roomTypesId, // Ensure this is correctly set
        RoomNumber: roomNumber,
        Blocked: blocked,
        Status: status,
        Inventory: inventory,
        Phone: phone,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      roomId = data.Data?.id || ''; // Ensure that roomId is set
      successMessage = 'Room registered successfully!';
      step += 1; // Proceed to the next step
    } else {
      const errorData = await response.json();
      throw new Error(errorData.Message || 'Failed to save room.');
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
    const response = await fetch('http://localhost:7272/api/v1/roomamenities/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AmenityName: amenityName,
        RoomId: roomId,
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

export const handleNext = () => {
  if (step === 1 && validateStep1()) submitRoomType();
  if (step === 2 && validateStep2()) submitRoom();
};

export const handlePrevious = () => {
  if (step > 1) step -= 1;
};
