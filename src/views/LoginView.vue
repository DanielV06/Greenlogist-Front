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
import { useRouter }
  from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = () => {
  errorMessage.value = ''; // Reset error message

  if (!email.value || !password.value) {
    errorMessage.value = 'Correo y contraseña son obligatorios.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(
      (u) => u.email === email.value && u.password === password.value // SIMULACIÓN
  );

  if (user) {
    // Simular sesión guardando el usuario (o un token) en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('¡Inicio de sesión exitoso!');
    router.push('/dashboard'); // Redirigir al dashboard o panel
  } else {
    errorMessage.value = 'Correo o contraseña incorrectos.';
  }
};
</script>

<style scoped>

</style>