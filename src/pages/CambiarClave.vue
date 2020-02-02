<template>
  <div>
    <input type="hidden" name="id_usario" :value="$route.params.id_usario" />
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Cambiar Clave</q-card-section>

          <q-form id="editarUsuario" @submit.prevent="editar">
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.clave"
                  name="clave1"
                  id="clave1"
                  type="password"
                  filled
                  hint="Clave"
                  dense="dense"
                  :value="formEditar.clave"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="nuevaClave"
                  name="nuevaClave"
                  id="nuevaClave"
                  maxlength="15"
                  type="password"
                  filled
                  hint="Nueva Calve"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 &&  val.length > 7 || 'Campo Obligatorio', 'Minimo 8 Caracteres']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="confirmarClave"
                  name="confirmarClave"
                  id="confirmarClave"
                  type="password"
                  filled
                  hint="Confirmar Clave"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <input type="hidden" name="id_usuario" :value="formEditar.id_usuario" />
                <input type="hidden" name="nombres" :value="formEditar.nombres" />
                <input type="hidden" name="apellidos" :value="formEditar.apellidos" />
                <input type="hidden" name="rut" :value="formEditar.rut" />
                <input type="hidden" name="usuario" :value="formEditar.usuario" />
                <input type="hidden" name="telefono" :value="formEditar.telefono" />
                <input type="hidden" name="email" :value="formEditar.email" />
                <input type="hidden" name="rol" :value="formEditar.rol" />
                <input type="hidden" name="estatus" :value="estatus" />
              </div>&nbsp;
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Cambiar Calve" type="submit" color="primary" />&nbsp;
                <q-btn icon-right="cancel" label="Cancelar" type="submit" color="orange" to="/inicio" />
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
import env from '../config/env.js' 

export default {
  name: "editar",
  data() {
    return {
      formEditar: {},
      rut: "",
      rol: "",
      estatus: "",
      nuevaClave: "",
      confirmarClave: ""
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
      const id_usuario = this.$route.params.id_usuario;
      axios
        .get(
          `${env.endpoint}/api_inventarioit/usuarios/getUsers?id_usuario=` +
            id_usuario
        )
        .then(res => {
          this.formEditar = res.data.response[0];
          this.rol = res.data.response[0].rol;
          this.estatus = res.data.response[0].estatus;
          //this.nombres = res.data.nombres[0].nombres;
        });
    },
    editar() {
      if (this.nuevaClave == this.confirmarClave) {
        const form = document.getElementById("editarUsuario");
        axios
          .post(
            `${env.endpoint}/api_inventarioit/usuarios/editarUsuario`,
            new FormData(form)
          )
          .then(res => {
            this.respuesta = res.data;
            if (res.data.response == "success") {
              this.$q.notify({
                message: "Su clave de Acceso ha sido Modificada",
                color: "teal-6",
                icon: "warning",
                position: "bottom-right"
              });
              this.$router.push("/");
            } else {
              this.$q.notify({
                message: "No se han detectado cambios",
                color: "red-5",
                icon: "warning",
                position: "bottom-right"
              });
            }
          });
      } else {
        this.$q.notify({
          message: "Las Claves no coinciden",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
        this.nuevaClave = "";
        this.confirmarClave = "";
      }
    }
  },
  created() {
    this.getId();
  },
  mixins: [sesion]
};
</script>
