const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

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
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
       <div class="card card-body mb-1">
        <h4>${match.name}</h4>
       </div>
       `).join("")
        matchList.innerHTML = html;
    }
}

search.addEventListener("input", () => searchItems(search.value));