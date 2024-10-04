import { navigate } from 'svelte-navigator';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
export let step = 1;
export let name = '';
export let phone = '';
export let email = '';
export let description = '';
export let checkInTime = '';
export let checkOutTime = '';
export let photos: string | any[] = [];
export let addressLine1 = '';
export let addressLine2 = '';
export let street = '';
export let city = '';
export let state = '';
export let country = '';
export let zipCode = '';
export let rulesName: any[] = [];
export let rulesDescription = 'Extra-person charges may apply and vary depending on property policy|Government-issued photo identification';
export let aminityName: string | any[] = [];
export let hotelId = 'b758d4d4-261a-4168-ab79-32795abb06d7';
export let errorMessage = '';
export let successMessage = '';

export let nameError = '';
export let phoneError = '';
export let emailError = '';
export let descriptionError = '';
export let checkInTimeError = '';
export let checkOutTimeError = '';
export let addressLine1Error = '';
export let cityError = '';
export let stateError = '';
export let countryError = '';
export let zipCodeError = '';
export let rulesNameError = '';
export let rulesDescriptionError = '';
export let aminityNameError = '';

export const rulesOptions = [
    'No Smoking',
    'Pets Allowed',
    'Quiet Hours',
    'Outside Food Not Allowed',
];

export const aminityOptions = [
    'Free WiFi',
    'Swimming Pool',
    'Fitness Center',
    'Kids Play Area',
    'Restaurant',
    'Parking',
];

export const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
};

export const validateStep1 = () => {
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

export const validateStep2 = () => {
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

export const validateStep3 = () => {
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

export const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    step += 1;
};

export const handlePrevious = () => {
    if (step > 1) step -= 1;
};

export const handleRegisterHotel = async () => {
    errorMessage = '';
    successMessage = '';

    try {
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
        const addressId = addressData.Data.Address.id;

        const hotelResponse = await fetch(`${apiUrl}/hotel/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                Name: name,
                AddressId: addressId,
                Phone: phone,
                Email: email,
                Description: description,
                CheckInTime: checkInTime,
                CheckOutTime: checkOutTime,
                OwnerUserId: hotelId,
                Photos: photos.length > 0 ? 'true' : 'false',
            }),
        });

        if (!hotelResponse.ok) {
            const errorData = await hotelResponse.json();
            throw new Error(errorData.message || 'Failed to save hotel details');
        }

        const hotelData = await hotelResponse.json();
        const registeredHotelId = hotelData.Data.Hotel.id;

        const amenitiesResponse = await fetch(`${apiUrl}/hotelamenities/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                AminityName: aminityName,
                HotelId: registeredHotelId
            }),
        });

        if (!amenitiesResponse.ok) {
            const errorData = await amenitiesResponse.json();
            throw new Error(errorData.message || 'Failed to save amenities');
        }

        const rulesResponse = await fetch(`${apiUrl}/propertyrules/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                HotelId: registeredHotelId,
                RulesName: rulesName.join(', '),
                Description: rulesDescription
            }),
        });

        if (!rulesResponse.ok) {
            const errorData = await rulesResponse.json();
            throw new Error(errorData.message || 'Failed to save property rules');
        }

        successMessage = 'Hotel registered successfully!';
        navigate('/admin');

    } catch (error) {
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unexpected error occurred';
        }
    }
};

export const handleFileChange = (event: { target: { files: string | any[]; }; }) => {
    photos = event.target.files;
};
