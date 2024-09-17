<script lang="ts">
    import { navigate } from 'svelte-navigator';
  import Header from '../components/Header.svelte';
  
    const goToHotelForm = () => {
      navigate('/admin');
    };
  
    const goToRoomForm = () => {
      navigate('/admin/add-room');
    };
  </script>
  
  <div class="w-1/4 bg-gray-900 text-white p-6 flex flex-col justify-between h-full">
    <div>
      <h2 class="text-2xl font-bold mb-6">Adminssss Menu</h2>
      <ul class="space-y-4">
        <li>
          <button on:click={goToHotelForm} class="block w-full text-left hover:text-gray-400">Hotel</button>
        </li>
        <li>
          <button on:click={goToRoomForm} class="block w-full text-left hover:text-gray-400">Room</button>
        </li>
        <li>
          <a href="/admin/bookings" class="block hover:text-gray-400">Bookings</a>
        </li>
        <li>
          <a href="/admin/users" class="block hover:text-gray-400">Users</a>
        </li>
      </ul>
    </div>
  </div>
  