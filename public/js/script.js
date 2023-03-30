$(document).ready(() => {
    // script for the "loading" spinner
    const spinner = $('#spinner');

    // hide the spinner
    spinner.toggleClass("hidden", true);

    $('body').on("click", "a", (e) => {
        // if the user has clicke on any link to go to a poll,show it
        console.log(e.currentTarget.href);
        if (e.currentTarget.href.indexOf("polls/vote") >= 0) {
            console.log("SPINNER!");
            spinner.toggleClass("hidden", false);
        }
    })
})
