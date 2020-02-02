<template>
  <div>
    <input type="hidden" name="id_usario" :value="$route.params.id_usario" />
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Datos del Usuario</q-card-section>

          <q-form id="editarUsuario" @submit.prevent="editar">
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.nombres"
                  name="nombres"
                  id="nombres"
                  filled
                  hint="Nombres"
                  dense="dense"
                  :value="formEditar.nombres"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.apellidos"
                  name="apellidos"
                  id="apellidos"
                  filled
                  hint="Apellidos"
                  dense="dense"
                  :value="formEditar.apellidos"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.rut"
                  name="rut"
                  id="rut"
                  filled
                  hint="Rut"
                  dense="dense"
                  :value="formEditar.rut"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.usuario"
                  name="usuario"
                  id="usuario"
                  filled
                  hint="Usuario"
                  dense="dense"
                  :value="formEditar.usuario"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.telefono"
                  name="telefono"
                  id="telefono"
                  filled
                  hint="Telefono"
                  dense="dense"
                  mask="(+##) #-####-####" 
                  :value="formEditar.telefono"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.email"
                  name="email"
                  id="email"
                  filled
                  hint="Email"
                  dense="dense"
                  :value="formEditar.email"
                  lazy-rules
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
                <input type="hidden" name="id_usuario" :value="formEditar.id_usuario" />
              </div>
              <div class="col-6 col-xs-6 q-pa-md">Estatus de usuario</div>
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
              </div>
              &nbsp;
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Editar" type="submit" color="primary" />&nbsp;
                <q-btn icon-right="cancel" label="Cancelar" type="submit" color="orange" to="/usuarios"/>
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
      rol:"",
      estatus:""
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
        .get(`${env.endpoint}/api_inventarioit/usuarios/getUsers?id_usuario=` + id_usuario)
        .then(res => {
          this.formEditar = res.data.response[0];
          this.rol = res.data.response[0].rol;
          this.estatus = res.data.response[0].estatus;
          //this.nombres = res.data.nombres[0].nombres;
           
        });
    },
    editar() {
      if (
        this.formEditar.nombres == null ||
        this.formEditar.apellidos == null
      ) {
        this.$q.notify({
          message: "Debe completar todos los campos del formulario",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
      }

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
              message: "Usuario editado",
              color: "teal-6",
              icon: "warning",
              position: "bottom-right"
            });
            this.$router.push("/usuarios");
          } else {
            this.$q.notify({
              message: "No se han detectado cambios",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
          }
        });
    }
  },
  created() {
    this.getId();
  },
  mixins: [sesion]
};
</script>
