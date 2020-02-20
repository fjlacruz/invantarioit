<template>
  <div>
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Editar Servicio</q-card-section>
          <q-form id="editarServicio" @submit.prevent="editar">
            <input type="hidden" name="id_servicio" :value="$route.params.id_servicio" />
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.descripcion_servicio"
                  name="descripcion_servicio"
                  id="descripcion_servicio"
                  filled
                  hint="Descripcion Servicio"
                  dense="dense"
                  :value="formEditar.descripcion_servicio"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Campo Obligatorio'
                  ]"
                />
              </div>
              <div class="col-6 col-xs-6 q-pa-md">Estatus del Servicio</div>
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
                <input type="hidden" name="tab" id="tab" v-model="tab" />
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

export default {
  name: "editar",
  data() {
    return {
      tab: "servicios",
      formEditar: {},
      id_servicio: "",
      estatus: "",
      descripcion_servicio: ""
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
      const id_servicio = this.$route.params.id_servicio;
      axios
        .get(
          `${env.endpoint}/api_inventarioit/mantenedores/getServicios?id_servicio=` +
            id_servicio
        )
        .then(res => {
          this.formEditar = res.data.response[0];
          this.id_servicio = res.data.response[0].id_servicio;
          this.descripcion_servicio = res.data.response[0].descripcion_servicio;
          this.estatus = res.data.response[0].estatus;
        });
    },
    editar() {
      if (this.formEditar.descripcion_servicio == null) {
        this.$q.notify({
          message: "Debe completar todos los campos del formulario",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
      }

      const form = document.getElementById("editarServicio");

      axios
        .post(
          `${env.endpoint}/api_inventarioit/mantenedores/editarServicio`,
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Servicio editado",
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
    }
  },
  created() {
    this.getId();
  },
  mixins: [sesion]
};
</script>
