const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: ["Ciencia ficción", "Acción"],
        rating: 8.8,
        description: "Un ladrón especializado en extraer secretos mediante sueños recibe una misión que consiste en implantar una idea en la mente de otra persona.",
        poster: "img/inception.jpg"
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        genre: ["Ciencia ficción", "Drama"],
        rating: 8.7,
        description: "Un grupo de exploradores viaja a través de un agujero de gusano para buscar un nuevo hogar para la humanidad.",
        poster: "img/interestelar.jpg"
    },
    {
        id: 3,
        title: "The Batman",
        year: 2022,
        genre: ["Crimen", "Drama"],
        rating: 7.7,
        description: "Batman investiga una serie de crímenes mientras descubre una red de corrupción relacionada con el pasado de Ciudad Gótica.",
        poster: "batman.jpg"
    },
    {
        id: 4,
        title: "The Dark Knight",
        year: 2008,
        genre: ["Acción", "Drama"],
        rating: 9.0,
        description: "Batman se enfrenta a un criminal que busca sumir a Ciudad Gótica en el caos y poner a prueba los límites del héroe.",
        poster: "img/thedarkknight.jpg"
    },
    {
        id: 5,
        title: "Spider-Man: Into the Spider-Verse",
        year: 2018,
        genre: ["Animación", "Acción"],
        rating: 8.4,
        description: "Miles Morales descubre que no es el único Spider-Man y aprende a asumir su papel como héroe.",
        poster: "img/spiderman.jpg"
    },
    {
        id: 6,
        title: "Dune: Part Two",
        year: 2024,
        genre: ["Ciencia ficción", "Aventura"],
        rating: 8.6,
        description: "Paul Atreides se une a Chani y los Fremen mientras busca venganza y se prepara para un conflicto que puede cambiar el destino del universo.",
        poster: "img/dune.jpg"
    }
];

function getList() {
    return JSON.parse(localStorage.getItem("cinematch-list") || "[]");
}

function saveList(list) {
    localStorage.setItem("cinematch-list", JSON.stringify(list));
    updateBadge();
}

function updateBadge() {
    document.querySelectorAll("#countBadge").forEach(function (element) {
        element.textContent = getList().length;
    });
}

function card(movie) {
    const list = getList();
    const saved = list.includes(movie.id);

    return `
        <div class="col-12 col-sm-6 col-lg-4">
            <article class="movie-card">
                <img 
                    class="poster" 
                    src="${movie.poster}" 
                    alt="Portada de ${movie.title}"
                >

                <div class="movie-body">
                    <div class="d-flex justify-content-between gap-2">
                        <h3 class="h5 fw-bold mb-1">${movie.title}</h3>
                        <span class="rating">★ ${movie.rating}</span>
                    </div>

                    <p class="text-secondary mb-2">
                        ${movie.year} · ${movie.genre[0]}
                    </p>

                    <p class="small text-secondary">
                        ${movie.description}
                    </p>

                    <div class="d-flex gap-2">
                        <a 
                            class="btn btn-sm btn-outline-light flex-grow-1" 
                            href="pelicula.html?id=${movie.id}"
                        >
                            Ver detalles
                        </a>

                        <button 
                            class="btn btn-sm ${saved ? "btn-danger" : "btn-outline-danger"} save-btn" 
                            data-id="${movie.id}"
                            type="button"
                        >
                            ${saved ? "♥" : "♡"}
                        </button>
                    </div>
                </div>
            </article>
        </div>
    `;
}

function renderHome() {
    const grid = document.querySelector("#movieGrid");

    if (!grid) {
        return;
    }

    renderMovies(movies);

    const searchForm = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#searchInput");
    const resultText = document.querySelector("#resultText");

    if (!searchForm || !searchInput) {
        return;
    }

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const query = searchInput.value.toLowerCase().trim();

        const found = movies.filter(function (movie) {
            return (
                movie.title.toLowerCase().includes(query) ||
                movie.genre.join(" ").toLowerCase().includes(query)
            );
        });

        renderMovies(found);

        if (resultText) {
            resultText.textContent = query
                ? `${found.length} resultado(s) para "${query}".`
                : "Explora algunas opciones para empezar.";
        }
    });
}

