<script lang="ts">
    import Header from '../../lib/components/Header.svelte';
    import { handleRegister } from './registerService';
    import type { RegistrationForm } from '../types';

    let formData: RegistrationForm = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
    };

    let errorMessage = '';
    let successMessage = '';

    const submitForm = async () => {
        const { error, success } = await handleRegister(formData);
        errorMessage = error;
        successMessage = success;
    };
</script>

<Header activePage="register" />

<div class="container mx-auto mt-4">
    <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-md bg-white shadow-md rounded-md p-6">
            <h1 class="text-3xl font-bold mb-6 text-center">Register</h1>
            {#if errorMessage}
                <div class="bg-red-100 text-red-700 p-2 rounded mb-4">{errorMessage}</div>
            {/if}
            {#if successMessage}
                <div class="bg-green-100 text-green-700 p-2 rounded mb-4">{successMessage}</div>
            {/if}
            <form on:submit|preventDefault={submitForm}>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name</label>
                    <input id="firstName" type="text" bind:value={formData.firstName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">Last Name</label>
                    <input id="lastName" type="text" bind:value={formData.lastName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                    <input id="email" type="email" bind:value={formData.email} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone</label>
                    <input id="phone" type="text" bind:value={formData.phone} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input id="password" type="password" bind:value={formData.password} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Register</button>
                </div>
                <p class="mt-4 text-center">
                    Already have an account? <a href="/login" class="text-blue-700 hover:underline">Login</a>
                </p>
            </form>
        </div>
    </div>
</div>
