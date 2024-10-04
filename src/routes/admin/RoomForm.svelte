<script lang="ts">
  import {
    roomName,
    roomDescription,
    roomNumber,
    roomTypesId,
    blocked,
    status,
    inventory,
    phone,
    roomTypeName,
    roomTypeDescription,
    standardRate,
    options,
    occupancyAdult,
    occupancyChildren,
    amenityName,
    errorMessage,
    successMessage,
    submitRoomType,
    submitRoom,
    submitRoomAmenity
  } from './roomService';
</script>

<div class="flex-1 p-8 bg-white shadow-lg rounded-lg">
  <h2 class="text-3xl font-bold mb-6">Register Room</h2>

  {#if errorMessage}
    <div class="bg-red-100 text-red-700 p-4 rounded mb-4">{errorMessage}</div>
  {/if}
  {#if successMessage}
    <div class="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>
  {/if}

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
    <button on:click={submitRoomType} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save Room Type</button>
  </div>

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
    <button on:click={submitRoom} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save Room</button>
  </div>

  <!-- Room Amenity Form -->
  <div class="mb-6">
    <h3 class="text-xl font-bold mb-4">Room Amenity Information</h3>
    <div class="mb-4">
      <label class="block text-gray-700 mb-2" for="amenityName">Amenity Name <span class="text-red-500">*</span></label>
      <input id="amenityName" type="text" bind:value={amenityName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter amenity name" />
    </div>
    <button on:click={submitRoomAmenity} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save Room Amenity</button>
  </div>
</div>
