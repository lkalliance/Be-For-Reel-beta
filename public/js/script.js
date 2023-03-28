$(document).ready(() => {
    const spinner = $('#spinner');

    spinner.toggleClass("hidden", true);

    $('body').on("click", "a", (e) => {
        console.log(e.currentTarget.href);
        if (e.currentTarget.href.indexOf("polls/vote") >= 0) {
            console.log("SPINNER!");
            spinner.toggleClass("hidden", false);
        }
    })
})
