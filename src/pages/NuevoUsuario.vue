<template>
  <div>
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Registrar Usuario</q-card-section>
          <q-separator inset />
          <q-form id="registrarUsuario" @submit.prevent="registrar">
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="rut"
                  name="rut"
                  id="rut"
                  label="RUT"
                  lazy-rules
                  filled
                  maxlength="10"
                  dense="dense"
                  class="uppercase"
                  @blur="validarExisteRut"
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="nombres"
                  name="nombres"
                  id="nombres"
                  label="Nombres"
                  class="uppercase"
                  lazy-rules
                  filled
                  maxlength="25"
                  dense="dense"
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="apellidos"
                  name="apellidos"
                  class="uppercase"
                  id="apellidos"
                  label="Apellidos"
                  lazy-rules
                  filled
                  dense="dense"
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="usuario"
                  name="usuario"
                  id="usuario"
                  label="Usuario"
                  class="uppercase"
                  lazy-rules
                  maxlength="25"
                  filled
                  dense="dense"
                  @blur="validarExisteUsuario"
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="email"
                  name="email"
                  id="email"
                  label="Email"
                  class="uppercase"
                  lazy-rules
                  filled
                  maxlength="40"
                  dense="dense"
                  @blur="validarCorreo"
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="telefono"
                  name="telefono"
                  id="telefono"
                  label="Telefono"
                  lazy-rules
                  maxlength="17"
                  filled
                  mask="(+##) #-####-####"
                  dense="dense"
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-6 col-xs-6 q-pa-md">Rol de usuario</div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <div class="q-gutter-lg">
                  <q-radio
                    dense
                    v-model="rol"
                    name="rol"
                    id="rol"
                    val="1"
                    label="Administrador"
                    :class="rol"
                  />
                  <q-radio
                    dense
                    v-model="rol"
                    name="rol"
                    id="rol"
                    val="2"
                    label="Mantenedor"
                    :class="rol"
                  />
                  <q-radio
                    dense
                    v-model="rol"
                    name="rol"
                    id="rol"
                    val="3"
                    label="Consulta"
                    :class="rol"
                  />
                  <q-radio
                    dense
                    v-model="rol"
                    name="rol"
                    id="rol"
                    val="4"
                    label="Usuario de Equipo"
                    :class="rol"
                  />
                </div>
                <input type="hidden" name="rol" :value="rol" />
                &nbsp;&nbsp;&nbsp;
                <q-separator inset />&nbsp;&nbsp;&nbsp;
                <div class="col-6 col-xs-6 q-pa-xs">
                  <q-btn icon-right="send" label="Registrar" type="submit" color="primary" />&nbsp;
                  <q-btn
                    icon-right="cancel"
                    label="Cancelar"
                    type="submit"
                    color="orange"
                    to="/usuarios"
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
  name: "registrarUsuario",
  data() {
    return {
      nombres: "",
      apellidos: "",
      rut: "",
      email: "",
      telefono: "",
      usuario: "",
      rol: ""
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
      const form = document.getElementById("registrarUsuario");
      axios
        .post(
          `${env.endpoint}/api_inventarioit/usuarios/registrar_usuario`,
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data.response;
          if (this.respuesta == "success") {
            this.$q.notify({
              message: "Usuario Registrado",
              color: "teal-6",
              icon: "warning",
              position: "bottom-right"
            });
            this.$router.push("/usuarios");
          } else {
            this.$q.notify({
              message: "Error en le registro",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
          }
        });
    },
    validarExisteRut() {
      const formData = new FormData();
      formData.append("rut", this.rut);
      axios
        .post(
          `${env.endpoint}/api_inventarioit/usuarios/validarExisteRut`,
          formData
        )
        .then(res => {
          this.respuesta = res.data.response;
          if (res.data.response === "success") {
            this.$q.notify({
              message: "RUT ya Registrado...!!!",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
            this.rut = "";
          }
        });
    },
    validarExisteUsuario() {
      const formData = new FormData();

      formData.append("usuario", this.usuario);
      axios
        .post(
          `${env.endpoint}/api_inventarioit/usuarios/validarExisteUsuario`,
          formData
        )
        .then(res => {
          this.respuesta = res.data.response;
          if (res.data.response === "success") {
            this.$q.notify({
              message: "Usuario ya Registrado...!!!",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
            this.usuario = "";
          }
        });
    },
    validarCorreo() {
      if (!this.validEmail(this.email)) {
        this.$q.notify({
          message: "Direccion de correo no valida...!!!",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
        this.email = "";
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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