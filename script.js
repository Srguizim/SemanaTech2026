let oficinas = [
  { nome: "Introdução à Robótica", preco: 20.00, horario: "07:00", vagas: 15, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9AvrmnkL-1dVYtbuU-C5H6iTKvk8U64eGkOEmbM8m57jfGwxT5i2-awk&s=10" },
  { nome: "Criação de Jogos com JavaScript", preco: 40.00, horario: "08:30", vagas: 25, imagem: "https://img-c.udemycdn.com/course/480x270/3940586_0fe9_4.jpg" },
  { nome: "Primeiros Passos com Arduino", preco: 50.00, horario: "9:00", vagas: 20, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRopXwownX7nbVN7VXKLO5nvZ84UMrhQdx3W3Y1yQutKQ&s=10" },
  { nome: "Design de Interfaces no Figma", preco: 35.00, horario: "12:00", vagas: 20, imagem: "https://imgproxy.domestika.org/unsafe/w:1200/rs:fill/plain/src://blog-post-open-graph-covers/000/009/753/9753-original.jpg?1640916662" },
  { nome: "Segurança na Internet", preco: 25.00, horario: "13:00", vagas: 15, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzC9OXBbOFusyEE65DAmbF6vKytrE5qHfbiY4IpCK1zA&s=10" },
  { nome: "Introdução à Inteligência Artificial", preco: 45.00, horario: "14:30", vagas: 10, imagem: "https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_JMpmJYv.jpg" },
  { nome: "Desenvolvimento de Aplicativos", preco: 55.00, horario: "15:30", vagas: 15, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Jz3yuyd20mPEI55-QotZzu0i4SplPkM1TLUqRWveyA&s=10" },
  { nome: "Criação de Sites Responsivos", preco: 40.00, horario: "17:00", vagas: 20, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9mGYKS-CCRkdwYlzqX7qWCB-D90TCYlBWeDw2Rvr0Q&s=10" }
];

let banners = [
  { url: "https://faro.edu.br/wp-content/uploads/2019/09/289521-x-palestras-ted-para-inspirar-sua-carreira.jpg", titulo: "Semana Tech 2026" },
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmPGul76uba1fkm-Fj9cgLazBC9NNvBFspff6P1Na-y5B_W1NJO2ske-lq&s=10", titulo: "Programação" },
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbmHHW1X8ZMuaFluAuRESYnstFlX2xp5fVoMnO9bO5vRjCIY2xxR5_E1EB&s=10", titulo: "Tecnologia" },
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3wddYCGi_-jgyL5rravVDzW3iJeHMBCe8z74HXB_YdJt8Dx6dGYdRRHM&s=10", titulo: "Prática" }
];

let bannerAtual = 0;
let inscricoes = JSON.parse(localStorage.getItem('minhasInscricoes')) || [];

let containerCards = document.getElementById('oficinasContainer');
let inputBusca = document.getElementById('inputBusca');
let selectOrdenacao = document.getElementById('selectOrdenacao');
let msgSemResultados = document.getElementById('semResultados');
let linkInscricoesHeader = document.getElementById('linkInscricoes');

let imgCarrossel = document.getElementById('carroselImg');
let parteCarrossel = document.getElementById('parteCarrossel');
let bntAnterior = document.getElementById('bntAnterior');
let bntProximo = document.getElementById('bntProximo');

document.addEventListener('DOMContentLoaded', () => {
  renderizarOficinas(oficinas);
  atualizarContadorHeader();
  atualizarCarrossel();
});

function renderizarOficinas(lista) {
  containerCards.innerHTML = "";

  if (lista.length === 0) {
    msgSemResultados.classList.remove('hidden');
    return;
  }
  msgSemResultados.classList.add('hidden');

  lista.forEach(function(oficina) {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${oficina.imagem}" alt="${oficina.nome}">
      <div class="cardContent">
        <div>
          <h3 class="cardTitulo">${oficina.nome}</h3>
          <p class="cardInfo">Horário: ${oficina.horario}</p>
          <p class="cardInfo">Vagas: ${oficina.vagas}</p>
          <p class="cardPreco">R$ ${oficina.preco.toFixed(2).replace('.', ',')}</p>
        </div>
        <button class="bntInscrever" onclick="adicionarInscricao('${oficina.nome}')">Inscrever-se</button>
      </div>
    `;
    containerCards.appendChild(card);
  });
}

inputBusca.addEventListener('input', aplicarFiltrosEOrdenacao);
selectOrdenacao.addEventListener('change', aplicarFiltrosEOrdenacao);

function aplicarFiltrosEOrdenacao() {
  const termo = inputBusca.value.toLowerCase();
  
  let resultado = oficinas.filter(oficina => 
    oficina.nome.toLowerCase().includes(termo)
  );

  const opcaoOrdenacao = selectOrdenacao.value;
  if (opcaoOrdenacao === 'menor') {
    resultado.sort((a, b) => a.preco - b.preco);
  } else if (opcaoOrdenacao === 'maior') {
    resultado.sort((a, b) => b.preco - a.preco);
  }

  renderizarOficinas(resultado);
}

function adicionarInscricao(nomeOficina) {
  const oficinaEncontrada = oficinas.find(o => o.nome === nomeOficina);
  
  if (oficinaEncontrada) {
    inscricoes.push(oficinaEncontrada);
    localStorage.setItem('minhasInscricoes', JSON.stringify(inscricoes));
    atualizarContadorHeader();
  }
}

function atualizarContadorHeader() {
  linkInscricoesHeader.textContent = `Minhas inscrições (${inscricoes.length})`;
}

function atualizarCarrossel() {
  imgCarrossel.src = banners[bannerAtual].url;
  parteCarrossel.textContent = banners[bannerAtual].titulo;
  
  bntAnterior.disabled = bannerAtual === 0;
  bntProximo.disabled = bannerAtual === banners.length - 1;
}

bntAnterior.addEventListener('click', () => {
  if (bannerAtual > 0) {
    bannerAtual--;
    atualizarCarrossel();
  }
});

bntProximo.addEventListener('click', () => {
  if (bannerAtual < banners.length - 1) {
    bannerAtual++;
    atualizarCarrossel();
  }
});
function mudarTema() {
  document.body.classList.toggle('escuro');
}
function abrirMenu() {
     document.getElementById("menu").classList.toggle("aberto");
}
