<template>
  <div>
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Editar Ambiente</q-card-section>
          <q-form id="editarAmbiente" @submit.prevent="editar">
            <input type="hidden" name="id_ambiente" :value="$route.params.id_ambiente" />
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.descripcion_ambiente"
                  name="descripcion_ambiente"
                  id="descripcion_ambiente"
                  filled
                  hint="Descripcion Ambiente"
                  dense="dense"
                  class="uppercase"
                  :value="formEditar.descripcion_ambiente"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                />
              </div>
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
                  to="/mantenedores/ambientes"
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

export default {
  name: "editar",
  data() {
    return {
      tab: "sitios",
      formEditar: {},
      id_ambiente: "",
      estatus: "",
      descripcion_ambiente: ""
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
      const id_ambiente = this.$route.params.id_ambiente;
      axios
        .get(
          `${env.endpoint}/api_inventarioit/mantenedores/getAmbientes?id_ambiente=` +
            id_ambiente
        )
        .then(res => {
          this.formEditar = res.data.response[0];
          this.id_ambiente = res.data.response[0].id_ambiente;
          this.descripcion_ambiente = res.data.response[0].descripcion_ambiente;
          this.estatus = res.data.response[0].estatus;
        });
    },
    editar() {
      if (this.formEditar.descripcion_ambiente == null) {
        this.$q.notify({
          message: "Debe completar todos los campos del formulario",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
      }

      const form = document.getElementById("editarAmbiente");

      axios
        .post(
          `${env.endpoint}/api_inventarioit/mantenedores/editarAmbiente`,
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Ambiente editado",
              color: "teal-6",
              icon: "warning",
              position: "bottom-right"
            });
            this.$router.push("/mantenedores/ambientes");
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
<style>
.uppercase input {
  text-transform: uppercase;
}
</style>