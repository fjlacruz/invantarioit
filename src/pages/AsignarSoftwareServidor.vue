<template>
  <div>
    <div class="q-pa-xs"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-10 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Asignar Software a Servidor</q-card-section>
          <q-form id="registrarAsignacion" @submit.prevent="registrar">
            <input type="hidden" name="id_servidor" :value="$route.params.id_servidor" />
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
                  option-value="id_software"
                  option-label="nombre_software"
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

                <input type="hidden" :value="model" name="id_software" id="id_software" />
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
          <q-card-section>Software alojados en el Servidor</q-card-section>
          <q-separator inset />
          <q-card-section v-if="verificacion!=''">
            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-left">Software</th>
                  <th class="text-left">Tipo</th>
                  <th class="text-left">Expiracion</th>
                  <th class="text-left">Estatus</th>
                  <th class="text-left">Borrar</th>
                </tr>
              </thead>
              <tbody v-for="lista in listarSoft" :key="lista.id_servidor">
                <tr>
                  <td class="text-left">{{ lista.nombre_software}}</td>
                  <td class="text-left">{{ lista.descripcion_software}}</td>
                  <td class="text-left" v-if="lista.vencimiento >=20">
                    <q-badge color="green">{{ lista.vencimiento}} Dias</q-badge>
                  </td>
                  <td class="text-left" v-else-if="lista.vencimiento<=10">
                    <q-badge color="red">{{ lista.vencimiento}} Dias</q-badge>
                  </td>
                  <td class="text-left" v-else>
                    <q-badge color="orange">{{ lista.vencimiento}} Dias</q-badge>
                  </td>

                  <td class="text-left" v-if="lista.estatus=='1'">
                    <q-radio color="green" />
                    <q-tooltip>Activo</q-tooltip>
                  </td>
                  <td class="text-left" v-else>
                    <q-radio color="red" />
                    <q-tooltip>Inactivo</q-tooltip>
                  </td>
                  <td class="text-left">
                    <q-btn
                      round
                      color="red"
                      icon="cancel"
                      size="xs"
                      :to="'/borrarServidorSoftware/'+lista.id_servidor"
                      href="#"
                    />
                    <q-tooltip>Borrar</q-tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </q-card-section>
          <q-card-section v-else>No Posee Software</q-card-section>
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
      id_software: "",
      model: "",
      estatus: "",
      sf: "",
      verificacion: ""
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
          `${env.endpoint}/api_inventarioit/mantenedores/getServidorSoftware?id_servidor=` +
            id_servidor
        )
        .then(res => {
          this.listarSoft = res.data.response;
          this.verificacion = res.data.response;
          console.log(this.verificacion);
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
            `${env.endpoint}/api_inventarioit/mantenedores/registrar_servidorSoftware`,
            new FormData(form)
          )
          .then(res => {
            this.respuesta = res.data.response;
            if (this.respuesta == "success") {
              this.$q.notify({
                message: "Software Asignado",
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

    softwareList() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getSoftware`)
        .then(res => {
          this.listar = res.data.response;
          //console.log(this.listar);
          this.model = "Seleccione";
        });
    }
  },
  created() {
    this.getId();
    this.softwareList();
    this.getSoftwareServidor();
  },
  mixins: [sesion]
};
</script>
