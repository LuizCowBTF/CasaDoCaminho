/*** Modal Search Start ***/

document.addEventListener('DOMContentLoaded', function() {
    let isSearching = false;
    let searchTimeout;

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const searchLoading = document.getElementById('searchLoading');

    const databasePesquisa = [
			{
				titulo: "Evangelho Segundo o Espiritismo",
				tipo: "Serviço",
				link: "servicos.html",
				descricao: "Estudo do Livro O Evangelho Segundo o Espiritismo todas as quartas-feiras às 20h.",
				tags: "estudo evangelho doutrina"
			},
			{
				titulo: "Reunião Pública",
				tipo: "Evento",
				link: "eventos.html",
				descricao: "Cultos semanais com palestras e passes todas as segundas e sextas às 20h.",
				tags: "culto palestra passe"
			},
			{
				titulo: "Campanha do Quilo",
				tipo: "Campanha",
				link: "index.html",
				descricao: "Doações de alimentos não perecíveis. Aceitamos doações todos os dias das 9h às 17h.",
				tags: "alimento doação caridade"
			},
			{
				titulo: "Biblioteca Espírita",
				tipo: "Serviço",
				link: "servicos.html",
				descricao: "Acervo de livros espíritas para consulta local. Funciona de terça a sexta das 14h às 18h.",
				tags: "livro estudo biblioteca"
			},
			{
				titulo: "Palestra: Caridade",
				tipo: "Evento",
				link: "eventos.html",
				descricao: "Palestra mensal sobre a virtude da caridade. Primeiro domingo de cada mês às 10h.",
				tags: "palestra caridade virtude"
			},
			{
				titulo: "Evangelização Infantil",
				tipo: "Serviço",
				link: "servicos.html",
				descricao: "Aulas de evangelização espírita para crianças aos sábados das 9h às 11h.",
				tags: "criança evangelização estudo"
			},
			{
				titulo: "Assistência aos Irmãos de Rua",
				tipo: "Serviço",
				link: "servicos.html",
				descricao: "Distribuição de alimentos e cobertores para irmãos em situação de rua todo último domingo do mês.",
				tags: "caridade assistência alimento"
			}
		];

    function showLoading() {
        isSearching = true;
        searchLoading.style.display = 'block';
        resultsContainer.innerHTML = '';
        noResults.style.display = 'none';
        searchResults.style.display = 'block';
    }

    function hideLoading() {
        isSearching = false;
        searchLoading.style.display = 'none';
    }

    function performSearch() {
        if (isSearching) return;

        const term = searchInput.value.trim();
        
        if (term.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        showLoading();

        setTimeout(() => {
            try {
                const results = databasePesquisa.filter(item =>
                    item.titulo.toLowerCase().includes(term.toLowerCase()) ||
                    item.descricao.toLowerCase().includes(term.toLowerCase()) ||
                    (item.tags && item.tags.toLowerCase().includes(term.toLowerCase()))
                );

                displayResults(results);
            } catch (error) {
                console.error('Erro na pesquisa:', error);
                resultsContainer.innerHTML = '<p class="text-danger">Ocorreu um erro na pesquisa</p>';
            } finally {
                hideLoading();
            }
        }, 300);
    }

    function displayResults(results) {
        if (results.length > 0) {
            resultsContainer.innerHTML = results.map(item => `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${item.titulo}</h5>
                            <p class="card-text">${item.descricao}</p>
                        </div>
                    </div>
                </div>
            `).join('');
            noResults.style.display = 'none';
        } else {
            resultsContainer.innerHTML = '';
            noResults.style.display = 'block';
        }
    }

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearTimeout(searchTimeout);
        performSearch();
    });

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 500);
    });

    document.getElementById('searchModal').addEventListener('hidden.bs.modal', function() {
        clearTimeout(searchTimeout);
        searchInput.value = '';
        searchResults.style.display = 'none';
    });
});

/*** Modal Search End ***/