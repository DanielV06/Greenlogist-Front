<template>
  <div class="page-wrapper">
    <header class="main-header">
      <div class="header-content">
        <img src="@/assets/logo1.jpg" alt="GreenLogist Logo" class="logo" />
        <h1>GreenLogist</h1>
      </div>
    </header>

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
import { ref, onMounted } from 'vue'; // Importa onMounted
import axios from 'axios'; // Importa Axios

const products = ref([]); // Ahora se cargará desde el backend

const emptyTransportData = () => ({
  productId: '',
  quantity: 1,
  origin: '', // En un sistema real, esto podría ser un objeto de ubicación
  destination: '', // En un sistema real, esto podría ser un objeto de ubicación
  requiredDate: '',
  specialInstructions: ''
});

const transportData = ref(emptyTransportData());

// Función para cargar los productos del productor
const fetchProductsForTransport = async () => {
  try {
    const response = await axios.get('/Products/for-transport');
    products.value = response.data;
  } catch (error) {
    console.error('Error al cargar productos para transporte:', error.response?.data || error.message);
    alert('Error al cargar productos disponibles. Por favor, inténtalo de nuevo.');
  }
};

// Carga los productos cuando el componente se monta
onMounted(fetchProductsForTransport);

const submitTransportRequest = async () => { // Cambia a async
  try {
    // En un sistema real, Origin y Destination serían objetos más complejos.
    // Aquí, asumimos que el backend puede parsear la dirección y quizás inferir ciudad/país.
    // Si el backend espera ciudad y país, deberías añadir campos en el formulario.
    // Para este ejemplo, estoy pasando 'Lima' y 'Peru' como valores fijos.
    const requestPayload = {
      productId: transportData.value.productId,
      quantityValue: transportData.value.quantity,
      quantityUnit: products.value.find(p => p.id === transportData.value.productId)?.unit || '', // Obtener la unidad del producto seleccionado
      originAddress: transportData.value.origin,
      originCity: 'Lima', // Asume una ciudad y país por defecto o añade campos al formulario
      originCountry: 'Peru',
      destinationAddress: transportData.value.destination,
      destinationCity: 'Lima', // Asume una ciudad y país por defecto o añade campos al formulario
      destinationCountry: 'Peru',
      requiredDate: transportData.value.requiredDate,
      specialInstructions: transportData.value.specialInstructions
    };

    const response = await axios.post('/Shipping', requestPayload); // Llama al endpoint de solicitud de transporte

    alert('Solicitud de transporte enviada con éxito. ID: ' + response.data);
    transportData.value = emptyTransportData(); // Limpia el formulario
    await fetchProductsForTransport(); // Recarga los productos por si la cantidad disponible cambió

  } catch (error) {
    console.error('Error al enviar solicitud de transporte:', error.response?.data || error.message);
    alert(error.response?.data?.message || 'Error al enviar solicitud de transporte. Por favor, verifica los datos.');
  }
};

const goBack = () => {
  window.history.back();
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
