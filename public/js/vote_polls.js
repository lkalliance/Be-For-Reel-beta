$(document).ready(() => {
    // user is voting

    // get some containers
    const submitBtn = $('#submit');
    const commentText = $('#comment');
    const optionList = $('#option-list');
    const commentList = $('#comment-list');
    
    // initialize the selected and attach listeners
    let selected = 0;
    optionList.on("click", "h4", select);
    submitBtn.on("click", sendData);
    
    function select(e) {
        e.preventDefault();

        // highlight the right one
        const optionContainer = $(e.currentTarget.parentNode);
        $(optionList.children()).each((index, value) => {
            if ( value==optionContainer[0] ) {
                $(value).toggleClass('selected');
                selected = value.dataset.option;
            } else {
                $(value).toggleClass('selected', false);
            }
        })

        // enable or disable the form
        let oneSelected = false;
        $(optionList.children()).each((index, value) => {
            if ( $(value).hasClass('selected') ) oneSelected = true;
        })

        if ( !oneSelected ) selected = 0;
        submitBtn.attr('disabled', !oneSelected )        
    }

    async function sendData(e) {
        // user has clicked to submit
        e.preventDefault();

        // if there's no film selected, never mind
        if ( selected == 0 ) return;

        // collect the info and send it along
        const bodyObj = {
            option: selected,
            comment: commentText.val()
        }
        const fetchUrl = `/api/polls/vote/${selected}`;
        const fetchObj = {
            method: "POST",
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(fetchUrl, fetchObj);

        // refresh the page
        window.location.href=window.location.href;
    }
})
