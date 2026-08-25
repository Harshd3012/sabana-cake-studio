/* =====================================================
   SABANA CAKE STUDIO
   CUSTOMER WEBSITE
===================================================== */


/* ================= WHATSAPP NUMBER ================= */

const WHATSAPP_NUMBER = "919999999999";


/* ================= DEFAULT CAKES ================= */

const defaultCakes = [

    {
        id: 1,
        name: "Chocolate Truffle Cake",
        category: "birthday",
        price: 899,
        description:
            "Rich chocolate cake layered with creamy chocolate ganache.",
        image: "images/chocolate-truffle.jpeg"
    },

    {
        id: 2,
        name: "Red Velvet Cake",
        category: "anniversary",
        price: 999,
        description:
            "Soft red velvet sponge with smooth cream cheese frosting.",
        image: "images/Red Velvet Cake.jpg"
    },

    {
        id: 3,
        name: "Vanilla Berry Cake",
        category: "custom",
        price: 799,
        description:
            "Light vanilla sponge with fresh berries and creamy frosting.",
        image: "images/Vannella Pestry.jpg"
    },

    {
        id: 4,
        name: "Black Forest Cake",
        category: "birthday",
        price: 899,
        description:
            "Classic chocolate sponge with cherries and fresh cream.",
        image: "images/Black Forest.jpg"
    }

];


/* ================= GET CAKES ================= */

function getCakes() {

    const saved = localStorage.getItem("sabanaCakes");

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        "sabanaCakes",
        JSON.stringify(defaultCakes)
    );

    return defaultCakes;
}


/* ================= VARIABLES ================= */

let cakes = getCakes();

let selectedCategory = "all";


/* ================= DOM ================= */

const cakeGrid =
    document.getElementById("cakeGrid");

const cakeSearch =
    document.getElementById("cakeSearch");

const cakeSort =
    document.getElementById("cakeSort");

const cakeCount =
    document.getElementById("cakeCount");

const noResults =
    document.getElementById("noResults");


/* ================= RENDER ================= */

function renderCakes() {

    let filtered = [...cakes];


    /* SEARCH */

    const searchText =
        cakeSearch.value
            .toLowerCase()
            .trim();

    if (searchText) {

        filtered = filtered.filter(cake =>
            cake.name
                .toLowerCase()
                .includes(searchText)
        );

    }


    /* CATEGORY */

    if (selectedCategory !== "all") {

        filtered = filtered.filter(
            cake =>
                cake.category === selectedCategory
        );

    }


    /* SORT */

    switch (cakeSort.value) {

        case "low":

            filtered.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "high":

            filtered.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "az":

            filtered.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

            break;


        case "za":

            filtered.sort(
                (a, b) =>
                    b.name.localeCompare(a.name)
            );

            break;

    }


    /* COUNT */

    cakeCount.textContent =
        `Showing ${filtered.length} cake${filtered.length !== 1 ? "s" : ""}`;


    /* EMPTY */

    if (filtered.length === 0) {

        cakeGrid.innerHTML = "";

        noResults.style.display = "block";

        return;

    }

    noResults.style.display = "none";


    /* CARDS */

    cakeGrid.innerHTML =
        filtered.map(cake => createCakeCard(cake)).join("");

}


/* ================= CREATE CARD ================= */

function createCakeCard(cake) {

    const category =
        cake.category.charAt(0).toUpperCase()
        + cake.category.slice(1);

    return `

        <div class="cake-card">

            <div class="cake-image">

                <img
                    src="${cake.image}"
                    alt="${escapeHTML(cake.name)}"
                    onerror="this.src='images/chocolate-truffle.jpeg'"
                >

            </div>


            <div class="cake-info">

                <span class="cake-style">
                    ${category}
                </span>


                <h3>
                    ${escapeHTML(cake.name)}
                </h3>


                <p>
                    ${escapeHTML(cake.description)}
                </p>


                <div class="cake-bottom">

                    <strong>
                        ₹${Number(cake.price).toLocaleString("en-IN")}
                    </strong>


                    <button
                        class="order-btn"
                        onclick="orderCake('${escapeHTML(cake.name)}', ${cake.price})"
                    >
                        Order
                    </button>

                </div>

            </div>

        </div>

    `;

}


/* ================= SEARCH ================= */

if (cakeSearch) {

    cakeSearch.addEventListener(
        "input",
        renderCakes
    );

}


/* ================= SORT ================= */

if (cakeSort) {

    cakeSort.addEventListener(
        "change",
        renderCakes
    );

}


/* ================= FILTER ================= */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                selectedCategory =
                    button.dataset.category;

                renderCakes();

            }
        );

    });


/* ================= ORDER CAKE ================= */

function orderCake(name, price) {

    const message =
        `Hello Sabana Cake Studio!%0A%0A` +
        `I would like to order:%0A` +
        `Cake: ${encodeURIComponent(name)}%0A` +
        `Price: ₹${price}%0A%0A` +
        `Please share the available options.`;

    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
    );

}


/* ================= CUSTOM ORDER ================= */

function orderCustomCake() {

    const message =
        "Hello Sabana Cake Studio!%0A%0A" +
        "I want to discuss a custom cake.";

    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
    );

}


/* ================= ESCAPE HTML ================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================= INITIAL LOAD ================= */

renderCakes();


/* ================= AUTO REFRESH ================= */

window.addEventListener(
    "storage",
    event => {

        if (event.key === "sabanaCakes") {

            cakes = getCakes();

            renderCakes();

        }

    }
);