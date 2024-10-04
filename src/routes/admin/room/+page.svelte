<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '../../../lib/components/Header.svelte';
  import Sidebar from '../Sidebar.svelte';
  
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
  
    const validateStep1 = () => {
      if (!roomTypeName || !roomTypeDescription || !standardRate || !occupancyAdult || !occupancyChildren) {
        errorMessage = 'Please fill out all required fields.';
        return false;
      }
      return true;
    };
  
    const validateStep2 = () => {
      if (!roomName || !roomDescription || !roomNumber || !phone) {
        errorMessage = 'Please fill out all required fields.';
        return false;
      }
      return true;
    };
  
    const submitRoomType = async () => {
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

  const submitRoom = async () => {
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
  
    const submitRoomAmenity = async () => {
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
  
    const handleNext = () => {
      if (step === 1 && validateStep1()) submitRoomType();
      if (step === 2 && validateStep2()) submitRoom();
    };
  
    const handlePrevious = () => {
      if (step > 1) step -= 1;
    };
  </script>
  
  <Header activePage="admin" />
  
  <div class="flex h-screen">
      <!-- Sidebar -->
      <Sidebar />
  
      <!-- Main Content -->
      <div class="flex-1 p-8 bg-white shadow-lg rounded-lg">
          <h2 class="text-3xl font-bold mb-6">Register Room</h2>
        
          {#if errorMessage}
            <div class="bg-red-100 text-red-700 p-4 rounded mb-4">{errorMessage}</div>
          {/if}
          {#if successMessage}
            <div class="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>
          {/if}
  
          {#if step === 1}
          <!-- Room Type Form -->
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">Room Type Information</h3>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="roomTypeName">Room Type Name <span class="text-red-500">*</span></label>
              <input id="roomTypeName" type="text" bind:value={roomTypeName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter room type name" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="roomTypeDescription">Room Type Description <span class="text-red-500">*</span></label>
              <textarea id="roomTypeDescription" bind:value={roomTypeDescription} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder="Enter room type description"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="standardRate">Standard Rate <span class="text-red-500">*</span></label>
              <input id="standardRate" type="text" bind:value={standardRate} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter standard rate" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="options">Options</label>
              <input id="options" type="text" bind:value={options} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter options" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="occupancyAdult">Occupancy Adult <span class="text-red-500">*</span></label>
              <input id="occupancyAdult" type="text" bind:value={occupancyAdult} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter number of adults" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="occupancyChildren">Occupancy Children <span class="text-red-500">*</span></label>
              <input id="occupancyChildren" type="text" bind:value={occupancyChildren} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter number of children" />
            </div>
          </div>
          {/if}
  
          {#if step === 2}
          <!-- Room Form -->
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">Room Information</h3>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="roomName">Room Name <span class="text-red-500">*</span></label>
              <input id="roomName" type="text" bind:value={roomName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter room name" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="roomDescription">Room Description <span class="text-red-500">*</span></label>
              <textarea id="roomDescription" bind:value={roomDescription} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder="Enter room description"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="roomNumber">Room Number <span class="text-red-500">*</span></label>
              <input id="roomNumber" type="text" bind:value={roomNumber} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter room number" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="inventory">Inventory</label>
              <input id="inventory" type="text" bind:value={inventory} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter inventory items" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="phone">Phone <span class="text-red-500">*</span></label>
              <input id="phone" type="text" bind:value={phone} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter phone number" />
            </div>
          </div>
          {/if}
  
          {#if step === 3}
          <!-- Room Amenity Form -->
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">Room Amenity Information</h3>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="amenityName">Amenity Name <span class="text-red-500">*</span></label>
              <input id="amenityName" type="text" bind:value={amenityName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter amenity name" />
            </div>
          </div>
          {/if}
  
          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-6">
            {#if step > 1}
              <button type="button" on:click={handlePrevious} class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">Previous</button>
            {/if}
            {#if step < 3}
              <button type="button" on:click={handleNext} class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
            {:else}
              <button type="button" on:click={submitRoomAmenity} class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
            {/if}
          </div>
      </div>
  </div>
  