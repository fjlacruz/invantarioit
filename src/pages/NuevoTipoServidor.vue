<template>
  <div>
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Registrar Tipo de Servidor</q-card-section>
          <q-separator inset />
          <q-form id="registrarTipoServidor" @submit.prevent="registrar">
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="tipo_servidor"
                  name="tipo_servidor"
                  id="tipo_servidor"
                  filled
                  hint="Tipo Servidor"
                  dense="dense"
                  class="uppercase"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                />
              </div>

              <div class="col-6 col-xs-6 q-pa-md">Estatus del Tipo de Servidor</div>
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
                    to="/mantenedores/tipoServidores"
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

export default {
  name: "registrarTipoServidor",
  data() {
    return {
      tipo_servidor: "",
      estatus: "1"
    };
  },
  computed: {
    token() {
      return JSON.parse(this.$q.localStorage.getItem("token"));
      //console.log(token)
    }
  },
  methods: {
    registrar() {
      const form = document.getElementById("registrarTipoServidor");
      axios
        .post(
          `${env.endpoint}/api_inventarioit/mantenedores/registrar_TiposServidor`,
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data.response;
          if (this.respuesta == "success") {
            this.$q.notify({
              message: "Tipo de Servidor Registrado",
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
  created() {},
  mixins: [sesion]
};
</script>
<style>
.uppercase input {
  text-transform: uppercase;
}
</style>