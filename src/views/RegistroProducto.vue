<template>
  <div class="page-wrapper">

    <header class="main-header">
      <div class="header-content">
        <img src="@/assets/logo1.jpg" alt="GreenLogist Logo" class="logo" />
        <h1>GreenLogist</h1>
      </div>
    </header>


    <main class="form-content">
      <div class="form-container">
        <h2>Registrar Nuevo Producto</h2>
        <form @submit.prevent="registrarProducto">
          <input v-model="producto.nombre" type="text" placeholder="Nombre del Producto" required />
          <input v-model="producto.cantidad" type="number" placeholder="Cantidad disponible" required />
          <input v-model="producto.unidad" type="text" placeholder="Unidad de medida (kg, unidades, etc.)" required />
          <input v-model="producto.precio" type="number" step="0.01" placeholder="Precio por unidad" required />
          <textarea v-model="producto.descripcion" placeholder="Descripción del Producto" rows="4" required></textarea>
          <button type="submit">Registrar</button>
        </form>
        <router-link class="back-link" to="/dashboard">Volver al Panel</router-link>
      </div>
    </main>

    <footer class="main-footer">
      <p>&copy; 2025 GreenLogist - Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const producto = reactive({
  nombre: "",
  cantidad: 0,
  unidad: "",
  precio: 0.0,
  descripcion: ""
});

const registrarProducto = () => {
  if (producto.nombre && producto.cantidad && producto.unidad && producto.precio && producto.descripcion) {
    const productos = JSON.parse(sessionStorage.getItem("productos")) || [];
    productos.push({ ...producto });
    sessionStorage.setItem("productos", JSON.stringify(productos));
    alert(`Producto ${producto.nombre} registrado exitosamente.`);
    router.push("/dashboard");
  } else {
    alert("Por favor, complete todos los campos.");
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html, body, #app {
  margin: 0;
  padding: 0;
  height: auto;
  width: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f1f8e9;
  overflow-x: hidden;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: auto;
  width: auto;
  overflow-x: hidden;
}

.main-header {
  width: 100vw;
  background-color: #2e7d32;
  color: white;
  padding: 1rem 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 1rem;
}

.logo {
  height: 80px;
}


.form-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 150, 0, 0.2);
  max-width: 450px;
  width: 100%;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #2e7d32;
}

form input,
form textarea {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #388e3c;
}

.back-link {
  display: block;
  margin-top: 1rem;
  color: #2e7d32;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.main-footer {
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100%;
}
</style>
