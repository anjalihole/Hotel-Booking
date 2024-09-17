import { goto } from '$app/navigation';
import type { RegistrationForm } from '../types';

export const handleRegister = async (formData: RegistrationForm) => {
    const { firstName, lastName, email, phone, password } = formData;
    let errorMessage = '';
    let successMessage = '';

    if (!firstName || !lastName || !email || !phone || !password) {
        errorMessage = 'All fields are required.';
        return { error: errorMessage, success: successMessage };
    }

    if (!validateEmail(email)) {
        errorMessage = 'Invalid email format.';
        return { error: errorMessage, success: successMessage };
    }

    if (!validatePassword(password)) {
        errorMessage = 'Password must be at least 8 characters long.';
        return { error: errorMessage, success: successMessage };
    }

    try {
        const response = await fetch('http://localhost:7272/api/v1/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Phone: phone,
                Password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);

        successMessage = 'Registration successful! Redirecting to home page...';
        setTimeout(() => {
            goto('/login');
        }, 3000);
        return { error: errorMessage, success: successMessage };
    } catch (error) {
        console.error('Error during registration:', error);
        errorMessage = 'Registration failed. Please try again.';
        return { error: errorMessage, success: successMessage };
    }
};

export const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
    return password.length >= 8;
};
