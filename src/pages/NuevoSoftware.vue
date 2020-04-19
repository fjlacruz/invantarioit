<template>
  <div>
    <div class="q-pa-xs"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-10 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Registrar Software</q-card-section>
          <q-separator inset />
          <q-form id="registrarSoftware" @submit.prevent="registrar">
            <q-card-section>
              <div class="row justify-center">
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="nombre_software"
                    name="nombre_software"
                    id="nombre_software"
                    filled
                    hint="Nombre Software"
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
                    v-model="version_software"
                    name="version_software"
                    id="version_software"
                    filled
                    hint="Version Software"
                    class="uppercase"
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
                <input type="hidden" :value="model" name="id_tipo_software" id="id_tipo_software" />
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-input
                    v-model="nro_licencia"
                    name="nro_licencia"
                    id="nro_licencia"
                    filled
                    hint="Licencia"
                    class="uppercase"
                    dense="dense"
                    lazy-rules
                    :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                  />
                </div>
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="proveedor"
                  name="proveedor"
                  id="proveedor"
                  class="uppercase"
                  filled
                  hint="Proveedor"
                  dense="dense"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
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
                            hint="Fecha de Expiracion"
                            v-model="fecha_expiracion"
                            @input="() => $refs.qDateProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <input type="hidden" name="fecha_compra" :value="fecha_compra" />
                  <input type="hidden" name="fecha_expiracion" :value="fecha_expiracion" />
                </div>
              </div>
              <div class="col-6 col-xs-6 q-pa-md">Estatus del Software</div>
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
                    to="/mantenedores/software"
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
  name: "registrarSoftware",
  data() {
    return {
      descripcion_software: "",
      estatus: "1",
      nombre_software: "",
      version_software: "",
      descripcion_software: "",
      nro_licencia: "",
      proveedor: "",
      contacto: "",
      fecha_expiracion: "",
      fecha_compra: "",
      listar: [],
      id_tipo_software: "",
      model: ""
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
        const form = document.getElementById("registrarSoftware");
        axios
          .post(
            `${env.endpoint}/api_inventarioit/mantenedores/registrar_Software`,
            new FormData(form)
          )
          .then(res => {
            this.respuesta = res.data.response;
            if (this.respuesta == "success") {
              this.$q.notify({
                message: "Tipo de Software Registrado",
                color: "teal-6",
                icon: "warning",
                position: "bottom-right"
              });
              this.$router.push("/mantenedores");
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
    tipoSoftwareList() {
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getTipoSoftware`)
        .then(res => {
          this.listar = res.data.response;
          console.log(this.listar);
          this.model = "Seleccione";
        });
    }
  },
  created() {
    this.tipoSoftwareList();
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