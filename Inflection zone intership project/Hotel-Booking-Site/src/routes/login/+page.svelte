<script lang="ts">
  import Header from '../components/Header.svelte';
  import { handleLogin } from './loginService'; 

  let email = '';
  let password = '';
  let errorMessage = '';

  const submitForm = async () => {
      const result = await handleLogin(email, password);
      errorMessage = result.errorMessage;
  };
</script>

<Header activePage="login" />

<div class="container mx-auto mt-4">
  <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md bg-white shadow-md rounded-md p-6">
          <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>
          {#if errorMessage}
              <div class="bg-red-100 text-red-700 p-2 rounded mb-4">{errorMessage}</div>
          {/if}
          <form on:submit|preventDefault={submitForm}>
              <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                  <input id="email" type="email" bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                  <input id="password" type="password" bind:value={password} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div class="flex items-center justify-between">
                  <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Login</button>
              </div>
              <p class="mt-4 text-center">
                  Don't have an account? <a href="/register" class="text-blue-700 hover:underline">Register</a>
              </p>
          </form>
      </div>
  </div>
</div>