function renderMovies(movieArray) {
    const grid = document.querySelector("#movieGrid");

    if (!grid) {
        return;
    }

    if (movieArray.length > 0) {
        grid.innerHTML = movieArray.map(card).join("");
    } else {
        grid.innerHTML = `
            <div class="col-12">
                <div class="empty">
                    No encontramos películas con esa búsqueda.
                </div>
            </div>
        `;
    }

    bindSave();
}

function bindSave() {
    document.querySelectorAll(".save-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const id = Number(button.dataset.id);
            const list = getList();

            let nextList;

            if (list.includes(id)) {
                nextList = list.filter(function (movieId) {
                    return movieId !== id;
                });
            } else {
                nextList = [...list, id];
            }

            saveList(nextList);

            const saved = nextList.includes(id);

            button.innerHTML = saved ? "♥" : "♡";

            button.classList.toggle("btn-danger", saved);
            button.classList.toggle("btn-outline-danger", !saved);

            showToast(
                saved
                    ? "Película agregada a Mi lista"
                    : "Película eliminada de Mi lista"
            );
        });
    });
}

function renderDetail() {
    const box = document.querySelector("#movieDetail");

    if (!box) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id")) || 1;

    const movie = movies.find(function (item) {
        return item.id === id;
    }) || movies[0];

    const saved = getList().includes(movie.id);

    box.innerHTML = `
        <div class="col-lg-5">
            <img 
                class="detail-poster" 
                src="${movie.poster}" 
                alt="Portada de ${movie.title}"
            >
        </div>

        <div class="col-lg-7">
            <p class="text-danger fw-bold">
                DETALLES DE LA PELÍCULA
            </p>

            <h1 class="display-4 fw-bold">
                ${movie.title}
            </h1>

            <p class="lead text-secondary">
                ${movie.year} · ${movie.genre.join(" · ")} · 
                <span class="rating">★ ${movie.rating}</span>
            </p>

            <div class="mb-3">
                ${movie.genre.map(function (genre) {
                    return `<span class="pill">${genre}</span>`;
                }).join("")}
            </div>

            <p class="fs-5 text-secondary">
                ${movie.description}
            </p>

            <button 
                id="detailSave" 
                class="btn ${saved ? "btn-danger" : "btn-outline-danger"} btn-lg"
                type="button"
            >
                ${saved ? "♥ En mi lista" : "♡ Agregar a mi lista"}
            </button>

            <a 
                href="index.html" 
                class="btn btn-outline-light btn-lg ms-2"
            >
                Volver
            </a>
        </div>
    `;

    const detailSave = document.querySelector("#detailSave");

    if (detailSave) {
        detailSave.addEventListener("click", function () {
            const list = getList();

            let nextList;

            if (list.includes(movie.id)) {
                nextList = list.filter(function (id) {
                    return id !== movie.id;
                });
            } else {
                nextList = [...list, movie.id];
            }

            saveList(nextList);

            showToast(
                nextList.includes(movie.id)
                    ? "Película agregada a Mi lista"
                    : "Película eliminada de Mi lista"
            );

            renderDetail();
        });
    }
}

function renderList() {
    const grid = document.querySelector("#listGrid");

    if (!grid) {
        return;
    }

    const list = getList();

    const savedMovies = movies.filter(function (movie) {
        return list.includes(movie.id);
    });

    if (savedMovies.length > 0) {
        grid.innerHTML = savedMovies.map(card).join("");
    } else {
        grid.innerHTML = `
            <div class="col-12">
                <div class="empty">
                    <div class="fs-1 mb-2">🎞️</div>

                    <h2 class="h4">
                        Tu lista está vacía
                    </h2>

                    <p>
                        Agrega películas desde Inicio o desde su página de detalles.
                    </p>

                    <a class="btn btn-danger" href="index.html">
                        Explorar películas
                    </a>
                </div>
            </div>
        `;
    }

    bindSave();
}

function showToast(text) {
    const element = document.createElement("div");

    element.className =
        "toast-msg alert alert-dark border-secondary shadow";

    element.textContent = text;

    document.body.appendChild(element);

    setTimeout(function () {
        element.remove();
    }, 2200);
}

document.addEventListener("DOMContentLoaded", function () {
    updateBadge();
    renderHome();
    renderDetail();
    renderList();
});
