<script lang="ts">
  import { hotels } from '../stores/hotels';
  import Header from './components/Header.svelte';
  import Search from './components/Search.svelte';
  import HotelCard from './components/HotelCard.svelte';
  import { onMount } from 'svelte';
  import { loadHotels } from './hotelService'; 
  import type { Hotel } from './types'; 

  let hotelList: Hotel[] = [];

  hotels.subscribe((value: Hotel[]) => {
      hotelList = value;
  });

  onMount(() => {
      loadHotels();
  });
</script>

<Header activePage="home" />
<Search />

<div class="container mx-auto mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
  {#if Array.isArray(hotelList) && hotelList.length > 0}
      {#each hotelList as hotel}
          <HotelCard {hotel} />
      {/each}
  {:else}
      <p>No hotels found.</p>
  {/if}
</div>
