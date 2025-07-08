<template>
  <div class="stats-page">
    <!-- HEADER GLOBAL -->
    <header class="main-header">
      <div class="header-content">
        <img src="@/assets/logo1.jpg" alt="GreenLogist Logo" class="logo" />
        <h1>GreenLogist</h1>
      </div>
    </header>
    <!-- CONTENIDO DE ESTADISTICAS -->
    <main class="stats-container">
      <h2 class="stats-title">Estadísticas</h2>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Ventas Totales</h3>
          <p>{{ statistics.totalSalesCount }} ventas</p>
          <p class="highlight">Total ganado: S/. {{ statistics.totalSalesAmount.toFixed(2) }}</p>
        </div>
        <div class="stat-card">
          <h3>Productos Vendidos</h3>
          <p>{{ statistics.totalProductsSoldKg.toFixed(2) }} kg en productos</p>
        </div>
        <div class="stat-card">
          <h3>Transportes Solicitados</h3>
          <p>{{ statistics.totalTransportRequests }} pedidos</p>
          <p>Completados: {{ statistics.completedTransportRequests }}</p>
        </div>
        <div class="stat-card">
          <h3>Impacto Ambiental</h3>
          <p>CO2 Reducido: {{ statistics.totalEnvironmentalImpact.toFixed(2) }} kg</p>
          <p class="highlight">¡Tu contribución es clave!</p>
        </div>
      </div>

      <div class="buttons">
        <button class="back-btn" @click="goBack">Volver al Panel</button>
      </div>
    </main>

    <!-- FOOTER GLOBAL -->
    <footer class="main-footer">
      <p>&copy; 2025 GreenLogist - Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'; // Importa Axios

export default {
  name: 'EstadisticasView',
  data() {
    return {
      statistics: { // Inicializa con valores por defecto
        totalSalesCount: 0,
        totalSalesAmount: 0.00,
        totalProductsSoldKg: 0.00,
        totalTransportRequests: 0,
        completedTransportRequests: 0,
        totalEnvironmentalImpact: 0.00,
      }
    };
  },
  async created() { // Carga las estadísticas al crear el componente
    await this.fetchStatistics();
  },
  methods: {
    async fetchStatistics() {
      try {
        const response = await axios.get('/Statistics/detailed-statistics'); // Llama al endpoint de estadísticas detalladas
        this.statistics = response.data;
      } catch (error) {
        console.error('Error al cargar estadísticas:', error.response?.data || error.message);
        // Puedes mostrar un mensaje de error al usuario
      }
    },
    goBack() {
      this.$router.push('/dashboard');
    }
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
}

.stats-page {
  display: flex;
  flex-direction: column;
  min-height: auto;
  width: auto;
  overflow-x: hidden;
}

/* HEADER */
.main-header {
  background-color: #2e7d32;
  color: white;
  padding: 1rem 0;
  width: 100vw;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 2rem;
  padding: 0 5rem;
}

.logo {
  height: 80px;
}

/* CONTENIDO */
.stats-container {
  flex: 1;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  max-width: 1200px;
}

.stats-title {
  color: #2e7d32;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.stat-card {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stat-card h3 {
  color: #2e7d32;
  margin-bottom: 0.75rem;
  font-size: 1.3rem;
}

.stat-card p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.highlight {
  font-weight: bold;
  color: #1b5e20;
}

.buttons {
  margin-top: 2rem;
}

.back-btn {
  padding: 0.75rem 2rem;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
}

.back-btn:hover {
  background-color: #388e3c;
}

/* FOOTER */
.main-footer {
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100vw;
  margin-top: auto;
}
</style>
