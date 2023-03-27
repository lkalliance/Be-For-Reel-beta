const tabs = [
    document.querySelector("#polls-tab"),
    document.querySelector("#comments-tab")
];

const content = [
    document.querySelector("#polls"),
    document.querySelector("#comments")
];

for (let i = 0; i < tabs.length; i++) {
    tabs[i].on("click", (e) => {
        e.preventDefault();

        for (let t = 0; t < tabs.length; t++) {
            if ( tabs[t] == e.target ) {
                tabs[t].className = 
            }
        }
    })
}