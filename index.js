// Si hacemos clic en el botón "Buscar!"
$('.buscarUsuario').on('click', () => {
  // Tomamos el valor de búsqueda:
  let usuarioGitHub = $('#inputUsuario').val()
  // Ejecutamos la función de búsqueda
  buscarData(usuarioGitHub)
})

// La función que hace la búsqueda con manejo de errores
let buscarData = (usuarioGitHub) => {
  // Hacemos un Ajax...
  $.ajax({
    url: `https://api.github.com/users/${usuarioGitHub}`,
    context: document.body,
    // Si sale todo bien, le mandamos la info del usuario a la función que llena el HMTL
    success: function (data) {
      popularHTML(data)
    },
    // Si pasa algo malo, igual llenamos el HTML...
    error:function (xhr, ajaxOptions, thrownError){
      // Este error, es cuando no se encuentra el usuario
      if(xhr.status==404) {
        let noData = {
          avatar_url: "https://avatars1.githubusercontent.com/u/15474343?s=400&v=4",
          followers: "X",
          public_gists: "X",
          public_repos: "X",
          name: "Usuario no encontrado...",
          bio: ""
        }
          popularHTML(noData)
      // Esto sucede cuando github te pone el límite de consultas por usuario...
      }
      if(xhr.status==403) {
        let noData = {
          avatar_url: "https://avatars1.githubusercontent.com/u/15474343?s=400&v=4",
          followers: "X",
          public_gists: "X",
          public_repos: "X",
          name: "Se llegó al límite de consultas gratis :(",
          bio: ""
        }
          popularHTML(noData)
      }
  }
  })
}

// Esta función llena el HTML con la data correspondiente, tanto datos de usuario como mensajes de error.
let popularHTML = (data) => {
  $('#nombre').text(data.name)
  $('#bio').text(data.bio)
  $('#repos').text(data.public_repos)
  $('#gists').text(data.public_gists)
  $('#followers').text(data.followers)
  $('#avatar').attr('src', data.avatar_url)
}