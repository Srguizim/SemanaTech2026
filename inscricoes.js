document.addEventListener('DOMContentLoaded', () => {
  const listaContainer = document.getElementById('inscricoesLista');
  const totalQtdSpan = document.getElementById('totalQtd');
  const totalValorSpan = document.getElementById('totalValor');

  
  const btnCancelar = document.getElementById('bntCancelar');
  const btnConfirmar = document.getElementById('bntConfirmar');

  
  let inscricoes = JSON.parse(localStorage.getItem('minhasInscricoes')) || [];
  let indeceRemover = null; 

  function renderizarInscricoes() {
    listaContainer.innerHTML = '';

    if (inscricoes.length === 0) {
      listaContainer.innerHTML = '<p>Nenhuma oficina selecionada.</p>';
      totalQtdSpan.textContent = '0';
      totalValorSpan.textContent = '0,00';
      return;
    }

    let totalValor = 0;

  
    inscricoes.forEach((oficina, index) => {
      totalValor += oficina.preco;

      const item = document.createElement('div');
      item.className = 'itemInscrito';
      item.innerHTML = `
          <div id="conteudo">
            <h3>${oficina.nome}</h3>
            <p>Horário: ${oficina.horario}</p>
          </div>
          <div id="conteudo">
            <p><strong>R$ ${oficina.preco.toFixed(2).replace('.', ',')}</strong></p>
            <button class="bntRemover" dataIndex="${index}">Remover</button>
          </div>
      `;
      listaContainer.appendChild(item);
    });


    totalQtdSpan.textContent = inscricoes.length;
    totalValorSpan.textContent = totalValor.toFixed(2).replace('.', ',');

   
  document.querySelectorAll('.bntRemover').forEach(btn => {
      btn.addEventListener('click', (e) => {
        indeceRemover = parseInt(e.target.getAttribute('dataIndex'));
        abrirModal();
      });
    });
  }

  function abrirModal() {
    document.getElementById("modalConfirmacao").style.display = "flex"
  }

  function fecharModal() {
    document.getElementById("modalConfirmacao").style.display = "none"
    indiceRemover = null;
  }

  btnCancelar.addEventListener('click', () => {
    fecharModal();
  });


  btnConfirmar.addEventListener('click', () => {
    if (indeceRemover !== null) {

      inscricoes.splice(indeceRemover, 1);
      localStorage.setItem('minhasInscricoes', JSON.stringify(inscricoes));
      renderizarInscricoes();

      fecharModal();
    }
  });

  renderizarInscricoes();
});

function mudarTema() {
  document.body.classList.toggle('escuro');
}
