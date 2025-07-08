<template>
  <div class="dashboard-layout">
    <header class="main-header">
      <div class="header-left">
        <img src="@/assets/logo1.jpg" alt="GreenLogist Logo" class="logo" />
        <h1>GreenLogist</h1>
      </div>
      <button class="logout-btn" @click="handleLogout" :disabled="isLoggingOut">
        <i class="fas fa-sign-out-alt"></i>
        <span v-if="!isLoggingOut">Logout</span>
        <span v-else>Cerrando...</span>
      </button>
    </header>

    <div class="body-wrapper">
      <aside class="sidebar">
        <h1>Panel</h1>
        <nav>
          <ul>
            <li><router-link to="/dashboard">Inicio</router-link></li>
            <li><router-link to="/registrar-producto">Registrar Producto</router-link></li>
            <li><router-link to="/solicitar-transporte">Solicitar Transporte</router-link></li>
            <li><router-link to="/panel-estadisticas">Panel de Estadísticas</router-link></li>
            <li><router-link to="/perfil">Perfil</router-link></li>
          </ul>
        </nav>
      </aside>

      <main class="main-content">
        <section class="dashboard-content">
          <h2>Bienvenido al Panel del Productor</h2>
          <div class="stats-grid">
            <div class="stat-card green">
              <p>Productos Registrados</p>
              <h2>{{ dashboardSummary.registeredProductsCount }}</h2>
            </div>
            <div class="stat-card blue">
              <p>Transportes Solicitados</p>
              <h2>{{ dashboardSummary.requestedTransportsCount }}</h2>
            </div>
            <div class="stat-card orange">
              <p>Órdenes Completadas</p>
              <h2>{{ dashboardSummary.completedOrdersCount }}</h2>
            </div>
          </div>
          <!-- Puedes añadir más detalles del summary aquí si lo deseas -->
        </section>
      </main>
    </div>

    <footer class="main-footer">
      <p>&copy; 2025 GreenLogist — Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'; // Importa Axios
import { onActivated } from 'vue'; // Importa onActivated

export default {
  data() {
    return {
      isLoggingOut: false,
      dashboardSummary: { // Inicializa con valores por defecto
        registeredProductsCount: 0,
        requestedTransportsCount: 0,
        completedOrdersCount: 0,
        totalSalesAmount: 0,
        totalProductsSoldKg: 0,
        environmentalImpactMetric: 0,
      }
    }
  },
  setup() { // Usa setup para Composition API hooks
    // onActivated se ejecuta cada vez que el componente es activado (ej. al volver a él)
    onActivated(async () => {
      await this.fetchDashboardSummary();
    });
    // Puedes mantener created para la carga inicial si lo prefieres,
    // o simplemente confiar en onActivated si el componente siempre se activa.
    // Para este caso, lo mantendremos en methods y lo llamaremos desde onActivated.
  },
  async created() { // También carga al inicio cuando el componente es creado por primera vez
    await this.fetchDashboardSummary();
  },
  methods: {
    async fetchDashboardSummary() {
      try {
        const response = await axios.get('/Statistics/dashboard-summary'); // Llama al endpoint de resumen
        this.dashboardSummary = response.data;
      } catch (error) {
        console.error('Error al cargar el resumen del dashboard:', error.response?.data || error.message);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      }
    },
    async handleLogout() {
      this.isLoggingOut = true;

      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserEmail');

        await new Promise(resolve => setTimeout(resolve, 500));

        this.$router.push({ name: 'Login' });

      } catch (error) {
        console.error('Error durante logout (limpieza local):', error);
        this.$router.push({ name: 'Login' });
      } finally {
        this.isLoggingOut = false;
      }
    }
  }
}
</script>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f9f4;
}

.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-header {
  background-color: #2e7d32;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.main-header .logo {
  height: 40px;
  width: auto;
}

.main-header h1 {
  font-size: 1.5rem;
  margin: 0;
}

.logout-btn {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.logout-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.logout-btn i {
  font-size: 0.9rem;
}

.body-wrapper {
  display: flex;
  flex: 1;
  margin-top: 60px;
}

.sidebar {
  width: 240px;
  background-color: #1b5e20;
  color: white;
  padding: 2rem 1rem;
  min-height: calc(100vh - 60px - 50px);
}

.sidebar h2 {
  margin-top: 0;
  font-size: 1.2rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 1rem;
}

.sidebar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.sidebar a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #f4f9f4;
}

.dashboard-content h2 {
  color: #2e7d32;
  margin-bottom: 1.5rem;
}

.dashboard-content p {
  color: #555;
  margin-bottom: 2rem;
}

.stats-grid {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 200px;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.stat-card p {
  margin: 0;
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.stat-card h2 {
  margin: 0.5rem 0 0;
  font-size: 1.8rem;
  color: #333;
}

.green {
  border-left: 5px solid #2e7d32;
}

.blue {
  border-left: 5px solid #1565c0;
}

.orange {
  border-left: 5px solid #f57c00;
}

.main-footer {
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 1rem;
  height: 50px;
  font-size: 0.9rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}


@media (max-width: 768px) {
  .sidebar {
    width: 180px;
    padding: 1.5rem 0.5rem;
  }

  .stats-grid {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-card {
    min-width: 100%;
  }

  .logout-btn span {
    display: none;
  }

  .logout-btn i {
    font-size: 1.2rem;
  }
}
</style>