const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
var list = [];

const searchItems = async searchText => {
    const res = await fetch("./data/items.json");
    const items = await res.json()
    let matches = items.filter(item => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return item.name.match(regex)
    });
    if (searchText.length === 0) {
        matches = []
        matchList.innerHTML = ""
    }
    outputHtml(matches)
    list = matches;
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${match.name}</li>
        </ul>
       `).join("")
        matchList.innerHTML = html;
    }
}


matchList.addEventListener("mousedown", function(e) {
    console.log("click happening");
    search.value = $(e.target).text();
    $("#match-list").hide();
});

search.addEventListener("input", () => searchItems(search.value));