<script>
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  export let activePage = 'home';
  let isLoggedIn = false;

  
  onMount(() => {
    const token = sessionStorage.getItem('token');
    isLoggedIn = !!token;
  });

  const handleLogout = () => {
    
    sessionStorage.removeItem('token');
    
    goto('/');
    // window.location.reload(); // Or use `navigate('/')` if you want to redirect

  };
</script>

<header class="bg-blue-700 text-white p-4 sticky top-0 z-50">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="text-2xl font-bold">DreamStay.com</a>
    <nav class="space-x-4 flex items-center">
      <a href="/" class="hover:underline {activePage === 'home' ? 'underline' : ''} flex items-center">
        <span class="material-icons">Hotel</span>
      </a>
      <a href="/flights" class="hover:underline {activePage === 'flights' ? 'underline' : ''}">Flights</a>
      <a href="/car-rentals" class="hover:underline {activePage === 'car-rentals' ? 'underline' : ''}">Car Rentals</a>
      <a href="/attractions" class="hover:underline {activePage === 'attractions' ? 'underline' : ''}">Attractions</a>
      <a href="/airport-taxis" class="hover:underline {activePage === 'airport-taxis' ? 'underline' : ''}">Airport Taxis</a>
      {#if isLoggedIn}
        <a href="/admin" class="hover:underline {activePage === 'admin' ? 'underline' : ''}">Admin</a>
      {/if}
    </nav>
    <div class="flex items-center">
      <span class="mr-4">INR</span>
      {#if isLoggedIn}
        <button on:click={handleLogout} class="mr-4 hover:underline">Logout</button>
      {:else}
        <a href="/login" class="mr-4 hover:underline {activePage === 'login' ? 'underline' : ''}">Login</a>
        <a href="/register" class="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-200 {activePage === 'register' ? 'bg-gray-200' : ''}">Register</a>
      {/if}
    </div>
  </div>
</header>
