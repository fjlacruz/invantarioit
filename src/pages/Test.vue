<template>
  <div class="q-pa-md" style="max-width: 800px">
    test
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="name"
        label="Nombre"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Edad"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Ingrese su edad',
          val => val > 0 && val < 100 || 'Solo numeros'
        ]"
      />

      <q-input v-model="text" label="Standard" />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit...." type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn to="/" label="Index" outline color="purple" />
        <q-btn @click="redireccion" label="Redireccion" outline color="purple" />
        <q-btn @click="salir" label="Cerrar sesion" outline color="purple" />
      </div>
    </q-form>

    <div class="row">
      <div class="col-3">1</div>
      <div class="col-6">
        <ul v-for="item in listar" :key="item.id">
          <li>{{ item.titulo}}</li>
        </ul>
        {{ listarE }}
      </div>
      <div class="col-3">1</div>
    </div>

    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
    ></q-table>

    <div class="q-pa-md">
      <q-btn color="purple" @click="showNotif('bottom-left')" label="Show Notification....test" />
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Alert" color="primary" @click="alert" />
      <q-btn label="Confirm" color="primary" @click="confirm" />
      <q-btn label="Prompt" color="primary" @click="prompt" />
    </div>

    <div class="q-pa-md">
      <q-btn color="teal" @click="showLoading" label="Show Loading" />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-btn no-caps push color="primary" label="List BottomSheet" @click="show2(grid)" />
      <q-btn
        no-caps
        push
        color="white"
        text-color="primary"
        label="Grid BottomSheet"
        @click="show(true)"
      />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-btn round color="primary" icon="shopping_cart" />
      <q-btn round color="secondary" icon="navigation" />
      <q-btn round color="amber" glossy text-color="black" icon="layers_clear" />
      <q-btn round color="brown-5" icon="directions" />
      <q-btn round color="deep-orange" icon="edit_location" />
      <q-btn round color="purple" glossy icon="local_grocery_store" />
      <q-btn round color="black" icon="my_location" />
    </div>

    <div class="q-pa-lg">
      <div class="row">
        <div class="col-12 col-md-8 q-pa-xs">
          <q-input v-model="text" label="Nombres" dense="dense" />
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input v-model="text" label="Nombres" dense="dense" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input v-model="text" label="Nombres" dense="dense" />
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input v-model="text" label="Nombres" dense="dense" />
        </div>
        <div class="col-12 col-md-4 q-pa-xs">
          <q-input v-model="text" label="Nombres" dense="dense" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined v-model="text" label="Outlined" />
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined v-model="text" label="Outlined" />
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined v-model="text" label="Outlined" />
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined v-model="text" label="Outlined" />
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input outlined v-model="text" label="Outlined" />
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input filled v-model="text" label="Label" dense="dense" />
        </div>
        <div class="col-12 col-md-3 q-pa-xs">
          <q-input filled v-model="text" label="Label" dense="dense" />
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import axios from "axios";
export default {
  name: "PageInicio",
  data() {
    return {
      name: null,
      age: null,
      listar: [],
      accept: false,
      listarE: "",
      visibleColumns: ["calories", "desc", "protein", "sodium", "iron"],
      columns: [
        {
          name: "desc",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        {
          name: "calcium",
          label: "Calcium (%)",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
  },
  created() {
    this.getData();
    const token = JSON.parse(this.$q.localStorage.getItem("token"));
    ///console.log('token:' + token)
    if (!token) {
      this.$router.push("/login");
    }
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    },
    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    getData() {
      axios
        .get("http://localhost/snippetWebpack/api/crud/getPost.php")
        .then(res => {
          //console.log(this.listar)
          if (this.listar) {
            this.listar = res.data;
          } else {
            this.listarE = "No existen datos";
          }
        });
    },
    redireccion() {
      this.$q.notify({
        message: "John pinged you",
        color: "purple"
      });
      //this.$router.push('/')
    },
    showNotif() {
      this.$q.notify({
        message:
          "John pinged you John pinged you John pinged you John pinged you John pinged you",
        color: "blue-grey-13",
        icon: "cloud_done",
        position: "bottom-right"
      });
    },
    alert() {
      this.$q
        .dialog({
          title: "Alert",
          message: "Some message"
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    showLoading() {
      this.$q.loading.show({
        message: "Procesando su peticion...</span>"
      });
      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },
    salir() {
      const token = JSON.parse(this.$q.localStorage.getItem("token"));
      //axios.get('http://localhost/snippetWebpack/api/loginRegistro/salir.php?token=' + token)
      axios
        .get("http://localhost/api/Servicio/logout?token=" + token)
        .then(res => {
          if (res.data == "success") {
            this.$q.localStorage.remove("token");
            this.$router.push("/Login");
          }
        });
    }
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
  //mixins:[sesion]
};
</script>


============================================================================

<template>
  <div>
  <q-form id="registrarUsuario" @submit.prevent="registrar">

   <q-select
        filled
        v-model="model"
        :options="listar"
        option-value="id_usuario"
        option-label="usuario"
        name="model"
        id="model"
        emit-value
        map-options
        style="min-width: 250px; max-width: 300px"
      />
      

        <q-input type="text" :value="model" name="id_usuario" id="id_usuario"/>

       <q-btn icon-right="send" label="Registrar" type="submit" color="primary" />
  </q-form>

<q-icon name="accessibility_new
" class="cursor-pointer">
          <q-popup-proxy v-model="showIconPicker">

            <q-icon-picker
              v-model="value"
              :filter="value"
              icon-set="material-icons"
              tooltips
              :pagination.sync="pagination"
              style="height: 300px; width: 300px; background-color: white;"
            />

          </q-popup-proxy>
        </q-icon>
  </div>
<!-- https://quasarframework.github.io/quasar-ui-qiconpicker/icons-->
</template>


<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
export default {
  name: "usuarios",

  data() {
    return {
      respuesta: "",
      listar: [],
      userData: "",
      id_usuario: "",
      buscar: "",
      cantidad: "",
      model:"",
      nombres:""
    };
  },
  created() {
    this.userList();
    this.getUser();
    this.buscarDatos();
    this.cantidadRegistros();
    const token = JSON.parse(this.$q.localStorage.getItem("token"));
  },

  methods: {
    getUser() {
      const token = JSON.parse(this.$q.localStorage.getItem("token"));
      axios
        .get("http://localhost/api_inventarioit/usuarios/getUsers?token=" + token)
        .then(res => {
          //console.log(res.data.data[0].id_usuario)
          this.id_usuario = res.data.response[0].id_usuario;
          this.rol = res.data.response[0].rol;
          this.usuario = res.data.response[0].usuario;
          this.token = res.data.response[0].token;
        });
    },
    userList() {
      this.showLoading();
      axios.get("http://localhost/api_inventarioit/usuarios/getUsers").then(res => {
       // this.listar = res.data.response[0].id_usuario;
       this.model="Seleccione"
        
        this.hideLoading();
        //console.log(res);
      });
    },
    buscarDatos() {
      axios
        .post("http://localhost/api_inventarioit/usuarios/getUsers?buscar=" + this.buscar)
        .then(res => {
          this.listar = res.data.response;
          //console.log(res.data.response);
        });
    },
    cantidadRegistros() {
      axios.get("http://localhost/api_inventarioit/usuarios/cantidadUsuarios").then(res => {
        this.cantidad = res.data.response[0].cantidad;
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
    registrar() {
alert(this.model);
      const form = document.getElementById("registrarUsuario");
      axios.post("http://localhost/api_inventarioit/usuarios/registrar_usuario",new FormData(form))
        .then(res => {
          this.respuesta = res.data.response;
          if(this.respuesta=='success'){
            this.$q.notify({
              message: "Usuario Registrado",
              color: "teal-6",
              icon: "warning",
              position: "bottom-right"
            });
            this.$router.push("/usuarios");
          }else{
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

  mixins: [sesion]
};
</script>


