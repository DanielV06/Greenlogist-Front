<template>
  <div id="app-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos globales básicos */
body {
  font-family: sans-serif;
  margin: 0;
  background-color: #f0f4f0; /* Un verde claro suave  */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#app-container {
  width: 100%;
  max-width: 1200px;
}

/* Estilos para los formularios */
.auth-form-container {
  background-color: white;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Ancho típico para formularios de login/registro */
  margin: 20px auto; /* Centrar el contenedor del formulario */
  text-align: center;
}

.auth-form-container h1 {
  color: #2E7D32; /* Un verde oscuro para los títulos */
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-submit {
  background-color: #4CAF50; /* Verde de los botones principales */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #388E3C; /* Un verde más oscuro al pasar el mouse */
}

.auth-link {
  margin-top: 20px;
  font-size: 14px;
}

.auth-link a {
  color: #2E7D32;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
  text-align: left;
}
</style>