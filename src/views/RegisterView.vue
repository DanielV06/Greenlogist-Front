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
import axios from 'axios'; // Importa Axios

const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const router = useRouter();

const handleRegister = async () => { // Cambia a async
  errorMessage.value = ''; // Reset error message

  // Validaciones básicas (pueden ser más robustas en el backend)
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Todos los campos son obligatorios.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    errorMessage.value = 'El formato del correo electrónico no es válido.';
    return;
  }

  try {
    // Para el registro, asumimos que siempre es un 'Producer' por ahora,
    // ya que este es el flujo del productor. Si tuvieras un selector, lo usarías aquí.
    const role = 'Producer';

    const response = await axios.post('/Auth/register', { // Llama al endpoint de registro
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      role: role // Envía el rol al backend
    });

    // Usa el ID de usuario devuelto por el backend en el mensaje de alerta
    alert(`¡Registro exitoso! Tu ID de usuario es: ${response.data}. Ahora puedes iniciar sesión.`);
    router.push('/login'); // Redirigir a la página de inicio de sesión
  } catch (error) {
    console.error('Error al registrar:', error.response?.data || error.message);
    errorMessage.value = error.response?.data?.message || 'Error al registrar. Inténtalo de nuevo.';
  }
};
</script>

<style scoped>

</style>