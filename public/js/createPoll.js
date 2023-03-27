$(document).ready(() => {

    const searchBtn = $('#searchBtn');
    const searchText = $('#searchField');
    const resultsDisplay = $('#search-results');
    const selectedDisplay = $('#selected');
    const titleText = $('#titleText');
    const titleLabel = $('#title-label');
    const descText = $('#descText');
    const savePollBtn = $('#savePollBtn');

    const selectedFilms = [];

    resultsDisplay.on("click", "li", select);
    selectedDisplay.on("click", "li", deselect);

    savePollBtn.on("click", savePoll);

    searchBtn.on("click", async (e) => {
        e.preventDefault();

        if( searchText.val() == "" ) return;

        clearWarning();
        clearNoResults();

        resultsDisplay.empty();
        const header = $('<li>', { class: "list-group-item fs-6", id: "results-header" });
        header.text("Search results");
        resultsDisplay.append(header);
        
        const searchUrl = `/api/movies/search/${searchText.val()}`;
        const movieData = await fetch(searchUrl);
        const result = await movieData.json();

        searchText.val("");

        if ( result.length == 0 ) {
            noResults();
        } else {

            for(movie of result) {
                if (!selectedFilms.includes(movie.id)) {
                    const title = `${movie.title} ${movie.description.replace('(I) ', '')}`;
                    const plot = movie.plot;
                    
                    const li = $('<li>', { id: `${movie.id}`, class: 'list-group-item fs-6'});
                    li.attr( 'data-image', movie.image );
                    const film = $('<h6>');
                    const cite = $('<cite>');
                    
                    film.text(title);
                    cite.text(plot);
                    
                    li.append(film);
                    li.append(cite);
                    
                    resultsDisplay.append(li);
                }
            }
        }
    })
        
    function select(e) {
        e.preventDefault();
        if( e.currentTarget.id == "results-header" || e.currentTarget.id == "selected-header" ) return;
        const selected = document.querySelector('#search-results').removeChild(e.currentTarget);
        selectedFilms.push({
            imdb_id: selected.id,
            image: selected.dataset.image,
            title: selected.getElementsByTagName("H6")[0].textContent
        });
        document.querySelector('#selected').appendChild(selected);
    }

    function deselect(e) {
        e.preventDefault();
        if( e.currentTarget.id == "results-header" || e.currentTarget.id == "selected-header" ) return;
        const selected = document.querySelector('#selected').removeChild(e.currentTarget);
        for (let i = 0; i < selectedFilms.length; i++ ) {
            if ( selectedFilms[i].imdb_id == selected.id ) {
                selectedFilms.splice(i, 1);
                break;
            }
        }
        document.querySelector('#search-results').appendChild(selected);
    }

    async function savePoll(e) {
        e.preventDefault();

        clearWarning();
        clearNoResults();

        resultsDisplay.empty();
        const header = $('<li>', { class: "list-group-item fs-6", id: "results-header" });
        header.text("Search results");
        resultsDisplay.append(header);

        const title = titleText.val();
        const desc = descText.val();
        const films = selectedFilms;

        if ( title == "" ) {
            warning("title");
            return;
        }

        if ( films.length < 2 ) {
            warning("films");
            return;
        }

        const bodyObj = {
            title,
            desc,
            films
        }

        const fetchObj = {
            method: "POST",
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        console.log(bodyObj);

        await fetch('/api/polls/create', fetchObj);

        window.location.href = "/polls/vote/1";
    }

    function warning(type) {
        if ( type == "title" ) {
            titleText.toggleClass("warning", true);
            titleLabel.toggleClass("warning", true);
            titleText.attr("placeholder", "Please provide a title");
        } else {
            selectedDisplay.toggleClass("warning", true);
            const wLi = $('<li>', { id: "warning", class: "list-group-item fs-6 warning" });
            wLi.text("Please select at least two films");
            selectedDisplay.append(wLi);
        }
    }

    function clearWarning() {
        titleText.toggleClass("warning", false);
        titleText.attr("placeholder", "(80 characters max)");
        titleLabel.toggleClass("warning", false);
        selectedDisplay.toggleClass("warning", false);
        $('#warning').remove();
    }

    function noResults() {
        const nLi = $('<li>', { id: "noResults", class: "list-group-item fs-6 warning" });
        nLi.text("Search returned no results");
        resultsDisplay.append(nLi);
    }

    function clearNoResults() {
        $('#noResults').remove();
    }
})

