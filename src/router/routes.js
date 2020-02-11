const routes = [
  {
    path: "/",
    component: () => import("pages/Login")
  },
  {
    path: "/inicio",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Inicio")
      }
    ]
  },
  {
    path: "/usuarios",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Usuarios")
      }
    ]
  },
  {
    path: "/perfil/:id_usuario",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Perfil")
      }
    ]
  },
  {
    path: "/editarUsuario/:id_usuario",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/EditarUsuario")
      }
    ]
  },
  {
    path: "/cambiarClave/:id_usuario",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/CambiarClave")
      }
    ]
  },
  {
    path: "/nuevoUsuario",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/NuevoUsuario")
      }
    ]
  },
  {
    path: "/mantenedores",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Mantenedores")
      }
    ]
  },
  {
    path: "/editarSitio/:id_sitio",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/EditarSitio")
      }
    ]
  },
  {
    path: "/nuevoSitio",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/NuevoSitio")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
