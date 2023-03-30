$(document).ready(() => {
    // front-end javascript on create poll page

    // collect some containers
    const searchBtn = $('#searchBtn');
    const searchText = $('#searchField');
    const resultsDisplay = $('#search-results');
    const selectedDisplay = $('#selected');
    const titleText = $('#titleText');
    const titleLabel = $('#title-label');
    const descText = $('#descText');
    const savePollBtn = $('#savePollBtn');

    // initialize list of selected films
    const selectedFilms = [];

    // assign listeners
    resultsDisplay.on("click", "li", select);
    selectedDisplay.on("click", "li", deselect);
    savePollBtn.on("click", savePoll);
    searchBtn.on("click", async (e) => {
        // user has initiated a title search
        e.preventDefault();

        // if there is no text in the field, end here
        if( searchText.val() == "" ) return;
        // clear prior submit warnings
        clearWarning();
        clearNoResults();
        // delete the previous results
        resultsDisplay.empty();
        const header = $('<li>', { class: "list-group-item fs-6", id: "results-header" });
        header.text("Search results");
        resultsDisplay.append(header);
        
        // call our API to conduct the search
        const searchUrl = `/api/movies/search/${searchText.val()}`;
        const movieData = await fetch(searchUrl);
        const result = await movieData.json();
        searchText.val("");

        if ( result.length == 0 ) {
            noResults();
        } else {
            // iterate over the results
            for(movie of result) {
                // if the film is already in the selected list, skip it
                let alreadyFound = false;
                for (film of selectedFilms) {
                    if (movie.id == film.imdb_id) {
                        alreadyFound = true;
                    }
                }
                if (!alreadyFound) {
                    // craft the li and append it
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
        // user has clicked on a result
        e.preventDefault();

        // if user clicked on the header, never mind
        if( e.currentTarget.id == "results-header" || e.currentTarget.id == "selected-header" ) return;

        // move clicked film from search to selected, and record its data
        const selected = document.querySelector('#search-results').removeChild(e.currentTarget);
        selectedFilms.push({
            imdb_id: selected.id,
            image: selected.dataset.image,
            title: selected.getElementsByTagName("H6")[0].textContent
        });
        document.querySelector('#selected').appendChild(selected);
    }

    function deselect(e) {
        // user has clicked on an already-selected film
        e.preventDefault();

        // if user clicked the header, never mind
        if( e.currentTarget.id == "results-header" || e.currentTarget.id == "selected-header" ) return;

        // move clicked film from selected to search, and remove its data
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
        // user has clicked to save poll
        e.preventDefault();

        // clear all warnings and the search results
        clearWarning();
        clearNoResults();
        resultsDisplay.empty();
        const header = $('<li>', { class: "list-group-item fs-6", id: "results-header" });
        header.text("Search results");
        resultsDisplay.append(header);

        // assemble all the data
        const title = titleText.val();
        const desc = descText.val();
        const films = selectedFilms;

        // check to see there is a title and at least two selections
        if ( title == "" ) {
            warning("title");
            return;
        }
        if ( films.length < 2 ) {
            warning("films");
            return;
        }

        // prepare assets for the API, and send it
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
        const response = await fetch('/api/polls/create', fetchObj);
        const created = await response.json();

        // if poll successfully created, send user to its vote page
        if (response.status === 200) {
            window.location.href = `/polls/vote/${created.a}`;
        }
    }

    // utility furnctions for createing and remving a variety of alerts
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

