<template>
  <div class="page-wrapper">
    <header class="main-header">
      <div class="header-content">
        <img src="@/assets/logo1.jpg" alt="GreenLogist Logo" class="logo" />
        <h1>GreenLogist</h1>
      </div>
    </header>


    <section class="request-header">
      <h2>Solicitud de Transporte</h2>
      <p>Complete el formulario para solicitar el transporte de sus productos</p>
    </section>


    <main class="request-content">
      <form class="transport-form" @submit.prevent="submitTransportRequest">
        <div class="form-group">
          <label for="productId">Producto a Transportar</label>
          <select id="productId" v-model="transportData.productId" required>
            <option value="" disabled>Seleccione un producto</option>
            <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
            >
              {{ product.name }} ({{ product.quantity }} {{ product.unit }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="quantity">Cantidad</label>
          <input
              id="quantity"
              type="number"
              v-model.number="transportData.quantity"
              min="1"
              required
          />
        </div>

        <div class="form-group">
          <label for="origin">Origen</label>
          <input id="origin" type="text" v-model="transportData.origin" required />
        </div>

        <div class="form-group">
          <label for="destination">Destino</label>
          <input id="destination" type="text" v-model="transportData.destination" required />
        </div>

        <div class="form-group">
          <label for="requiredDate">Fecha Requerida</label>
          <input id="requiredDate" type="date" v-model="transportData.requiredDate" required />
        </div>

        <div class="form-group">
          <label for="specialInstructions">Instrucciones Especiales (Opcional)</label>
          <textarea id="specialInstructions" v-model="transportData.specialInstructions" />
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">Solicitar Transporte</button>
          <button type="button" class="back-btn" @click="goBack">Volver al Panel</button>
        </div>
      </form>
    </main>


    <footer class="main-footer">
      <p>&copy; 2025 GreenLogist - Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Manzanas', quantity: 100, unit: 'kg' },
  { id: 2, name: 'Naranjas', quantity: 150, unit: 'kg' },
  { id: 3, name: 'Lechugas', quantity: 50, unit: 'unidades' },
])

const emptyTransportData = () => ({
  productId: '',
  quantity: 1,
  origin: '',
  destination: '',
  requiredDate: '',
  specialInstructions: ''
})

const transportData = ref(emptyTransportData())

const submitTransportRequest = () => {
  console.log('Solicitud enviada:', transportData.value)
  alert('Solicitud de transporte enviada con éxito')
  transportData.value = emptyTransportData()
}

const goBack = () => {
  window.history.back()
}
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
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  height: 80px;
}

.request-header {
  text-align: center;
  padding: 2rem 1rem 1rem;
}

.request-header h2 {
  color: #2e7d32;
  margin-bottom: 0.5rem;
}

.request-header p {
  color: #555;
}

.request-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  width: 100%;
}

.transport-form {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.submit-btn,
.back-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn {
  background-color: #2e7d32;
  color: white;
}

.submit-btn:hover {
  background-color: #388e3c;
}

.back-btn {
  background-color: #ccc;
  color: #333;
}

.back-btn:hover {
  background-color: #bbb;
}

.main-footer {
  width: 100vw;
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
