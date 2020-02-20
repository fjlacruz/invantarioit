<template>
  <div>
    <div class="q-pa-xs"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-10 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Editar Software</q-card-section>
          <q-form id="editarSoftware" @submit.prevent="editar">
            <input type="hidden" name="id_software" :value="$route.params.id_software" />
            <q-separator inset />
            <q-card-section>
              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="formEditar.nombre_software"
                    name="nombre_software"
                    id="nombre_software"
                    filled
                    hint="Nombre del Software"
                    dense="dense"
                    :value="formEditar.nombre_software"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="formEditar.version_software"
                    name="version_software"
                    id="version_software"
                    filled
                    hint="Version del Software"
                    dense="dense"
                    :value="formEditar.version_software"
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
                    option-value="id_tipo_software"
                    option-label="descripcion_software"
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

                <input type="hidden" v-model="model" name="id_tipo_software" id="id_tipo_software" />
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="formEditar.nro_licencia"
                    name="nro_licencia"
                    id="nro_licencia"
                    filled
                    hint="Nro Licencia"
                    dense="dense"
                    :value="formEditar.nro_licencia"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
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
              <div class="col-12 col-xs-12 q-pa-xs">
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
              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input filled v-model="fecha_compra" mask="date" :rules="['fecha_compra']">
                    <template v-slot:append>
                      <q-badge color="primary">Fecha de Compra:</q-badge>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            hint="Fecha de Compra"
                            v-model="fecha_compra"
                            @input="() => $refs.qDateProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    filled
                    v-model="fecha_expiracion"
                    mask="date"
                    :rules="['fecha_expiracion']"
                  >
                    <template v-slot:append>
                      <q-badge color="primary">Fecha de Expiracion:</q-badge>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="fecha_expiracion"
                            @input="() => $refs.qDateProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <input type="hidden" name="fecha_compra" :value="fecha_compra" />
              <input type="hidden" name="fecha_expiracion" :value="fecha_expiracion" />
              <input type="hidden" name="id_software" :value="id_software" />
              <div class="col-6 col-xs-6 q-pa-md">Estatus del Sitio</div>
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
                  to="/mantenedores"
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
      tab: "software",
      formEditar: {},
      id_software: "",
      estatus: "",
      nombre_software: "",
      fecha_compra: "",
      fecha_expiracion: "",
      model: "",
      listar: [],
      id_tipo_software: "",
      token: ""
    };
  },

  methods: {
    getId() {
      const id_software = this.$route.params.id_software;
      axios
        .get(
          `${env.endpoint}/api_inventarioit/mantenedores/getSoftware?id_software=` +
            id_software
        )
        .then(res => {
          this.formEditar = res.data.response[0];
          console.log(this.formEditar);
          this.id_software = res.data.response[0].id_software;
          this.estatus = res.data.response[0].estatus;
          this.fecha_compra = res.data.response[0].fecha_compra;
          this.fecha_expiracion = res.data.response[0].fecha_expiracion;
          this.id_tipo_software = res.data.response[0].id_tipo_software;
          this.model = res.data.response[0].id_tipo_software;
        });
    },
    editar() {
      if (this.formEditar.nombre_software == null) {
        this.$q.notify({
          message: "Debe completar todos los campos del formulario",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
      }

      const form = document.getElementById("editarSoftware");

      axios
        .post(
          `${env.endpoint}/api_inventarioit/mantenedores/editarSoftware`,
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Software editado",
              color: "teal-6",
              icon: "warning",
              position: "bottom-right"
            });
            this.$router.push("/mantenedores/" + this.tab);
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
    tipoSoftwareList() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getTipoSoftware`)
        .then(res => {
          this.listar = res.data.response;
        });
    }
  },
  created() {
    this.getId();
    this.tipoSoftwareList();
    this.token = JSON.parse(this.$q.localStorage.getItem("token"));
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
  },
  mixins: [sesion]
};
</script>
