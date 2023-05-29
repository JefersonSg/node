// const item = document.querySelectorAll('.deletar');

// item.forEach((item) => {
//   item.addEventListener('click', function () {
//     item.parentElement.remove();
//     // this.remove();
//   });
// });
const botaoEditar = document.querySelectorAll('.editarInfos');

if (botaoEditar.length) {
  botaoEditar.forEach((botao) => {
    botao.addEventListener('click', function () {
      const divPrincipal = this.parentElement.parentElement;
      const id = divPrincipal.querySelector('.id');
      const nomeLivro = divPrincipal.querySelector('.bold');
      const paginas = divPrincipal.querySelector('.paginas');

      const idValor = id.innerText.replace('#', '').replace(' -', '');
      const nomeValor = nomeLivro.innerText;
      const paginasValor = paginas.innerText.replace(' páginas', '');

      divPrincipal.innerHTML = `
      <form class="formularioEdit" action="/books/updatebook" method="post">
      <span>#${idValor} - </span>
      <input type="hidden" name="id" value="${idValor}">
          <input type="text" name="title" id="title" placeholder="Digite o título" value="${nomeValor}">
          <input type="text" name="pageqty" id="pageqty" placeholder="Quantidade de páginas" value="${paginasValor}">
        <div class="botoes-div">
          <form action="/books/remove/${idValor}" method="post">
            <button type="submit" class="deletar botao">deletar</button>
          </form>
          <button class="deletar botao" type="submit" value="editar">Confirmar</button>
        </div>
      </form>
      `;
    });
  });
}
