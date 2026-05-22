import { API_URL } from "../../config";

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}users?email=${email}`);

        if (!response.ok) {
            throw new Error('Response failed');
        }
        const users = await response.json();

        if (users.length > 0 && users[0].password.trim() === password.trim()) {
            const user = users[0];

            if (user.role === 'admin') {
                const token = btoa(user.email);

                localStorage.setItem('token', token);
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error("Login failed:", error.message);
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};


export function checkAuthSession(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
}