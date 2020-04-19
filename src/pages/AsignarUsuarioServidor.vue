<template>
  <div>
    <div class="q-pa-xs"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-10 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Asignar Usuario a Servidor</q-card-section>
          <q-form id="registrarAsignacion" @submit.prevent="validarExisteUsuario">
            <q-separator inset />
            <q-card-section>
              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="formEditar.nombre_servidor"
                    name="nombre_servidor"
                    id="nombre_servidor"
                    filled
                    hint="Nombre del Servidor"
                    dense="dense"
                    :value="formEditar.nombre_servidor"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <input type="hidden" v-model="formEditar.sf" />
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="formEditar.ip_servidor"
                    name="ip_servidor"
                    id="ip_servidor"
                    filled
                    hint="IP del Servidor"
                    dense="dense"
                    :value="formEditar.ip_servidor"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <q-select
                  filled
                  v-model="model"
                  :options="listar"
                  option-value="id_usuario"
                  option-label="usuario"
                  name="model"
                  id="model"
                  emit-value
                  map-options
                  dense="dense"
                  hint="Software"
                  :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                />

                <input type="hidden" :value="model" name="id_usuario" id="id_usuario" />
                <input
                  type="hidden"
                  name="id_servidor"
                  id="id_servidor"
                  :value="$route.params.id_servidor"
                />
              </div>&nbsp;
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Asignar" type="submit" color="primary" />&nbsp;
                <q-btn
                  icon-right="cancel"
                  label="Cancelar"
                  type="submit"
                  color="orange"
                  to="/servidores"
                />
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-12 col-md-10 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Usuario Asignado al Servidor</q-card-section>
          <q-separator inset />
          <q-card-section v-if="verificacion!=''">
            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-left">usuario</th>
                  <th class="text-left">Borrar</th>
                </tr>
              </thead>
              <tbody v-for="lista in listarSoft" :key="lista.id_servidor">
                <tr>
                  <td class="text-left">{{ lista.nombres}} {{ lista.apellidos}}</td>

                  <td class="text-left">
                    <q-btn
                      round
                      color="red"
                      icon="cancel"
                      size="xs"
                      @click="eliminar(lista.id_asignacion_equipo)"
                      href="#"
                    />
                    <q-tooltip>Borrar</q-tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </q-card-section>
          <q-card-section v-else>No Posee Usuario Asignado</q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
import env from "../config/env.js";
import { date } from "quasar";

export default {
  name: "editar",
  data() {
    return {
      formEditar: {},
      listar: [],
      listarSoft: [],
      id_usuario: "",
      model: "",
      estatus: "",
      sf: "",
      verificacion: "",
      id_usuario: "",
      id_servidor: ""
    };
  },

  methods: {
    getId() {
      const id_servidor = this.$route.params.id_servidor;
      axios
        .get(
          `${env.endpoint}/api_inventarioit/mantenedores/getServidor?id_servidor=` +
            id_servidor
        )
        .then(res => {
          this.formEditar = res.data.response[0];
          //console.log(this.formEditar);
        });
    },

    getSoftwareServidor() {
      const id_servidor = this.$route.params.id_servidor;
      axios
        .get(
          `${env.endpoint}/api_inventarioit/mantenedores/verificarAsignacionUsuario?id_servidor=` +
            id_servidor
        )
        .then(res => {
          this.listarSoft = res.data.response;
          this.verificacion = res.data.response;

          console.log(this.listarSoft);
        });
    },

    registrar() {
      if (this.model == "Seleccione") {
        this.$q.notify({
          message: "Seleccione un tipo de sotware",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
      } else {
        const form = document.getElementById("registrarAsignacion");
        axios
          .post(
            `${env.endpoint}/api_inventarioit/mantenedores/registrarAsignacion`,
            new FormData(form)
          )
          .then(res => {
            this.respuesta = res.data.response;
            if (this.respuesta == "success") {
              this.$q.notify({
                message: "Usuario Asignado",
                color: "teal-6",
                icon: "warning",
                position: "bottom-right"
              });
              ///this.$router.push("/mantenedores");
              this.getSoftwareServidor();
            } else {
              this.$q.notify({
                message: "Error en le registro",
                color: "red-5",
                icon: "warning",
                position: "bottom-right"
              });
            }
          });
      }
    },
    eliminar(id_asignacion_equipo) {
      axios
        .post(
          `${env.endpoint}/api_inventarioit/mantenedores/eliminarAsignacionusuario?id_asignacion_equipo=` +
            id_asignacion_equipo
        )
        .then(res => {
          this.$q.notify({
            message: "Asignacion Eliminada",
            color: "red-5",
            icon: "warning",
            position: "bottom-right"
          });
          //this.$router.push("/menuPrincipal");
          this.getSoftwareServidor();
        });
    },

    userList() {
      axios
        .get(`${env.endpoint}/api_inventarioit/usuarios/getUsersList`)
        .then(res => {
          this.listar = res.data.response;
          //console.log(this.listar);
          this.model = "Seleccione";
        });
    },
    validarExisteUsuario() {
      const formData = new FormData();
      formData.append("model", this.model);
      formData.append("id_servidor", this.$route.params.id_servidor);

      axios
        .post(
          `${env.endpoint}/api_inventarioit/mantenedores/validarAsignacionUsuario`,
          formData
        )
        .then(res => {
          this.respuesta = res.data.response;
          console.log(this.respuesta);
          if (res.data.response === "success") {
            this.$q.notify({
              message: "Software ya Asignado...!!!",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
            this.model = "";
          } else {
            this.registrar();
          }
        });
    }
  },
  created() {
    this.getId();
    this.userList();
    this.getSoftwareServidor();
  },
  mixins: [sesion]
};
</script>
