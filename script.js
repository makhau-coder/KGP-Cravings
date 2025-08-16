const URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT4U95ngo_l9XPFOMvjwTwmH3jZxVMOwH5Dgb8iedFq7ZI1UITs5B6hwOHlPxgKr9HZv8e6IAeeBwHR/pub?output=csv`;

const fetch_data = async () => {
    let response = await fetch(URL);
    let csvData = await response.text();

    // Split by lines
    let rows = csvData.split("\n").map(row => row.split(","));

    // First row is headers
    let headers = rows[0];
    let data = rows.slice(1).map(row => {
        let obj = {};
        headers.forEach((header, i) => {
            obj[header.trim()] = row[i] ? row[i].trim() : "";
        });
        return obj;
    });

    console.log("Parsed Data:", data);  // Array of objects
    return data;
};

const home_explore_cards_maker = async (data) => {
    const container = document.getElementById("Cards");
    container.innerHTML = ""; // clear old cards if any

    for (let i = 0; i < data.length && i < 50; i++) {
        const item = data[i];

        const card = document.createElement("div");
        card.classList.add("cards");

        card.innerHTML = `
            <div id="main_content">
                <span>
                    <h1>${item.Dish}</h1>
                </span>
                <button class="Price">₹${item.Price}</button>
                <button class="Restro_name">${item.Restro}</button>
            </div>
            <img src="images/Burger.png" alt="">
        `;

        container.appendChild(card); 
    }
};

const call_functions = async () => {
    let restaurants = await fetch_data();
    home_explore_cards_maker(restaurants);
};

call_functions();


window.addEventListener("scroll", () => {
    const navbar = document.getElementById("header");
    const triggerHeight = window.innerHeight * 0.8;

    if (window.scrollY > triggerHeight) {
        navbar.style.background = "rgba(0, 0, 0, 0.822)";
    } else {
        navbar.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(77,77,77,0.2))";
    }
});
