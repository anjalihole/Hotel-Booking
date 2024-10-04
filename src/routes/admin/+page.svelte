<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import { goto } from '$app/navigation';
    import Header from '../../lib/components/Header.svelte';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    import { onMount } from 'svelte';
    import Multiselect from 'svelte-multiselect';
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    let step = 1;
    let name = '';
    let phone = '';
    let email = '';
    let description = '';
    let checkInTime = '';
    let checkOutTime = '';
    let photos: string | any[] = [];
    let addressLine1 = '';
    let addressLine2 = '';
    let street = '';
    let city = '';
    let state = '';
    let country = '';
    let zipCode = '';
    let rulesName: any[] = [];
    let rulesDescription = 'Extra-person charges may apply and vary depending on property policy|Government-issued photo identification';
    let aminityName: string | any[] = [];
    let hotelId = 'b758d4d4-261a-4168-ab79-32795abb06d7';
    let errorMessage = '';
    let successMessage = '';

    let nameError = '';
    let phoneError = '';
    let emailError = '';
    let descriptionError = '';
    let checkInTimeError = '';
    let checkOutTimeError = '';
    let addressLine1Error = '';
    let cityError = '';
    let stateError = '';
    let countryError = '';
    let zipCodeError = '';
    let rulesNameError = '';
    let rulesDescriptionError = '';
    let aminityNameError = '';

    const rulesOptions = [
        'No Smoking',
        'Pets Allowed',
        'Quiet Hours',
        'Outside Food Not Allowed',
    ];

    const aminityOptions = [
        'Free WiFi',
        'Swimming Pool',
        'Fitness Center',
        'Kids Play Area',
        'Restaurant',
        'Parking',
    ];

    onMount(() => {
        // Check if user is logged in
        const token = sessionStorage.getItem('token');
        if (!token) {
            // Redirect to login page if not logged in
            goto('/login');
        }

        flatpickr("#checkInTime", { enableTime: true, dateFormat: "Y-m-d H:i" });
        flatpickr("#checkOutTime", { enableTime: true, dateFormat: "Y-m-d H:i" });
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone: string) => {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    };

    const validateStep1 = () => {
        let isValid = true;

        if (!name) {
            nameError = 'Hotel name is required.';
            isValid = false;
        } else {
            nameError = '';
        }

        if (!phone || !validatePhone(phone)) {
            phoneError = 'A valid 10-digit phone number is required.';
            isValid = false;
        } else {
            phoneError = '';
        }

        if (!email || !validateEmail(email)) {
            emailError = 'A valid email is required.';
            isValid = false;
        } else {
            emailError = '';
        }

        if (!description) {
            descriptionError = 'Description is required.';
            isValid = false;
        } else {
            descriptionError = '';
        }

        if (!checkInTime) {
            checkInTimeError = 'Check-in time is required.';
            isValid = false;
        } else {
            checkInTimeError = '';
        }

        if (!checkOutTime) {
            checkOutTimeError = 'Check-out time is required.';
            isValid = false;
        } else {
            checkOutTimeError = '';
        }

        return isValid;
    };

    const validateStep2 = () => {
        let isValid = true;

        if (!addressLine1) {
            addressLine1Error = 'Address line 1 is required.';
            isValid = false;
        } else {
            addressLine1Error = '';
        }

        if (!city) {
            cityError = 'City is required.';
            isValid = false;
        } else {
            cityError = '';
        }

        if (!state) {
            stateError = 'State is required.';
            isValid = false;
        } else {
            stateError = '';
        }

        if (!country) {
            countryError = 'Country is required.';
            isValid = false;
        } else {
            countryError = '';
        }

        if (!zipCode) {
            zipCodeError = 'Zip code is required.';
            isValid = false;
        } else {
            zipCodeError = '';
        }

        return isValid;
    };

    const validateStep3 = () => {
        let isValid = true;

        if (!rulesName.length) {
            rulesNameError = 'At least one rule is required.';
            isValid = false;
        } else {
            rulesNameError = '';
        }

        if (!rulesDescription) {
            rulesDescriptionError = 'Rules description is required.';
            isValid = false;
        } else {
            rulesDescriptionError = '';
        }

        if (!aminityName.length) {
            aminityNameError = 'At least one amenity is required.';
            isValid = false;
        } else {
            aminityNameError = '';
        }

        return isValid;
    };

    const handleNext = () => {
        if (step === 1 && !validateStep1()) return;
        if (step === 2 && !validateStep2()) return;
        step += 1;
    };

    const handlePrevious = () => {
        if (step > 1) step -= 1;
    };

    const handleRegisterHotel = async () => {
        errorMessage = '';
        successMessage = '';

        try {
            // Step 1: Save the address
            const addressResponse = await fetch(`${apiUrl}/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    AddressLine1: addressLine1,
                    AddressLine2: addressLine2,
                    Street: street,
                    City: city,
                    State: state,
                    Country: country,
                    ZipCode: zipCode
                }),
            });

            if (!addressResponse.ok) {
                const errorData = await addressResponse.json();
                throw new Error(errorData.message || 'Failed to save address');
            }

            const addressData = await addressResponse.json();
            const addressId = addressData.Data.Address.id; // Extract the Address ID correctly

            // Step 2: Save the hotel details
            const hotelResponse = await fetch(`${apiUrl}/hotel/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    Name: name,
                    AddressId: addressId, // Use the extracted AddressId from the previous response
                    Phone: phone,
                    Email: email,
                    Description: description,
                    CheckInTime: checkInTime,
                    CheckOutTime: checkOutTime,
                    OwnerUserId: hotelId, // Use hotelId if it represents the owner's ID
                    Photos: photos.length > 0 ? 'true' : 'false', // Indicating if photos were uploaded
                }),
            });

            if (!hotelResponse.ok) {
                const errorData = await hotelResponse.json();
                throw new Error(errorData.message || 'Failed to save hotel details');
            }

            const hotelData = await hotelResponse.json();
            const registeredHotelId = hotelData.Data.Hotel.id; // Ensure this is the correct path to the Hotel ID

            // Step 3: Save the hotel amenities
            const amenitiesResponse = await fetch(`${apiUrl}/hotelamenities/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    AminityName: aminityName,
                    HotelId: registeredHotelId // Use the HotelId from the hotel response
                }),
            });

            if (!amenitiesResponse.ok) {
                const errorData = await amenitiesResponse.json();
                throw new Error(errorData.message || 'Failed to save amenities');
            }

            // Step 4: Save the property rules
            const rulesResponse = await fetch(`${apiUrl}/propertyrules/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    HotelId: registeredHotelId, // Use the HotelId from the hotel response
                    RulesName: rulesName.join(', '), // Join the selected rules into a string
                    Description: rulesDescription
                }),
            });

            if (!rulesResponse.ok) {
                const errorData = await rulesResponse.json();
                throw new Error(errorData.message || 'Failed to save property rules');
            }

            // If all API calls were successful
            successMessage = 'Hotel registered successfully!';
            navigate('/admin');

        } catch (error) {
            // Ensure the error is of type Error
            if (error instanceof Error) {
                errorMessage = error.message;
                console.error('Error during registration:', error);
            } else {
                errorMessage = 'An unexpected error occurred';
                console.error('Unexpected error during registration:', error);
            }
        }
    };

    const handleFileChange = (event: { target: { files: string | any[]; }; }) => {
        photos = event.target.files;
    };

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
                <div>
                    <h2 class="text-3xl font-bold mb-6">Hotel Details</h2>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="name">Hotel Name <span class="text-red-500">*</span></label>
                        <input id="name" type="text" bind:value={name} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if nameError}
                            <p class="text-red-500 text-sm italic mt-2">{nameError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="phone">Phone <span class="text-red-500">*</span></label>
                        <input id="phone" type="text" bind:value={phone} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if phoneError}
                            <p class="text-red-500 text-sm italic mt-2">{phoneError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="email">Email <span class="text-red-500">*</span></label>
                        <input id="email" type="email" bind:value={email} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if emailError}
                            <p class="text-red-500 text-sm italic mt-2">{emailError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="description">Description <span class="text-red-500">*</span></label>
                        <textarea id="description" bind:value={description} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        {#if descriptionError}
                            <p class="text-red-500 text-sm italic mt-2">{descriptionError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="checkInTime">Check-In Time <span class="text-red-500">*</span></label>
                        <input id="checkInTime" type="text" bind:value={checkInTime} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if checkInTimeError}
                            <p class="text-red-500 text-sm italic mt-2">{checkInTimeError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="checkOutTime">Check-Out Time <span class="text-red-500">*</span></label>
                        <input id="checkOutTime" type="text" bind:value={checkOutTime} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if checkOutTimeError}
                            <p class="text-red-500 text-sm italic mt-2">{checkOutTimeError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="photos">Photos</label>
                        <input id="photos" type="file" multiple on:change={handleFileChange} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>
            {/if}
            {#if step === 2}
                <div>
                    <h2 class="text-3xl font-bold mb-6">Address</h2>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="addressLine1">Address Line 1 <span class="text-red-500">*</span></label>
                        <input id="addressLine1" type="text" bind:value={addressLine1} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if addressLine1Error}
                            <p class="text-red-500 text-sm italic mt-2">{addressLine1Error}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="addressLine2">Address Line 2</label>
                        <input id="addressLine2" type="text" bind:value={addressLine2} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="street">Street</label>
                        <input id="street" type="text" bind:value={street} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="city">City <span class="text-red-500">*</span></label>
                        <input id="city" type="text" bind:value={city} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if cityError}
                            <p class="text-red-500 text-sm italic mt-2">{cityError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="state">State <span class="text-red-500">*</span></label>
                        <input id="state" type="text" bind:value={state} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if stateError}
                            <p class="text-red-500 text-sm italic mt-2">{stateError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="country">Country <span class="text-red-500">*</span></label>
                        <input id="country" type="text" bind:value={country} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if countryError}
                            <p class="text-red-500 text-sm italic mt-2">{countryError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="zipCode">Zip Code <span class="text-red-500">*</span></label>
                        <input id="zipCode" type="text" bind:value={zipCode} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
                        {#if zipCodeError}
                            <p class="text-red-500 text-sm italic mt-2">{zipCodeError}</p>
                        {/if}
                    </div>
                </div>
            {/if}
            {#if step === 3}
                <div>
                    <h2 class="text-3xl font-bold mb-6">Property Rules</h2>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="rulesName">Rules Name <span class="text-red-500">*</span></label>
                        <Multiselect bind:selected={rulesName} options={rulesOptions} multiple={true} placeholder="Select Rules" class="w-full"/>
                        {#if rulesNameError}
                            <p class="text-red-500 text-sm italic mt-2">{rulesNameError}</p>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="rulesDescription">Rules Description <span class="text-red-500">*</span></label>
                        <textarea id="rulesDescription" bind:value={rulesDescription} class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        {#if rulesDescriptionError}
                            <p class="text-red-500 text-sm italic mt-2">{rulesDescriptionError}</p>
                        {/if}
                    </div>
                    <h2 class="text-3xl font-bold mb-6">Amenities</h2>
                    <div class="mb-6">
                        <label class="block text-gray-800 text-sm font-bold mb-2" for="aminityName">Amenity Name <span class="text-red-500">*</span></label>
                        <Multiselect bind:selected={aminityName} options={aminityOptions} multiple={true} placeholder="Select Amenities" class="w-full"/>
                        {#if aminityNameError}
                            <p class="text-red-500 text-sm italic mt-2">{aminityNameError}</p>
                        {/if}
                    </div>
                </div>
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
