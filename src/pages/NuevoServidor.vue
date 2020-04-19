<template>
  <div>
    <div class="q-pa-xs"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-10 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Registrar Servidor</q-card-section>
          <q-separator inset />
          <q-form id="registrarServidor" @submit.prevent="registrar">
            <q-card-section>
              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="nombre_servidor"
                    name="nombre_servidor"
                    id="nombre_servidor"
                    class="uppercase"
                    filled
                    hint="Nombre del Servidor"
                    dense="dense"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="ip_servidor"
                    name="ip_servidor"
                    id="ip_servidor"
                    filled
                    hint="IP Servidor"
                    dense="dense"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
              </div>
              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-select
                    filled
                    v-model="model"
                    :options="listar"
                    option-value="id_tipo_servidor"
                    option-label="tipo_servidor"
                    name="model"
                    id="model"
                    emit-value
                    map-options
                    dense="dense"
                    hint="Tipo de Software"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <input type="hidden" :value="model" name="id_tipo_servidor" id="id_tipo_servidor" />
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-select
                    filled
                    v-model="modelAmb"
                    :options="listarAmb"
                    option-value="id_ambiente"
                    option-label="descripcion_ambiente"
                    name="modelAmb"
                    id="modelAmb"
                    emit-value
                    map-options
                    dense="dense"
                    hint="Ambiente"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <input type="hidden" :value="modelAmb" name="id_ambiente" id="id_ambiente" />
              </div>

              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-select
                    filled
                    v-model="modelSer"
                    :options="listarSer"
                    option-value="id_servicio"
                    option-label="descripcion_servicio"
                    name="modelSer"
                    id="modelSer"
                    emit-value
                    map-options
                    dense="dense"
                    hint="Tipo de Servicio"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <input type="hidden" :value="modelSer" name="id_servicio" id="id_servicio" />
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-select
                    filled
                    v-model="modelSit"
                    :options="listarSit"
                    option-value="id_sitio"
                    option-label="descripcion_sitio"
                    name="modelSit"
                    id="modelSit"
                    emit-value
                    map-options
                    dense="dense"
                    hint="Sitio"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <input type="hidden" :value="modelSit" name="id_sitio" id="id_sitio" />
              </div>
              <div class="row justify-center">
                <div class="col-4 col-xs-4 q-pa-xs">
                  <q-input
                    v-model="marca_servidor"
                    name="marca_servidor"
                    id="marca_servidor"
                    filled
                    hint="Marca"
                    dense="dense"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-4 col-xs-4 q-pa-xs">
                  <q-input
                    v-model="modelo_servidor"
                    name="modelo_servidor"
                    id="modelo_servidor"
                    filled
                    hint="Modelo"
                    dense="dense"
                    class="uppercase"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-4 col-xs-4 q-pa-xs">
                  <q-input
                    v-model="nro_serie"
                    name="nro_serie"
                    id="nro_serie"
                    filled
                    hint="Nro de Serie"
                    dense="dense"
                    class="uppercase"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
              </div>

              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="proveedor"
                    name="proveedor"
                    id="proveedor"
                    filled
                    hint="Proveedor"
                    class="uppercase"
                    dense="dense"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="	contacto"
                    name="contacto"
                    id="contacto"
                    class="uppercase"
                    filled
                    hint="Contacto"
                    dense="dense"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
              </div>
              <div class="col-6 col-xs-6 q-pa-md">Estatus del Servidor</div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <div class="q-gutter-lg">
                  <q-radio
                    dense
                    v-model="estatus"
                    name="estatus"
                    id="estatus"
                    val="1"
                    label="Activo"
                    :class="estatus"
                  />
                  <q-radio
                    dense
                    v-model="estatus"
                    name="estatus"
                    id="estatus"
                    val="2"
                    label="Inactivo"
                    :class="estatus"
                  />
                </div>
                <input type="hidden" name="estatus" :value="estatus" />
                &nbsp;&nbsp;&nbsp;
                <q-separator inset />&nbsp;&nbsp;&nbsp;
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-btn icon-right="send" label="Registrar" type="submit" color="primary" />&nbsp;
                  <q-btn
                    icon-right="cancel"
                    label="Cancelar"
                    type="submit"
                    color="orange"
                    to="/servidores"
                  />
                </div>
              </div>
            </q-card-section>
          </q-form>
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
  name: "registrarServidor",
  data() {
    return {
      tipo_servidor: "",
      estatus: "1",
      nombre_servidor: "",
      ip_servidor: "",
      nro_licencia: "",
      proveedor: "",
      contacto: "",
      marca_servidor: "",
      modelo_servidor: "",
      nro_serie: "",
      listar: [],
      listarAmb: [],
      listarSer: [],
      listarSit: [],
      id_tipo_servidor: "",
      model: "",
      modelAmb: "",
      modelSer: "",
      modelSit: ""
    };
  },

  methods: {
    registrar() {
      if (this.model == "Seleccione") {
        this.$q.notify({
          message: "Seleccione un tipo de sotware",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
      } else {
        const form = document.getElementById("registrarServidor");
        axios
          .post(
            `${env.endpoint}/api_inventarioit/mantenedores/registrar_servidor`,
            new FormData(form)
          )
          .then(res => {
            this.respuesta = res.data.response;
            if (this.respuesta == "success") {
              this.$q.notify({
                message: "Servidor Registrado",
                color: "teal-6",
                icon: "warning",
                position: "bottom-right"
              });
              this.$router.push("/servidores");
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
    tipoServidor() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getTipoServidor`)
        .then(res => {
          this.listar = res.data.response;
          this.model = "Seleccione";
        });
    },
    listaAmbientes() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getAmbientes`)
        .then(res => {
          this.listarAmb = res.data.response;
          this.modelAmb = "Seleccione";
        });
    },
    listaServicios() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getServicios`)
        .then(res => {
          this.listarSer = res.data.response;
          this.modelSer = "Seleccione";
        });
    },
    listaSitios() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getSitios`)
        .then(res => {
          this.listarSit = res.data.response;
          this.modelSit = "Seleccione";
        });
    }
  },
  created() {
    this.tipoServidor();
    this.listaAmbientes();
    this.listaServicios();
    this.listaSitios();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = yyyy + "/" + mm + "/" + dd;
    this.fecha_expiracion = today;
    this.fecha_compra = today;
  },

  mixins: [sesion]
};
</script>
<style>
.uppercase input {
  text-transform: uppercase;
}
</style>
