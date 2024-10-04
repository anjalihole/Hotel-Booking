<script lang="ts">
    import Header from '../../lib/components/Header.svelte';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    import Multiselect from 'svelte-multiselect';
    import {
        step, name, phone, email, description, checkInTime, checkOutTime, photos, addressLine1, addressLine2, street,
        city, state, country, zipCode, rulesName, rulesDescription, aminityName, nameError, phoneError, emailError,
        descriptionError, checkInTimeError, checkOutTimeError, addressLine1Error, cityError, stateError, countryError,
        zipCodeError, rulesNameError, rulesDescriptionError, aminityNameError, rulesOptions, aminityOptions, handleNext,
        handlePrevious, handleRegisterHotel, handleFileChange, errorMessage, successMessage
    } from './hotelRegistrationService';
  import { onMount } from 'svelte';

    onMount(() => {
        flatpickr("#checkInTime", { enableTime: true, dateFormat: "Y-m-d H:i" });
        flatpickr("#checkOutTime", { enableTime: true, dateFormat: "Y-m-d H:i" });
    });
</script>

<Header activePage="admin" />

<div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/4 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
            <h2 class="text-2xl font-bold mb-6">Admin Menu</h2>
            <ul class="space-y-4">
                <li>
                    <a href="/admin" class="block hover:text-gray-400">Hotel</a>
                </li>
                <li>
                    <a href="/admin/room" class="block hover:text-gray-400">Rooms</a>
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

    <!-- Main Content -->
    <div class="flex-1 p-8 bg-white shadow-lg rounded-lg">
        {#if errorMessage}
            <div class="bg-red-100 text-red-700 p-4 rounded mb-4">{errorMessage}</div>
        {/if}
        {#if successMessage}
            <div class="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>
        {/if}
        <form on:submit|preventDefault={handleRegisterHotel}>
            {#if step === 1}
                <!-- Step 1: Hotel Details Form -->
                <!-- Similar content as before... -->
            {/if}
            {#if step === 2}
                <!-- Step 2: Address Form -->
                <!-- Similar content as before... -->
            {/if}
            {#if step === 3}
                <!-- Step 3: Property Rules and Amenities Form -->
                <!-- Similar content as before... -->
            {/if}
            <div class="flex justify-between mt-6">
                {#if step > 1}
                    <button type="button" on:click={handlePrevious} class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">Previous</button>
                {/if}
                {#if step < 3}
                    <button type="button" on:click={handleNext} class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
                {:else}
                    <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">Register Hotel</button>
                {/if}
            </div>
        </form>
    </div>
</div>
