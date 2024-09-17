<script lang="ts">
  import Header from "../../components/Header.svelte";
  import { onMount } from 'svelte';

  export let data: {
    hotel: {
      id: string;
      Name: string;
      Address: {
        AddressLine1: string;
        AddressLine2: string;
        Street: string;
        City: string;
        State: string;
        Country: string;
        ZipCode: string;
      };
      Description: string;
      Email: string;
      CheckInTime: string;
      CheckOutTime: string;
      Phone: string;
      Photos: string;
      Aminities: Array<{ AminityName: string }>;
      Reviews: Array<{
        Rating: string;
        ReviewTitle: string;
        ReviewDescription: string;
        ReviewTimeStamp: string;
        ReviewUserId: string;
      }>;
    };
  };

  let reviewRating = 0;
  let reviewTitle = '';
  let reviewDescription = '';
  let reviewError = '';
  let reviewSuccess = '';

  const submitReview = async () => {
    reviewError = '';
    reviewSuccess = '';

    if (!reviewRating || !reviewTitle || !reviewDescription) {
      reviewError = 'All fields are required.';
      return;
    }

    try {
      const response = await fetch('http://localhost:7272/api/v1/hotelreview/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          HotelId: data.hotel.id,
          ReviewUserId: '4', // Replace this with dynamic user ID if available
          Rating: reviewRating.toFixed(1),
          ReviewTitle: reviewTitle,
          ReviewDescription: reviewDescription,
          ReviewTimeStamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newReview = {
          Rating: reviewRating.toFixed(1),
          ReviewTitle: reviewTitle,
          ReviewDescription: reviewDescription,
          ReviewTimeStamp: new Date().toISOString(),
          ReviewUserId: '4', // Replace this with dynamic user ID if available
        };
        data.hotel.Reviews.push(newReview);
        reviewSuccess = 'Review submitted successfully!';
        reviewRating = 0;
        reviewTitle = '';
        reviewDescription = '';
      } else {
        reviewError = 'Failed to submit the review.';
      }
    } catch (error) {
      reviewError = 'An error occurred while submitting your review.';
      console.error('Error submitting review:', error);
    }
  };

  const setRating = (rating: number) => {
    reviewRating = rating;
  };

  onMount(() => {
    console.log('Hotel data:', data.hotel);
  });
</script>

<Header activePage="stays" />

{#if data && data.hotel}
  <div class="container mx-auto mt-4">
    <!-- Hotel Details Section -->
    <div class="flex flex-col md:flex-row">
      <div class="md:w-2/3 p-4">
        <h1 class="text-3xl font-bold mb-4">{data.hotel.Name}</h1>
        <div class="grid grid-cols-3 gap-2 mb-4">
          <div class="col-span-2 row-span-2">
            <img src="/images/hotel-placeholder.png" alt={data.hotel.Name} class="w-full h-full object-cover rounded-md">
          </div>
          {#each [1, 2, 3, 4] as _}
            <div>
              <img src="/images/hotel-placeholder.png" alt={data.hotel.Name} class="w-full h-full object-cover rounded-md">
            </div>
          {/each}
          <div class="relative">
            <img src="/images/hotel-placeholder.png" alt={data.hotel.Name} class="w-full h-full object-cover rounded-md">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span class="text-white text-lg font-bold">+37 photos</span>
            </div>
          </div>
        </div>
        <p class="text-gray-700">{data.hotel.Description}</p>
      </div>
      <div class="md:w-1/3 p-4">
        <div class="bg-white shadow-md rounded-md p-4 mb-4">
          <h2 class="text-xl font-bold mb-2">Contact Information</h2>
          <p>Email: {data.hotel.Email}</p>
          <p>Phone: {data.hotel.Phone}</p>
          <p>Check-in: {data.hotel.CheckInTime}</p>
          <p>Check-out: {data.hotel.CheckOutTime}</p>
        </div>
      </div>
    </div>

    <!-- Amenities Section -->
    <div class="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
      {#each data.hotel.Aminities as amenity}
        <div class="flex items-center bg-white shadow-md rounded-md p-2">
          <span class="mr-2">🌟</span>
          <p>{amenity.AminityName}</p>
        </div>
      {/each}
    </div>

    <!-- Address Section -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Address</h2>
      <p class="text-gray-700">
        {data.hotel.Address.AddressLine1}, {data.hotel.Address.AddressLine2}, 
        {data.hotel.Address.Street}, {data.hotel.Address.City}, 
        {data.hotel.Address.State}, {data.hotel.Address.Country} - 
        {data.hotel.Address.ZipCode}
      </p>
    </div>

    <!-- Reviews Section -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Reviews</h2>
      <!-- Display Existing Reviews -->
      {#each data.hotel.Reviews as review}
        <div class="bg-white shadow-md rounded-md p-4 mb-4">
          <h3 class="text-xl font-bold mb-2">{review.ReviewTitle}</h3>
          <div class="flex items-center mb-2">
            {#each [1, 2, 3, 4, 5] as star}
              <span class="text-2xl"
                class:text-yellow-500={star <= +review.Rating}
                class:text-gray-300={star > +review.Rating}
              >★</span>
            {/each}
            <p class="text-sm text-gray-500 ml-2">{new Date(review.ReviewTimeStamp).toLocaleDateString()}</p>
          </div>
          <p>{review.ReviewDescription}</p>
        </div>
      {/each}
    </div>

    <!-- Review Submission Form -->
    <div class="bg-white shadow-md rounded-md p-4 mt-8">
      <h3 class="text-xl font-bold mb-2">Submit Your Review</h3>
      {#if reviewError}
        <div class="text-red-500 mb-2">{reviewError}</div>
      {/if}
      {#if reviewSuccess}
        <div class="text-green-500 mb-2">{reviewSuccess}</div>
      {/if}
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Rating <span class="text-red-500">*</span></label>
        <div class="flex items-center">
          {#each [1, 2, 3, 4, 5] as star}
            <span
              class="cursor-pointer text-3xl mr-1"
              class:opacity-50={star > reviewRating}
              on:click={() => setRating(star)}
            >
              ★
            </span>
          {/each}
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="reviewTitle">Review Title <span class="text-red-500">*</span></label>
        <input id="reviewTitle" type="text" bind:value={reviewTitle} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Summary of your experience">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="reviewDescription">Review Description <span class="text-red-500">*</span></label>
        <textarea id="reviewDescription" bind:value={reviewDescription} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder="Describe your experience in detail"></textarea>
      </div>
      <button on:click={submitReview} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit Review</button>
    </div>
  </div>
{:else}
  <p class="text-center text-red-500">Error loading hotel details.</p>
{/if}
