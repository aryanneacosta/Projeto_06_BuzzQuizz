const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz";

function pegarQuizzes() {
    const promise = axios.get(`${URL_API}/quizzes`);
    promise.then(renderizarQuizzes);
    promise.catch(erroPegarQuizzes); 
}

function renderizarQuizzes(resposta) {
    console.log(resposta.data);
    const containerQuizz = document.querySelector(".containerImagens");
    for (let i = 0; i < resposta.data.length; i++) {
        console.log(resposta.data[i].title);
        containerQuizz.innerHTML += `
            <div class="top2" onclick="acessarQuizz(this)"> 
                <img src="${resposta.data[i].image}" class="imagemQuizz"> 
            <div class="tituloQuizz" > 
                ${resposta.data[i].title} 
            </div>
        </div> `
    }
}

pegarQuizzes();

function erroPegarQuizzes() {
    alert("Erro na coleta de dados da API. Tente novamente.");
}

function acessarQuizz(idQuizz) {
    let promise = axios.get(`${URL_API}/quizzes/${idQuizz}`);
    promise.then(mostrarTelaQuizz);
    promise.catch(erroAcessarQuizz);
}

function mostrarTelaQuizz() {
    document.querySelector(".telaUm").classList.add("escondido");
    document.querySelector(".telaDois").classList.remove("escondido");   
}

function erroAcessarQuizz(erro) {
    alert("Erro ao acessar quizz. Tente novamente.");
    console.log(resposta.data.erro);
}

function telaCriarQuizz() {
    if (localStorage.length === 0) {
        document.querySelector(".tela1").classList.add("escondido");
        
    }
}