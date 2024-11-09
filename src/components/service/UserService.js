import axios from "axios";


class UserService {
    static BASE_URL = "http://localhost:8080"
    static async login(username, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/api/auth/login`, { username, password })
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    static async register(userData) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/api/auth/register`, userData)
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('roles')
    }
    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }
    static isAdmin() {
        const roles = localStorage.getItem('roles'); // Assuming 'roles' is the key in localStorage
        if (roles) {
            const rolesArray = JSON.parse(roles); // Parse the stringified array from localStorage
            return rolesArray.includes('ROLE_ADMIN'); // Check if the array contains 'ADMIN'
        }
        return false;
    }

    static isUser() {
        const roles = localStorage.getItem('roles')
        if (roles) {
            const rolesArray = JSON.parse(roles); // Parse the stringified array from localStorage
            return rolesArray.includes('ROLE_CUSTOMER'); // Check if the array contains 'ADMIN'
        }
        return false;
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }
}
export default UserService;