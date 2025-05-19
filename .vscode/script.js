const URL = 'https://newsdata.io/api/1/news?apikey=pub_807679717e758effd1e413cfd122621021702&q=fake%20news&country=br&language=pt';
const container = document.getElementById('noticias-container');

async function chamarApi() {
  try {
    const resp = await fetch(URL);
    const dados = await resp.json();

    container.innerHTML = '';

    if (dados.results && dados.results.length > 0) {
      const titulosExibidos = new Set();
      let count = 0;

      for (const noticia of dados.results) {
        if (!titulosExibidos.has(noticia.title)) {
          titulosExibidos.add(noticia.title);

          const div = document.createElement('div');
          div.classList.add('noticia');
          div.innerHTML = `
            <h3>${noticia.title}</h3>
            <p>${(noticia.description ? noticia.description.slice(0, 200) + '...' : 'Sem descrição disponível')}</p>
            <a href="${noticia.link}" target="_blank">Leia mais</a>
          `;
          container.appendChild(div);
          count++;
        }

        if (count >= 6) break; 
      }

      if (count === 0) {
        container.innerHTML = '<p>Nenhuma notícia única encontrada.</p>';
      }

    } else {
      container.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
    }

  } catch (erro) {
    console.error("Erro ao carregar notícias:", erro);
    container.innerHTML = '<p>Erro ao carregar notícias.</p>';
  }
}

chamarApi();