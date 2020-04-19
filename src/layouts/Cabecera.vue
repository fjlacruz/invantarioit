<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Inventario TI 2.0</q-toolbar-title>
        <q-btn-dropdown flat style="color: primary" :label="usuario">
          <q-list>
            <q-item clickable v-close-popup :to="'/perfil/'+id_usuario">
              <q-item-section>
                <q-item-label>
                  <q-icon name="perm_contact_calendar" />Perfil
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup :to="'/cambiarClave/'+id_usuario">
              <q-item-section>
                <q-item-label>
                  <q-icon name="autorenew" />&nbsp;Cambiar&nbsp;Clave
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <q-input type="hidden" :value="id_usuario"></q-input>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Menu de Navegacion</q-item-label>

        <!-- <q-item clickable tag="a" href="#" to="/inicio">
          <q-item-section avatar>
            <q-icon name="account_balance" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>-->
        <q-item clickable tag="a" href="#" to="/servidores" v-if="this.rol==1">
          <q-item-section avatar>
            <q-icon name="backup" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Servidores</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="#" to="/mantenedores/ambientes" v-if="this.rol==1">
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mantenedores</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="#" to="/usuarios" v-if="this.rol==1">
          <q-item-section avatar>
            <q-icon name="supervisor_account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="#" @click="salir">
          <q-item-section avatar>
            <q-icon name="input" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import axios from "axios";
import env from "../config/env.js";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: false,
      id_usuario: "",
      usuario: "",
      rol: ""
    };
  },
  created() {
    this.getUser();
    const token = JSON.parse(this.$q.localStorage.getItem("token"));
  },
  methods: {
    salir() {
      this.showLoading();
      const token = JSON.parse(this.$q.localStorage.getItem("token"));
      axios
        .get(`${env.endpoint}/api_inventarioit/usuarios/logout?token=` + token)
        .then(res => {
          if (res.data.res == "success") {
            this.$q.localStorage.remove("token");
            this.$router.push("/");
            this.hideLoading();
          }
        });
    },
    getUser() {
      const token = JSON.parse(this.$q.localStorage.getItem("token"));
      axios
        .get(
          `${env.endpoint}/api_inventarioit/usuarios/getUsers?token=` + token
        )
        .then(res => {
          console.log(res.data);
          this.id_usuario = res.data.response[0].id_usuario;
          this.rol = res.data.response[0].rol;
          this.usuario = res.data.response[0].usuario;
          this.token = res.data.response[0].token;
        });
    },
    showLoading() {
      this.$q.loading.show({
        message: "Procesando su peticion...</span>"
      });
    },
    hideLoading() {
      this.$q.loading.hide({
        message: "Procesando su peticion...</span>"
      });
    }
  }
};
</script>
