import { goto } from '$app/navigation';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const handleLogin = async (email: string, password: string) => {
    let errorMessage = '';

    if (!email || !password) {
        errorMessage = 'All fields are required.';
        return { errorMessage };
    }

    if (!validateEmail(email)) {
        errorMessage = 'Invalid email format.';
        return { errorMessage };
    }

    try {
        const response = await fetch(`${apiUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: email, Password: password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
            sessionStorage.setItem('token', data.Data.token);
            goto('/'); 
        } else {
            errorMessage = data.Message || 'Login failed. Please try again.';
            console.error('Login failed:', data);
        }
    } catch (error) {
        errorMessage = 'An error occurred. Please try again.';
        console.error('Error during login:', error);
    }

    return { errorMessage };
};

export const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};
