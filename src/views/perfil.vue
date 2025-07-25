<template>
  <div class="profile-layout">

    <header class="profile-header full-width-header">
      <div class="header-content">
        <img src="@/assets/logo1.jpg" alt="GreenLogist Logo" class="logo" />
        <h1>GreenLogist</h1>
      </div>
    </header>
    
    <main class="profile-main-content">
      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar-container">
            <img
                :src="profileImage || require('@/assets/producer-avatar.png')"
                alt="Foto de perfil"
                class="avatar-image"
                @click="triggerFileInput"
            />
            <div class="avatar-overlay" @click="triggerFileInput">
              <i class="fas fa-camera"></i>
              <span>Cambiar foto</span>
            </div>
            <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                style="display: none"
            />
          </div>
          <h2 class="profile-name">{{ producer.name }}</h2>
          <span class="profile-badge">
            <i class="fas fa-certificate"></i> Productor Certificado
          </span>
          
          <button
              @click="triggerFileInput"
              class="change-image-btn"
              v-if="editing"
          >
            <i class="fas fa-sync-alt"></i> Cambiar imagen de perfil
          </button>
        </div>


        <div class="profile-form">
          <div class="form-section">
            <h3><i class="fas fa-user-edit"></i> Información Personal</h3>

            <div class="form-group">
              <label for="name"><i class="fas fa-user"></i> Nombre completo</label>
              <input
                  id="name"
                  v-model="producer.name"
                  type="text"
                  :readonly="!editing"
                  :class="{'read-only': !editing}"
              />
            </div>

            <div class="form-group">
              <label for="email"><i class="fas fa-envelope"></i> Correo electrónico</label>
              <input
                  id="email"
                  v-model="producer.email"
                  type="email"
                  :readonly="!editing"
                  :class="{'read-only': !editing}"
              />
            </div>
          </div>

          <div class="form-section">
            <h3><i class="fas fa-info-circle"></i> Sobre mí</h3>
            <div class="form-group">
              <label for="description"><i class="fas fa-align-left"></i> Descripción</label>
              <textarea
                  id="description"
                  v-model="producer.description"
                  :readonly="!editing"
                  :class="{'read-only': !editing}"
                  rows="4"
              ></textarea>
            </div>
          </div>

          <div v-if="editing" class="form-section">
            <h3><i class="fas fa-lock"></i> Seguridad</h3>
            <div class="form-group">
              <label for="password"><i class="fas fa-key"></i> Nueva contraseña</label>
              <input
                  id="password"
                  v-model="producer.password"
                  type="password"
                  placeholder="Dejar en blanco para mantener la actual"
              />
            </div>
          </div>

     
          <div class="action-buttons">
            <template v-if="!editing">
              <button @click="startEditing" class="edit-btn">
                <i class="fas fa-edit"></i> Editar Perfil
              </button>
              <router-link to="/dashboard" class="back-btn">
                <i class="fas fa-arrow-left"></i> Volver al Panel
              </router-link>
            </template>

            <template v-else>
              <button @click="saveChanges" class="save-btn">
                <i class="fas fa-save"></i> Guardar Cambios
              </button>
              <button @click="cancelEditing" class="cancel-btn">
                <i class="fas fa-times"></i> Cancelar
              </button>
            </template>
          </div>
        </div>
      </div>
    </main>
    
    <footer class="profile-footer full-width-footer">
      <div class="footer-content">
        <p>&copy; 2025 GreenLogist — Todos los derechos reservados</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ProducerProfile',
  data() {
    return {
      editing: false,
      profileImage: null,
      producer: {
        name: '',
        email: '',
        description: 'Productor agrícola',
        password: ''
      },
      originalData: {}
    };
  },
  created() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUserEmail = localStorage.getItem('currentUserEmail');
      const currentUser = users.find(u => u.email === currentUserEmail);

      if (currentUser) {
        this.producer = {
          name: currentUser.fullName || 'Nombre no definido',
          email: currentUser.email || '',
          description: currentUser.description || 'Productor agrícola',
          password: ''
        };
        this.originalData = {
          ...this.producer,
          profileImage: currentUser.profileImage
        };

        if (currentUser.profileImage) {
          this.profileImage = currentUser.profileImage;
        }
      }
    },
    startEditing() {
      this.editing = true;
    },
    triggerFileInput() {
      if (this.editing) {
        this.$refs.fileInput.click();
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!validTypes.includes(file.type)) {
          this.$notify?.({
            type: 'error',
            title: 'Error',
            text: 'Formato de imagen no válido. Use JPEG, PNG o GIF'
          });
          return;
        }

        if (file.size > maxSize) {
          this.$notify?.({
            type: 'error',
            title: 'Error',
            text: 'La imagen es demasiado grande (máximo 2MB)'
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result;
          this.$notify?.({
            type: 'success',
            title: 'Éxito',
            text: 'Imagen de perfil actualizada'
          });
        };
        reader.readAsDataURL(file);
      }
    },
    saveChanges() {
      try {
        if (!this.producer.name.trim()) {
          throw new Error('El nombre es obligatorio');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.producer.email)) {
          throw new Error('Ingrese un correo electrónico válido');
        }


        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === this.originalData.email);

        if (userIndex !== -1) {
          const updatedUser = {
            ...users[userIndex],
            fullName: this.producer.name,
            email: this.producer.email,
            description: this.producer.description,

            profileImage: this.profileImage || users[userIndex].profileImage
          };


          if (this.producer.password) {
            updatedUser.password = this.producer.password;
          }

          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('currentUserEmail', this.producer.email);


          this.originalData = {
            ...this.producer,
            profileImage: this.profileImage
          };

          this.editing = false;

          this.$notify?.({
            type: 'success',
            title: 'Éxito',
            text: 'Perfil actualizado correctamente'
          });
        }
      } catch (error) {
        this.$notify?.({
          type: 'error',
          title: 'Error',
          text: error.message || 'Error al actualizar el perfil'
        });
      }
    },
    cancelEditing() {

      this.producer = { ...this.originalData };
      this.profileImage = this.originalData.profileImage;
      this.editing = false;
    },
  }
};
</script>

