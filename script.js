/* ==========================================
   SABANA CAKE STUDIO
   MAIN WEBSITE JAVASCRIPT
========================================== */


/* ==========================================
   DEFAULT CAKES
========================================== */

const defaultCakes = [

    {
        id: 1,
        name: "Chocolate Truffle Cake",
        category: "birthday",
        price: 899,
        description:
            "Rich chocolate cake layered with creamy chocolate ganache.",
        image: "chocolate-truffle.jpeg"
    },

    {
        id: 2,
        name: "Red Velvet Cake",
        category: "anniversary",
        price: 999,
        description:
            "Soft red velvet sponge with smooth cream cheese frosting.",
        image: "Red Velvet Cake.jpg"
    },

    {
        id: 3,
        name: "Vanilla Berry Cake",
        category: "celebration",
        price: 799,
        description:
            "Light vanilla sponge with fresh berries and creamy frosting.",
        image: "Vannella Pestry.jpg"
    },

    {
        id: 4,
        name: "Black Forest Cake",
        category: "birthday",
        price: 849,
        description:
            "Classic chocolate sponge with cherries and whipped cream.",
        image: "Black Forest.jpg"
    }

];


/* ==========================================
   LOAD CAKES
========================================== */

function getCakes() {

    const saved =
        localStorage.getItem("sabanaCakes");

    if (saved) {

        return JSON.parse(saved);

    }

    localStorage.setItem(
        "sabanaCakes",
        JSON.stringify(defaultCakes)
    );

    return defaultCakes;
}


/* ==========================================
   VARIABLES
========================================== */

let cakes = getCakes();

let selectedCategory = "all";


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


/* ==========================================
   DISPLAY CAKES
========================================== */

function displayCakes() {

    const searchText =
        cakeSearch.value
            .toLowerCase()
            .trim();


    let filtered =
        cakes.filter(cake => {

            const matchesSearch =
                cake.name
                    .toLowerCase()
                    .includes(searchText) ||

                cake.description
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||

                cake.category === selectedCategory;


            return matchesSearch &&
                   matchesCategory;

        });


    /* SORT */

    const sortValue =
        cakeSort.value;


    if (sortValue === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortValue === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sortValue === "az") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    if (sortValue === "za") {

        filtered.sort(
            (a, b) =>
                b.name.localeCompare(a.name)
        );

    }


    /* COUNT */

    cakeCount.textContent =
        `Showing ${filtered.length} cakes`;


    /* CLEAR */

    cakeGrid.innerHTML = "";


    /* NO RESULTS */

    if (filtered.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    /* CREATE CARDS */

    filtered.forEach(cake => {

        const card =
            document.createElement("div");

        card.className =
            "cake-card";


        card.innerHTML = `

            <div class="cake-image">

                <img
                    src="${cake.image}"
                    alt="${cake.name}"
                    onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'height:100%;display:flex;align-items:center;justify-content:center;font-size:50px\\'>🍰</div>';"
                >

            </div>


            <div class="cake-info">

                <span class="cake-style">
                    ${formatCategory(cake.category)}
                </span>

                <h3>
                    ${cake.name}
                </h3>

                <p>
                    ${cake.description}
                </p>


                <div class="cake-bottom">

                    <strong>
                        ₹${Number(cake.price).toLocaleString("en-IN")}
                    </strong>


                    <button
                        class="order-button"
                        onclick="orderCake('${escapeQuotes(cake.name)}', ${cake.price})"
                    >
                        Order
                    </button>

                </div>

            </div>

        `;


        cakeGrid.appendChild(card);

    });

}


/* ==========================================
   CATEGORY FORMAT
========================================== */

function formatCategory(category) {

    if (!category) {
        return "Cake";
    }

    return category
        .charAt(0)
        .toUpperCase() +
        category.slice(1);

}


/* ==========================================
   ESCAPE
========================================== */

function escapeQuotes(text) {

    return String(text)
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');

}


/* ==========================================
   ORDER CAKE
========================================== */

function orderCake(name, price) {

    const phone =
        "919999999999";

    const message =
        `Hello Sabana Cake Studio!%0A%0AI would like to order:%0A%0ACake: ${name}%0APrice: ₹${price}%0A%0APlease share availability and details.`;

    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

}


/* ==========================================
   CUSTOM CAKE
========================================== */

function orderCustomCake() {

    const phone =
        "919999999999";

    const message =
        "Hello Sabana Cake Studio! I would like to discuss a custom cake.";

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );

}


/* ==========================================
   SEARCH
========================================== */

if (cakeSearch) {

    cakeSearch.addEventListener(
        "input",
        displayCakes
    );

}


/* ==========================================
   SORT
========================================== */

if (cakeSort) {

    cakeSort.addEventListener(
        "change",
        displayCakes
    );

}


/* ==========================================
   FILTER BUTTONS
========================================== */

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


                displayCakes();

            }
        );

    });


/* ==========================================
   INITIAL LOAD
========================================== */

displayCakes();


/* ==========================================
   AUTO REFRESH
========================================== */

window.addEventListener(
    "storage",
    () => {

        cakes = getCakes();

        displayCakes();

    }
);