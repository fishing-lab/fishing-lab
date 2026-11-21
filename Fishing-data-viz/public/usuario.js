function senhaValida(senha) {
    let temMaiuscula = false;
    let temMinuscula = false;
    let temNumero = false;
    let temEspecial = false;
    let especiais = "!@#$%&*()-_=+[]{};:,.?/\\|<>~^";

    for (let i = 0; i < senha.length; i++) {
        let letra = senha[i];

        if (letra >= "A" && letra <= "Z") {
            temMaiuscula = true;
        } else if (letra >= "a" && letra <= "z") {
            temMinuscula = true;
        } else if (letra >= "0" && letra <= "9") {
            temNumero = true;
        } else if (especiais.includes(letra)) {
            temEspecial = true;
        }
    }

    return senha.length >= 8 && temMaiuscula && temMinuscula && temNumero && temEspecial;
}

function atualizarNavbar() {
    let idUsuario = sessionStorage.getItem("ID_USUARIO");
    let nomeUsuario = sessionStorage.getItem("NOME_USUARIO");

    if (idUsuario != null && nomeUsuario != null) {
        navVisitante.style.display = "none";
        navUsuario.style.display = "flex";
        nomeNavbar.innerText = "Olá, " + nomeUsuario + "!";
    } else {
        navVisitante.style.display = "flex";
        navUsuario.style.display = "none";
    }
}

function sair() {
    sessionStorage.clear();
}

function abrirPerfil() {
    input_nome_perfil.value = sessionStorage.getItem("NOME_USUARIO") || "";
    input_email_perfil.value = sessionStorage.getItem("EMAIL_USUARIO") || "";
    input_senha_perfil.value = "";
    input_senha_exclusao.value = "";
    mensagemPerfil.innerText = "";
    mensagemExclusao.innerText = "";
    formularioPerfil.style.display = "block";
    confirmarExclusao.style.display = "none";
    janelaPerfil.style.display = "flex";
}

function fecharPerfil() {
    janelaPerfil.style.display = "none";
}

function salvarPerfil() {
    let idUsuario = sessionStorage.getItem("ID_USUARIO");
    let nome = input_nome_perfil.value.trim();
    let email = input_email_perfil.value.trim();
    let senha = input_senha_perfil.value;

    if (nome == "" || email == "" || senha == "") {
        mensagemPerfil.innerText = "Preencha nome, e-mail e senha atual.";
    } else {
        fetch("/usuarios/atualizar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha
            })
        })
        .then(function(resposta) {
            if (resposta.ok) {
                resposta.json().then(function(dados) {
                    sessionStorage.setItem("NOME_USUARIO", dados.nome);
                    sessionStorage.setItem("EMAIL_USUARIO", dados.email);
                    atualizarNavbar();
                    input_senha_perfil.value = "";
                    mensagemPerfil.innerText = "Perfil atualizado com sucesso!";
                });
            } else {
                resposta.text().then(function(texto) {
                    mensagemPerfil.innerText = texto;
                });
            }
        })
        .catch(function() {
            mensagemPerfil.innerText = "Erro ao conectar com o servidor.";
        });
    }
}

function mostrarConfirmacao() {
    formularioPerfil.style.display = "none";
    confirmarExclusao.style.display = "block";
    mensagemExclusao.innerText = "";
    input_senha_exclusao.value = "";
}

function cancelarExclusao() {
    confirmarExclusao.style.display = "none";
    formularioPerfil.style.display = "block";
}

function excluirPerfil() {
    let idUsuario = sessionStorage.getItem("ID_USUARIO");
    let senha = input_senha_exclusao.value;

    if (senha == "") {
        mensagemExclusao.innerText = "Digite sua senha para confirmar.";
    } else {
        fetch("/usuarios/excluir", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                senhaServer: senha
            })
        })
        .then(function(resposta) {
            if (resposta.ok) {
                sair();
                window.location.href = "index.html";
            } else {
                resposta.text().then(function(texto) {
                    mensagemExclusao.innerText = texto;
                });
            }
        })
        .catch(function() {
            mensagemExclusao.innerText = "Erro ao conectar com o servidor.";
        });
    }
}

// Exibe o Quiz ou a Dashboard para usuários logados.
// Para visitantes, mostra a mensagem de acesso restrito.
function atualizarAcesso() {
    let aviso = document.getElementById("avisoLogin");
    let conteudo = document.getElementById("conteudoQuiz");

    if (conteudo == null) {
        conteudo = document.getElementById("conteudoDashboard");
    }

    if (aviso != null && conteudo != null) {
        let idUsuario = sessionStorage.getItem("ID_USUARIO");
        let nomeUsuario = sessionStorage.getItem("NOME_USUARIO");

        if (idUsuario != null && nomeUsuario != null) {
            aviso.style.display = "none";
            conteudo.style.display = "block";
        } else {
            aviso.style.display = "block";
            conteudo.style.display = "none";
        }
    }
}

atualizarNavbar();
atualizarAcesso();