<!-- ========================================
@file       login.vue
@project    To-Do App (Prueba Técnica)
@module     Frontend - Pages
@purpose    Página de autenticación con login/registro en el mismo formulario
@description
  - Alterna entre modo login y registro
  - Incluye animación de transición entre pantallas
  - Valida email y contraseña mínima
  - Usa SweetAlert2 para notificaciones modernas
======================================== -->

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div 
      class="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-md transition-all duration-500"
    >
      <!-- Transición -->
      <Transition name="fade-slide" mode="out-in">
        <div :key="isRegister">
          <!-- Título dinámico -->
          <h2 class="text-2xl font-bold text-center mb-4"
              :class="isRegister ? 'text-green-400' : 'text-blue-400'">
            {{ isRegister ? "Crea tu Cuenta" : "Bienvenido, Inicia Sesión" }}
          </h2>

          <!-- Formulario -->
          <form @submit.prevent="isRegister ? onRegister() : onLogin()" class="space-y-4">
            <!-- Nombre solo en registro -->
            <div v-if="isRegister">
              <label class="block text-sm font-medium text-gray-200">Nombre</label>
              <input 
                v-model="name" 
                type="text" 
                required
                placeholder="Tu nombre"
                class="w-full p-2 rounded-md border border-gray-600 
                       bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-200">Email</label>
              <input 
                v-model="email" 
                type="email" 
                required
                placeholder="Ingresa tu correo"
                class="w-full p-2 rounded-md border border-gray-600 
                       bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <!-- Contraseña -->
            <div>
              <label class="block text-sm font-medium text-gray-200">Contraseña</label>
              <input 
                v-model="password" 
                type="password" 
                required 
                minlength="6"
                placeholder="Mínimo 6 caracteres"
                class="w-full p-2 rounded-md border border-gray-600 
                       bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <!-- Botón dinámico -->
            <button type="submit"
              :class="isRegister 
                ? 'w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow transform transition duration-300 hover:scale-105 hover:shadow-lg' 
                : 'w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transform transition duration-300 hover:scale-105 hover:shadow-lg'">
              {{ isRegister ? "Registrarse" : "Login" }}
            </button>
          </form>

          <!-- Toggle -->
          <p class="text-center text-sm text-gray-400 mt-4">
            {{ isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?" }}
            <button @click="isRegister = !isRegister" class="text-blue-400 hover:underline">
              {{ isRegister ? "Inicia sesión aquí" : "Regístrate aquí" }}
            </button>
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import Swal from "sweetalert2";

const router = useRouter();
const authStore = useAuthStore();

const isRegister = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");

// Validación simple de email
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Login
const onLogin = async () => {
  if (!validateEmail(email.value)) {
    return Swal.fire({ icon: "error", text: "Correo inválido" });
  }
  const success = await authStore.login(email.value, password.value);
  if (success) {
    Swal.fire({ icon: "success", text: "Bienvenido" });
    router.push("/dashboard");
  } else {
    Swal.fire({ icon: "error", text: "Credenciales inválidas" });
  }
};

// Registro
const onRegister = async () => {
  if (!validateEmail(email.value)) {
    return Swal.fire({ icon: "error", text: "Correo inválido" });
  }
  if (password.value.length < 6) {
    return Swal.fire({ icon: "error", text: "La contraseña debe tener al menos 6 caracteres" });
  }
  const success = await authStore.register(name.value, email.value, password.value);
  if (success) {
    Swal.fire({ icon: "success", text: "Cuenta creada con éxito" });
    router.push("/dashboard");
  } else {
    Swal.fire({ icon: "error", text: "No se pudo registrar el usuario" });
  }
};
</script>

<style scoped>
/* Animación de transición entre login y registro */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