<style scoped>
.profile-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8faf8;
}


.full-width-header {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: linear-gradient(135deg, #2e7d32, #1b5e20);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.header-content .logo {
  height: 70px;
  width: auto;
}

.header-content h1 {
  font-size: 2rem;
  margin: 0;
  font-weight: 600;
}


.profile-main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.profile-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
}


.avatar-section {
  background-color: #f1f8e9;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-container {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 5px solid white;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.avatar-container:hover {
  transform: scale(1.03);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-overlay i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.avatar-overlay span {
  font-size: 0.9rem;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.profile-name {
  color: #2e7d32;
  font-size: 1.5rem;
  margin: 0.5rem 0;
  font-weight: 600;
}

.profile-badge {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
}


.change-image-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.change-image-btn:hover {
  background-color: #3e8e41;
  transform: translateY(-1px);
}


.profile-form {
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  color: #2e7d32;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.form-group input.read-only,
.form-group textarea.read-only {
  background-color: transparent;
  border: none;
  padding-left: 0;
  cursor: default;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.edit-btn,
.save-btn,
.cancel-btn,
.back-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
}

.edit-btn:hover {
  background-color: #3d8b40;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.save-btn {
  background-color: #2196f3;
  color: white;
}

.save-btn:hover {
  background-color: #0b7dda;
  transform: translateY(-2px);
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #555;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.back-btn {
  background-color: #f5f5f5;
  color: #555;
  text-decoration: none;
  justify-content: center;
}

.back-btn:hover {
  background-color: #e0e0e0;
}

.full-width-footer {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 1rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.profile-footer p {
  margin: 0;
  font-size: 0.9rem;
}


@media (max-width: 768px) {
  .profile-card {
    grid-template-columns: 1fr;
  }

  .avatar-section {
    padding-bottom: 1rem;
  }

  .profile-form {
    padding: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .edit-btn,
  .save-btn,
  .cancel-btn,
  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
}
</style>