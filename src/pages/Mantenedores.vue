<template>
  <div class="q-pa-lg">
    <div class="row justify-center">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="ambientes" label="Ambientes" />
          <q-tab name="servicios" label="Servicios" />
          <q-tab name="sitios" label="Sitios" />
          <q-tab name="tipoServidores" label="Tipo Servidores" />
          <q-tab name="software" label="Software" />
          <q-tab name="tipoSoftware" label="Tipo Software" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="ambientes">
            <form id="editarSitio" autocomplete="off" @submit.prevent="editar">
              <q-separator inset />
              <q-card-section>
                <div class="col-12 col-xs-12 q-pa-xs">
                  <table class="q-table">
                    <thead>
                      <tr>
                        <th class="text-left">Nombre del Sitio</th>
                        <th class="text-left">Estatus</th>
                        <th class="text-left">Editar</th>
                      </tr>
                    </thead>
                    <tbody v-for="item in listar" :key="item.id_sitio">
                      <tr>
                        <td class="text-left">{{ item.descripcion_sitio}}</td>
                        <td class="text-left" v-if="item.estatus=='1'">
                          <q-radio color="green" />
                          <q-tooltip>Activo</q-tooltip>
                        </td>
                        <td class="text-left" v-else>
                          <q-radio color="red" />
                          <q-tooltip>Inactivo</q-tooltip>
                        </td>
                        <td class="text-left">
                          <q-btn
                            round
                            color="primary"
                            icon="edit"
                            size="xs"
                            :to="'/editarSitio/'+item.id_sitio"
                            href="#"
                          />
                          <q-tooltip>Editar</q-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <q-separator inset />&nbsp;
                  <div class="col-12 col-md-4 q-pa-xs justify-left">
                    <q-btn
                      icon-right="send"
                      label="Agregar Nuevo Sitio"
                      type="submit"
                      color="primary"
                      :to="'/nuevoSitio/'"
                    />&nbsp;
                  </div>
                </div>
              </q-card-section>
            </form>
          </q-tab-panel>

          <q-tab-panel name="servicios">
            <div class="text-h6">Alarms</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="sitios">
            <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="tipoServidores">
            <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="software">
            <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="tipoSoftware">
            <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>




<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
import env from "../config/env.js";
export default {
  data() {
    return {
      tab: "ambientes",
      listar: []
    };
  },
  created() {
    this.listaSitios();
    const token = JSON.parse(this.$q.localStorage.getItem("token"));
  },
  methods: {
    listaSitios() {
      this.showLoading();
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getSitios`)
        .then(res => {
          this.listar = res.data.response;
          console.log(this.listar);
          this.hideLoading();
        });
    },

    showLoading() {
      this.$q.loading.show({
        message: "Procesando su peticion...</span>"
      });
    },
    hideLoading() {
      this.$q.loading.hide({
        message: "Procesando su peticion...</span>"
      });
    },
    onReady: function(instance, CountUp) {
      const that = this;
      instance.update(that.endVal);
    }
  },
  mixins: [sesion]
};
</script>