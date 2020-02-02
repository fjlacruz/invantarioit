import axios from "axios";
export default {
 created(){
	
  var timeout;
  const token = JSON.parse(this.$q.localStorage.getItem("token"));
  document.onmousemove = function(){
  clearTimeout(timeout);
  console.log('movimiento')
  timeout = setTimeout(function(){
    window.location.href = "/";
  }, 5000);
  
  }
  this.salir();
},
methods: {
    salir() {
      const token = JSON.parse(this.$q.localStorage.getItem("token"));
      axios
        .get(`${env.endpoint}/api/Servicio/logout?token=` + token)
        .then(res => {
          if (res.data.res == "success") {
            this.$q.localStorage.remove("token");
          }
        });
    }
 }
}
