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
            <div> 
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

function acessarQuizz() {
    let promise = axios.get(`${URL_API}/quizzes/${idQuizz}`);
    promise.then(mostrarTelaQuizz);
    promise.catch(erroAcessarQuizz);
}

function mostrarTelaQuizz() {

}

function erroAcessarQuizz() {
    alert("Erro ao acessar quizz. Tente novamente.");
}