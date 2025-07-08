<template>
  <div class="auth-form-container">
    <h1>Crear Cuenta</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="fullName">Nombre completo</label>
        <input type="text" id="fullName" v-model="fullName" required />
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar contraseña</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="btn-submit">Registrarse</button>
    </form>
    <div class="auth-link">
      ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const router = useRouter();

const handleRegister = () => {
  errorMessage.value = ''; // Reset error message

  // Validaciones básicas
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Todos los campos son obligatorios.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }
  // Validación de email 
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    errorMessage.value = 'El formato del correo electrónico no es válido.';
    return;
  }

  // Simulación de base de datos con localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.find(user => user.email === email.value)) {
    errorMessage.value = 'Este correo electrónico ya está registrado.';
    return;
  }
  
  // Para esta simulación, la guardamos tal cual para el login.
  users.push({
    fullName: fullName.value,
    email: email.value,
    password: password.value, // SIMULACIÓN
  });

  localStorage.setItem('users', JSON.stringify(users));

  alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
  router.push('/login'); // Redirigir a la página de inicio de sesión
};
</script>

<style scoped>

</style>