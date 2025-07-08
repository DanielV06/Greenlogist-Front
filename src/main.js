import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'; // Importa Axios

// 1. Configura la URL base de tu API
// Asegúrate de que esta URL coincida con la dirección donde se ejecuta tu backend.
// Si tu backend se ejecuta en https://localhost:7001, usa esa URL.
axios.defaults.baseURL = 'https://localhost:7283/api'; // ¡AJUSTA ESTA URL A TU BACKEND!

// 2. Interceptor para añadir el token JWT a las solicitudes
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken'); // Recupera el token del almacenamiento local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Añade el token al encabezado de autorización
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 3. Interceptor para manejar errores de respuesta (opcional pero recomendado)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Si el token es inválido o ha expirado, redirige al login
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            router.push('/login');
            alert('Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión de nuevo.');
        }
        return Promise.reject(error);
    }
);


const app = createApp(App);
app.use(router); // usa el router
app.mount('#app');