<template>
  <div class="q-pa-md">
    <input type="hidden" name="id_usuario" id="id_usuario" required :value="id_usuario" />
    <div class="q-pa-xs"></div>

    <q-card class="my-card">
      <q-card-section class="text-h6">
        <div class="row">
          <div class="col-12 col-md-4 q-pa-xs justify-left">Usuarios del Sistema</div>
          <div class="col-12 col-md-5 q-pa-xs">&nbsp;</div>
          <div class="col-12 col-md-3 q-pa-xs justify-right">
            <q-input
              v-model="buscar"
              name="buscar"
              id="buscar"
              filled
              type="search"
              dense="dense"
              label="Buscar"
              @keyup="buscarDatos"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <form id="editarUsuario" autocomplete="off" @submit.prevent="editar">
        <q-separator inset />
        <q-card-section>
          <div class="col-12 col-xs-12 q-pa-xs">
            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-left">Nombres</th>
                  <th class="text-left">Apellidos</th>
                  <th class="text-left">RUT</th>
                  <th class="text-left">Rol</th>
                  <th class="text-left">Estatus</th>
                  <th class="text-left">Editar</th>
                </tr>
              </thead>
              <tbody v-for="item in listar" :key="item.id_usuario">
                <tr>
                  <td class="text-left">{{ item.nombres}}</td>
                  <td class="text-left">{{ item.apellidos}}</td>
                  <td class="text-left">{{ item.rut}}</td>
                  <td class="text-left">{{ item.descripcion_rol}}</td>
                  <td class="text-left"   v-if="item.estatus=='1'">
                    <q-radio color="green"/>
                    <q-tooltip>Activo</q-tooltip>
                    </td>
                    <td class="text-left"  v-else>
                    <q-radio color="red"/>
                    <q-tooltip>Inactivo</q-tooltip>
                    </td>
                  <td class="text-left">
                    <q-btn
                      round
                      color="primary"
                      icon="edit"
                      size="xs"
                      :to="'/editarUsuario/'+item.id_usuario"
                      href="#"
                    />
                    <q-tooltip>Editar</q-tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
            <q-separator inset />&nbsp;
            <div class="col-12 col-md-4 q-pa-xs justify-left">
              <div class="text-h7">
                Total Registrados:
                <q-badge align="middle" color="primary">
                  <ICountUp :delay="delay" :endVal="endVal" :options="options" @ready="onReady" />
                </q-badge>
              </div>
            </div>
          </div>
        </q-card-section>
      </form>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" to="/NuevoUsuario" />
      <q-tooltip>Nuevo Usuario</q-tooltip>
    </q-page-sticky>
  </div>
</template>

<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
import env from '../config/env.js'

import ICountUp from "vue-countup-v2";
export default {
  name: "usuarios",
  components: {
    ICountUp
  },

  data() {
    return {
      respuesta: "",
      listar: [],
      userData: "",
      id_usuario: "",
      buscar: "",
      cantidad: "",
      delay: 0,
      endVal: "",
      options: {
        useEasing: true,
        useGrouping: true
      }
    };
  },
  created() {
    this.userList();
    this.getUser();
    this.buscarDatos();
    this.cantidadRegistros();
    const token = JSON.parse(this.$q.localStorage.getItem("token"));
  },

  methods: {
    getUser() {
      const token = JSON.parse(this.$q.localStorage.getItem("token"));
      axios
        .get(
          `${env.endpoint}/api_inventarioit/usuarios/getUsers?token=` + token
        )
        .then(res => {
          //console.log(res.data.data[0].id_usuario)
          this.id_usuario = res.data.response[0].id_usuario;
          this.rol = res.data.response[0].rol;
          this.usuario = res.data.response[0].usuario;
          this.token = res.data.response[0].token;
        });
    },
    userList() {
      this.showLoading();
      axios
        .get(`${env.endpoint}/api_inventarioit/usuarios/getUsers`)
        .then(res => {
          this.listar = res.data.response;
          this.hideLoading();
        });
    },
    buscarDatos() {
      axios
        .post(
          `${env.endpoint}/api_inventarioit/usuarios/getUsers?buscar=` +
            this.buscar
        )
        .then(res => {
          this.listar = res.data.response;
          //console.log(res.data.response);
        });
    },
    cantidadRegistros() {
      axios
        .get(`${env.endpoint}/api_inventarioit/usuarios/cantidadUsuarios`)
        .then(res => {
          this.cantidad = res.data.response[0].cantidad;
          this.endVal = res.data.response[0].cantidad;
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
    },
    onReady: function(instance, CountUp) {
      const that = this;
      instance.update(that.endVal);
    }
  },

  mixins: [sesion]
};
</script>
