// Si hacemos clic en el botón "Buscar!"
$('.botonBuscarUsuario').on('click', () => {
  // Tomamos el valor de búsqueda:
  let usuarioDeGitHub = $('#inputDelFront').val()
  // Ejecutamos la función de búsqueda
  buscarDataParaEl(usuarioDeGitHub)
})

// La función que hace la búsqueda con manejo de errores
let buscarDataParaEl = (usuarioDeGitHub) => {

  // Hacemos un Ajax...
  $.ajax({
    url: `https://api.github.com/users/${usuarioDeGitHub}`,
    context: document.body,
    
    // Si sale todo bien, le mandamos la info del usuario a la función que llena el HMTL
    success: function (dataDelUsuario) {
      popularHTMLConLa(dataDelUsuario)
    },

    // Si pasa algo malo, igual llenamos el HTML...
    error:function (xhr, ajaxOptions, thrownError){

      // Este error, es cuando no se encuentra el usuario
      if(xhr.status==404) {
        let dataQueNoHay = {
          avatar_url: "https://avatars1.githubusercontent.com/u/15474343?s=400&v=4",
          followers: "X",
          public_gists: "X",
          public_repos: "X",
          name: "Usuario no encontrado...",
          bio: ""
        }
        popularHTMLConLa(dataQueNoHay)
        }

      // Esto sucede cuando github te pone el límite de consultas por usuario...
      if(xhr.status==403) {
        let dataQueNoHay = {
          avatar_url: "https://avatars1.githubusercontent.com/u/15474343?s=400&v=4",
          followers: "X",
          public_gists: "X",
          public_repos: "X",
          name: "Se llegó al límite de consultas gratis :(",
          bio: ""
        }
        popularHTMLConLa(dataQueNoHay)
      }
  }
  })
}

// Esta función llena el HTML con la data correspondiente, tanto datos de usuario como mensajes de error.
let popularHTMLConLa = (dataDelUsuario) => {

  // Desestructuramos un toque:
  let { name: nombre,               // Sebastián Maciel
        bio: biografia,             // Half-Blood Developer
        public_repos: repositorios, // 11
        public_gists: gists,        // 12
        followers,                  // 13
        avatar_url: fotoDePerfil }  // Foto de Perfil
        = dataDelUsuario;

  // Mandamos al HTML la data final
  $('#nombre').text(nombre)
  $('#biografia').text(biografia)
  $('#repositorios').text(repositorios)
  $('#gists').text(gists)
  $('#followers').text(followers)
  $('#fotoDePerfil').attr('src', fotoDePerfil) // Llenamos el atributo "src" de la imagen con la url que nos da GitHub
}