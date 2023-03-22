const btnSearch = document.querySelector("#submit-text");
const btnNoms = document.querySelector("#submit-year");
const title = document.querySelector("#input-film");
const results = document.querySelector("#results");
const yearMenu = document.querySelector("#year-menu");

const today = new Date()
const startYear = today.getFullYear();
for (let i = startYear; i >=1927; i--) {
    const opt = document.createElement("option");
    opt.textContent=i;
    opt.value=i;
    yearMenu.appendChild(opt);
}

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    searchMovie();
})

btnNoms.addEventListener("click", (e) => {
    e.preventDefault();
    getNominees();
})

function searchMovie() {

    removeChildren(results);
    fetch(`api/movies/search/${title.value}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const movies = data.results;
            movies.sort((a, b) => {
                return (a.title < b.title) ? -1 : (b.title < a.title) ? 1 : 0;
            })

            for (movie of movies) {
                const p = document.createElement("P");
                const info_link = document.createElement("A");
                const imdb_link = document.createElement("A");
                imdb_link.target = "_blank";
                imdb_link.href = `https://www.imdb.com/title/${movie.id}`;
                info_link.href = `/api/movies/info/${movie.id}`;
                imdb_link.textContent = 'view on IMDb';
                info_link.textContent = `${removeNumerals(movie.title)}`
                p.appendChild(info_link);
                p.appendChild(document.createElement("br"));
                p.appendChild(imdb_link);
                results.appendChild(p);

                info_link.id=`${movie.id}`;
                info_link.addEventListener("click", getMoreInfo);

            }
        })
    title.value = "";

}

function getNominees() {

    removeChildren(results);
    fetch(`api/movies/noms/${yearMenu.value}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const movies = data.results;
            movies.sort((a, b) => {
                return (a.title < b.title) ? -1 : (b.title < a.title) ? 1 : 0;
            })

            console.log(movies);

            for (movie of movies) {
                const p = document.createElement("P");
                const info_link = document.createElement("A");
                const imdb_link = document.createElement("A");
                imdb_link.target = "_blank";
                imdb_link.href = `https://www.imdb.com/title/${movie.id}`;
                info_link.href = `/api/movies/info/${movie.id}`;
                imdb_link.textContent = 'view on IMDb';
                info_link.textContent = `${removeNumerals(movie.title)}`
                p.appendChild(info_link);
                p.appendChild(document.createElement("br"));
                p.appendChild(imdb_link);
                results.appendChild(p);

                info_link.id=`${movie.id}`;
                info_link.addEventListener("click", getMoreInfo);

            }
        })
    title.value = "";

}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeNumerals(string) {
    return string.replace(" (I)", "");
}

async function getMoreInfo(e) {
    e.preventDefault();
    fetch(`${e.target.href}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const pic = document.createElement("IMG");
            const plot = document.createElement("SPAN");
            const awards = document.createElement("SPAN");
            const director = document.createElement("SPAN");
            const actors = document.createElement("SPAN");
            const wikipedia = document.createElement("A");
            const trailer = document.createElement("A");

            pic.width = "150";
            pic.src = `${data.image}`;
            plot.textContent = `${data.plot} - `;
            awards.textContent = `${data.awards} - `;
            director.textContent = `Directed by ${data.directors} - `;
            actors.textContent = `Starring ${data.actorList[0].name}, ${data.actorList[1].name} - `;
            wikipedia.textContent = `Wikipedia`;
            wikipedia.href = `${data.wikipedia.url}`;
            wikipedia.target = "_blank"
            trailer.textContent = `Trailer`;
            trailer.href = `${data.trailer.link}`
            trailer.target = "_blank";

            const parent = e.target.parentNode;

            parent.appendChild(pic);
            parent.appendChild(plot);
            parent.appendChild(awards);
            parent.appendChild(director);
            parent.appendChild(actors);
            parent.appendChild(wikipedia);
            parent.appendChild(trailer);

        })
}
