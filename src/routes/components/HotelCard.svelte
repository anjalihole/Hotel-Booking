<script lang="ts">
  export let hotel: {
    id: number;
    Name: string;
    Email: string;
    image: string;
    price: string;
  };

  const navigateToDetails = () => {
    window.location.href = `/hotel/${hotel.id}`;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="bg-white shadow-md rounded-md overflow-hidden transform transition-all hover:scale-105 cursor-pointer" on:click={navigateToDetails}>
  <img src="/img1.png" alt="img" class="w-full h-48 object-cover">
  <div class="p-4">
    <h2 class="text-xl font-bold">{hotel.Name}</h2>
    <p class="text-gray-600">{hotel.Email}</p>
    <p class="text-blue-700 font-semibold">7000</p>
  </div>
</div>
