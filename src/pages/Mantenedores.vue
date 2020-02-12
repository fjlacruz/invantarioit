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
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <table class="q-table">
                  <thead>
                    <tr>
                      <th class="text-left">Nombre del Ambiente</th>
                      <th class="text-left">Estatus</th>
                      <th class="text-left">Editar</th>
                    </tr>
                  </thead>
                  <tbody v-for="item in listarAmbientes" :key="item.id_ambiente">
                    <tr>
                      <td class="text-left">{{ item.descripcion_ambiente}}</td>
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
                          :to="'/editarAmbiente/'+item.id_ambiente"
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
                    label="Agregar Nuevo Ambiente"
                    type="submit"
                    color="primary"
                    :to="'/nuevoAmbiente/'"
                  />&nbsp;
                </div>
              </div>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="servicios">
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <table class="q-table">
                  <thead>
                    <tr>
                      <th class="text-left">Nombre del Servicio</th>
                      <th class="text-left">Estatus</th>
                      <th class="text-left">Editar</th>
                    </tr>
                  </thead>
                  <tbody v-for="item in listarServicios" :key="item.id_servicio">
                    <tr>
                      <td class="text-left">{{ item.descripcion_servicio}}</td>
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
                          :to="'/editarServicio/'+item.id_servicio"
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
                    label="Agregar Nuevo Servicio"
                    type="submit"
                    color="primary"
                    :to="'/nuevoServicio/'"
                  />&nbsp;
                </div>
              </div>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="sitios">
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
                  <tbody v-for="item in listarSitios" :key="item.id_sitio">
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
          </q-tab-panel>
          <q-tab-panel name="tipoServidores">
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <table class="q-table">
                  <thead>
                    <tr>
                      <th class="text-left">Tipo de Servidor</th>
                      <th class="text-left">Estatus</th>
                      <th class="text-left">Editar</th>
                    </tr>
                  </thead>
                  <tbody v-for="item in listarTipoServidores" :key="item.id_tipo_servidor">
                    <tr>
                      <td class="text-left">{{ item.tipo_servidor}}</td>
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
                          :to="'/editarTipoServidor/'+item.id_tipo_servidor"
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
                    label="Agregar Nuevo Tipo de Servidor"
                    type="submit"
                    color="primary"
                    :to="'/nuevoTipoServidor/'"
                  />&nbsp;
                </div>
              </div>
            </q-card-section>
          </q-tab-panel>
          <q-tab-panel name="software">
            <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="tipoSoftware">
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <table class="q-table">
                  <thead>
                    <tr>
                      <th class="text-left">Tipo de Software</th>
                      <th class="text-left">Estatus</th>
                      <th class="text-left">Editar</th>
                    </tr>
                  </thead>
                  <tbody v-for="item in listarTipoSoftware" :key="item.id_tipo_software">
                    <tr>
                      <td class="text-left">{{ item.descripcion_software}}</td>
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
                          :to="'/editarTipoSoftware/'+item.id_tipo_software"
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
                    label="Agregar Nuevo Tipo de Software"
                    type="submit"
                    color="primary"
                    :to="'/nuevoTipoSoftware/'"
                  />&nbsp;
                </div>
              </div>
            </q-card-section>
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
      listarSitios: [],
      listarAmbientes: [],
      listarServicios: [],
      listarTipoServidores: []
    };
  },
  created() {
    this.listaSitios();
    this.listaAmbientes();
    this.listaServicios();
    this.listaTipoServidores();
    this.listaTipoSoftware();
    const token = JSON.parse(this.$q.localStorage.getItem("token"));
  },
  methods: {
    listaSitios() {
      this.showLoading();
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getSitios`)
        .then(res => {
          this.listarSitios = res.data.response;
          this.hideLoading();
        });
    },

    listaAmbientes() {
      this.showLoading();
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getAmbientes`)
        .then(res => {
          this.listarAmbientes = res.data.response;
          //console.log(this.listarAmbientes);
          this.hideLoading();
        });
    },

    listaServicios() {
      this.showLoading();
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getServicios`)
        .then(res => {
          this.listarServicios = res.data.response;
          console.log(this.listarServicios);
          this.hideLoading();
        });
    },
    listaTipoServidores() {
      this.showLoading();
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getTipoServidor`)
        .then(res => {
          this.listarTipoServidores = res.data.response;
          //console.log(this.listarTipoServidores);
          this.hideLoading();
        });
    },
    listaTipoSoftware() {
      this.showLoading();
      axios
        .get(`${env.endpoint}/api_inventarioit/mantenedores/getTipoSoftware`)
        .then(res => {
          this.listarTipoSoftware = res.data.response;
          console.log(this.listarTipoSoftware);
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