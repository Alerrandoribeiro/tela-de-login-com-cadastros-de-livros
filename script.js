
// valores de cadastro
const campoNovoCadasto = document.getElementById("newUsername");
const campoNovaSenha = document.getElementById("novaSenha");
const campoRepitaSenha = document.getElementById("repitaSenha");
// valores de login
const campoLogin = document.getElementById("usernameCadastrado");
const campoSenha = document.getElementById("senhaCadastrada");
// livros
const campoTitulo = document.getElementById("titulo");
const campoAutor = document.getElementById("autor");
const campoGenero = document.getElementById("genero");
const campoIsbn = document.getElementById("isbn");
const lista = document.getElementById("lista");

function logado() {
  let login = campoLogin.value
  let senha = campoSenha.value
  let mensagem = "Usuário ou senha incorreta!";
  let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados")); /**Use JSON.parse(localStorage.getItem("bancoDeDados")) para obter os dados armazenados na Local Storage. Verifique se o banco de dados existe:
    */
  if (bancoDeDados == null) {
    mensagem = "Nenhum usuário cadastrado até o momento";
  } else {
    /**Dentro do bloco else, percorra os usuários do banco de dados e verifique se as credenciais correspondem a algum usuário, ao se logar, crie o elemento ‘logado’ no localStorage, para identificar o usuário que se logou: */
    for (let usuario of bancoDeDados) {
      if (usuario.login == login && usuario.senha == senha) { // ponto a rever ou trocar por senhaCadastro
        mensagem = "Parabéns, você logou!";
        localStorage.setItem("logado", JSON.stringify(usuario));
        window.location.href = 'logado.html';
        break;
      }
    }
  }
  alert(mensagem)
}


function cadastrar() {
  let senhaCadastro = campoNovaSenha.value
  let senhaRepetida = campoRepitaSenha.value
  if (campoNovoCadasto.value != '' && campoNovaSenha.value != '' && campoRepitaSenha.value != '') {

    if (senhaCadastro == senhaRepetida) {
      const usuario = {
        login: campoNovoCadasto.value,
        senha: campoNovaSenha.value,
      };
      let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
      if (bancoDeDados == null) {
        bancoDeDados = [];
      }
      if (existe(usuario, bancoDeDados)) { // verificando se já exite usuário cadastrado!
        alert('Esse usuário já foi cadastrado!')
      } else {

        bancoDeDados.push(usuario);
        localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
        alert("Usuário cadastrado com sucesso!");
        campoRepitaSenha.value = null // limpando o placeholder
        campoNovoCadasto.value = null
        campoRepitaSenha.value = null
      }
    } else {
      alert("As senhas são diferentes!");
    }
  } else {
    alert('Preencha todos os campos!')
  }
}

function voltar() {
  window.location.href = "index.html";
}

function existe(usuario, bancoDeDados) {

  for (let verificado of bancoDeDados) {
    if (verificado.login == usuario.login) {
      return true;
    }
  }
  return false;
}
function existeLivro(livro, biblioteca) {

  for (let verificado of biblioteca) {
    if (verificado.titulo == livro.titulo && verificado.autor == livro.autor) {
      return true;
    }
  }
  return false;
}


function criaLivro() {
  const livro = {
    titulo: campoTitulo.value,
    autor: campoAutor.value,
    genero: campoGenero.value,
    isbn: campoIsbn.value

  }
  let biblioteca = JSON.parse(localStorage.getItem("biblioteca"));
  if (biblioteca == null) {
    biblioteca = [];
  }
  if (existeLivro(livro, biblioteca)) { // verificando se já exite usuário cadastrado!
    alert('Esse livro já foi cadastrado!')
  } else {

    // verificar se ISBN já existe cadastro
    biblioteca.push(livro)
    localStorage.setItem("biblioteca", JSON.stringify(biblioteca)); // cadastro
    alert("livro cadastrado com sucesso!");
    campoTitulo.value = null
    campoAutor.value = null
    campoGenero.value = null
    campoIsbn.value = null
  }

}
let aberto = false;
function exibe() {
  let livros = '';
  if (!aberto) {
    aberto = true;

    let biblioteca = JSON.parse(localStorage.getItem("biblioteca"));

    if (biblioteca == null) {
      livros = 'Não há livros cadastrados no momento!'
    } else {
      for (let livro of biblioteca) {
        livros += '<br><strong>Título: </strong>' + livro.titulo;
        livros += '<br><strong>Autor: </strong>' + livro.autor;
        livros += '<br><strong>Gênero: </strong>' + livro.genero;
        livros += '<br><strong>Isbn: </strong>' + livro.isbn;
        livros += '<br><strong>_______________________</strong>';

      }
      lista.innerHTML = livros
    }
  } else {
    aberto = false;
    lista.innerHTML = ''
  }
}


