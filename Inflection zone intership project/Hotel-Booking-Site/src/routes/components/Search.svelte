<script>
    import { onMount } from 'svelte';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    import { hotels } from '../../stores/hotels';
  
    let location = '';
    let checkInDate = '';
    let checkOutDate = '';
    let adults = 2;
    let children = 1;
  
    onMount(() => {
      flatpickr("#checkin", { dateFormat: "Y-m-d" });
      flatpickr("#checkout", { dateFormat: "Y-m-d" });
    });
  
    const searchHotels = async () => {
      try {
        const response = await fetch(`http://localhost:7272/api/v1/hotel/search?Name=${location}`);
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
    };
  </script>
  
  <div class="bg-blue-700 text-white p-6">
    <div class="container mx-auto">
      <div class="text-left mb-8">
        <h1 class="text-4xl font-bold">Find your next stay</h1>
        <p class="text-xl text-gray-300">Search low prices on hotels, homes and much more...</p>
      </div>
      <div class="bg-white p-4 rounded-md shadow-md flex items-center">
        <div class="flex-1 p-2">
          <input type="text" placeholder="Pune" bind:value={location} class="border p-2 rounded w-full text-black">
        </div>
        <div class="flex-1 p-2">
          <input type="text" id="checkin" placeholder="Check-in Date" bind:value={checkInDate} class="border p-2 rounded w-full text-black">
        </div>
        <div class="flex-1 p-2">
          <input type="text" id="checkout" placeholder="Check-out Date" bind:value={checkOutDate} class="border p-2 rounded w-full text-black">
        </div>
        <div class="flex-1 p-2">
          <input type="text" placeholder="2 adults · 1 child" class="border p-2 rounded w-full text-black">
        </div>
        <div class="p-2">
          <button class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" on:click={searchHotels}>Search</button>
        </div>
      </div>
    </div>
  </div>
  