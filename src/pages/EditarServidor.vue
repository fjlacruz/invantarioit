<template>
  <div>
    <div class="q-pa-xs"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-10 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Editar Servidor</q-card-section>
          <q-form id="editarServidor" @submit.prevent="editar">
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
                    hint="Tipo de Servidor"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>

                <input
                  type="hidden"
                  :value="formEditar.id_tipo_servidor"
                  name="id_tipo_servidor"
                  id="id_tipo_servidor"
                />
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-select
                    filled
                    v-model="modelAmb"
                    :options="listarAmb"
                    option-value="id_ambiente"
                    option-label="descripcion_ambiente"
                    emit-value
                    map-options
                    dense="dense"
                    hint="Ambiente"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>

                <input
                  type="hidden"
                  :value="formEditar.id_ambiente"
                  name="id_ambiente"
                  id="id_ambiente"
                />
              </div>

              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-select
                    filled
                    v-model="modelSer"
                    :options="listarSer"
                    option-value="id_servicio"
                    option-label="descripcion_servicio"
                    emit-value
                    map-options
                    dense="dense"
                    hint="Tipo de Servicio"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>

                <input
                  type="hidden"
                  :value="formEditar.id_servicio"
                  name="id_servicio"
                  id="id_servicio"
                />
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-select
                    filled
                    v-model="modelSit"
                    :options="listarSit"
                    option-value="id_sitio"
                    option-label="descripcion_sitio"
                    emit-value
                    map-options
                    dense="dense"
                    hint="Sitio"
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>

                <input type="hidden" :value="formEditar.id_sitio" name="id_sitio" id="id_sitio" />
              </div>
              <div class="row justify-center">
                <div class="col-4 col-xs-4 q-pa-xs">
                  <q-input
                    v-model="formEditar.marca_servidor"
                    name="marca_servidor"
                    id="marca_servidor"
                    filled
                    hint="Marca"
                    dense="dense"
                    :value="formEditar.marca_servidor"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-4 col-xs-4 q-pa-xs">
                  <q-input
                    v-model="formEditar.modelo_servidor"
                    name="modelo_servidor"
                    id="modelo_servidor"
                    filled
                    hint="Modelo"
                    dense="dense"
                    :value="formEditar.modelo_servidor"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-4 col-xs-4 q-pa-xs">
                  <q-input
                    v-model="formEditar.nro_serie"
                    name="nro_serie"
                    id="nro_serie"
                    filled
                    hint="Nro de Serie"
                    dense="dense"
                    :value="formEditar.nro_serie"
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
                    v-model="formEditar.proveedor"
                    name="proveedor"
                    id="proveedor"
                    filled
                    hint="Proveedor"
                    dense="dense"
                    :value="formEditar.proveedor"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="formEditar.contacto"
                    name="contacto"
                    id="contacto"
                    filled
                    hint="Contacto"
                    dense="dense"
                    :value="formEditar.contacto"
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
              </div>&nbsp;
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Editar" type="submit" color="primary" />&nbsp;
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
      id_servidor: "",
      model: "",
      modelAmb: "",
      modelSer: "",
      modelSit: "",
      listar: [],
      listarAmb: [],
      listarSer: [],
      listarSit: [],
      id_tipo_servidor: ""
    };
  },
  computed: {
    token() {
      return JSON.parse(this.$q.localStorage.getItem("token"));
      //console.log(token)
    }
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
          this.id_servidor = res.data.response[0].id_servidor;
          this.estatus = res.data.response[0].estatus;
          this.fecha_compra = res.data.response[0].fecha_compra;
          this.fecha_expiracion = res.data.response[0].fecha_expiracion;
          this.id_tipo_servidor = res.data.response[0].id_tipo_servidor;
        });
    },
    editar() {
      const form = document.getElementById("editarServidor");

      axios
        .post(
          `${env.endpoint}/api_inventarioit/mantenedores/editarServidor`,
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Servidor editado",
              color: "teal-6",
              icon: "warning",
              position: "bottom-right"
            });
            this.$router.push("/servidores");
          } else {
            this.$q.notify({
              message: "No se han detectado cambios",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
          }
        });
    },
    tipoServidor() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getTipoServidor`)
        .then(res => {
          this.listar = res.data.response;
          this.model = this.tipo_servidor = res.data.response[0].tipo_servidor;
        });
    },
    listaAmbientes() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getAmbientes`)
        .then(res => {
          this.listarAmb = res.data.response;
          this.modelAmb = this.descripcion_ambiente =
            res.data.response[0].descripcion_ambiente;
        });
    },
    listaServicios() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getServicios`)
        .then(res => {
          this.listarSer = res.data.response;
          this.modelSer = this.descripcion_servicio =
            res.data.response[0].descripcion_servicio;
        });
    },
    listaSitios() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getSitios`)
        .then(res => {
          this.listarSit = res.data.response;
          this.modelSit = this.descripcion_sitio =
            res.data.response[0].descripcion_sitio;
        });
    }
  },
  created() {
    this.getId();
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
    this.fecha_expiracion = res.data.response[0].fecha_expiracion;
    this.fecha_compra = res.data.response[0].fecha_compra;
  },
  mixins: [sesion]
};
</script>
