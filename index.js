// Si hacemos clic en el botón "Buscar!"
$('.buscarUsuario').on('click', () => {
  // Tomamos el valor de búsqueda:
  let usuarioGitHub = $('#inputUsuario').val()
  // Ejecutamos la función de búsqueda
  buscarData(usuarioGitHub)
})

let buscarData = (usuarioGitHub) => {
  $.ajax({
    url: `https://api.github.com/users/${usuarioGitHub}`,
    context: document.body,
    success: function (data) {
      popularHTML(data)
    },
    error:function (xhr, ajaxOptions, thrownError){
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

let popularHTML = (data) => {
  $('#nombre').text(data.name)
  $('#bio').text(data.bio)
  $('#repos').text(data.public_repos)
  $('#gists').text(data.public_gists)
  $('#followers').text(data.followers)
  $('#avatar').attr('src', data.avatar_url)
}