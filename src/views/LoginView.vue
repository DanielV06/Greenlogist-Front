<template>
  <div class="auth-form-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="btn-submit">Ingresar</button>
    </form>
    <div class="auth-link">
      ¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Importa Axios

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => { // Cambia a async
  errorMessage.value = ''; // Reset error message

  if (!email.value || !password.value) {
    errorMessage.value = 'Correo y contraseña son obligatorios.';
    return;
  }

  try {
    const response = await axios.post('/Auth/login', { // Llama al endpoint de login
      email: email.value,
      password: password.value,
    });

    const { token, userId, fullName, email: userEmail, role } = response.data;

    // Guarda el token y los datos del usuario en localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({ userId, fullName, email: userEmail, role }));
    localStorage.setItem('currentUserEmail', userEmail); // Para compatibilidad con Perfil.vue

    alert('¡Inicio de sesión exitoso!');
    router.push('/dashboard'); // Redirigir al dashboard o panel
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
    errorMessage.value = error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
  }
};
</script>

<style scoped>

</style>