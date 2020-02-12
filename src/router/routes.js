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
  },
  {
    path: "/editarAmbiente/:id_ambiente",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/EditarAmbiente")
      }
    ]
  },
  {
    path: "/nuevoAmbiente",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/NuevoAmbiente")
      }
    ]
  },
  {
    path: "/editarServicio/:id_servicio",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/EditarServicio")
      }
    ]
  },
  {
    path: "/nuevoServicio",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/NuevoServicio")
      }
    ]
  },
  {
    path: "/editarTipoServidor/:id_tipo_servidor",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/EditarTipoServidor")
      }
    ]
  },
  {
    path: "/nuevoTipoServidor",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/NuevoTipoServidor")
      }
    ]
  },
  {
    path: "/editarTipoSoftware/:id_tipo_software",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/EditarTipoSoftware")
      }
    ]
  },
  {
    path: "/nuevoTipoSoftware",
    component: () => import("layouts/Cabecera.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/NuevoTipoSoftware")
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
