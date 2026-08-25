/* =====================================================
   SABANA CAKE STUDIO
   MAIN WEBSITE JAVASCRIPT
===================================================== */


/* ================= DEFAULT CAKES ================= */

const defaultCakes = [

    {
        id: 1,
        name: "Chocolate Truffle Cake",
        category: "birthday",
        price: 899,
        description: "Rich chocolate cake covered with smooth chocolate truffle.",
        image: "images/chocolate-truffle.jpeg"
    },

    {
        id: 2,
        name: "Red Velvet Cake",
        category: "birthday",
        price: 999,
        description: "Soft red velvet layers with creamy and delicious frosting.",
        image: "images/Red Velvet Cake.jpg"
    },

    {
        id: 3,
        name: "Vanilla Pastry Cake",
        category: "custom",
        price: 749,
        description: "Light vanilla sponge layered with smooth creamy frosting.",
        image: "images/Vannella Pestry.jpg"
    },

    {
        id: 4,
        name: "Black Forest Cake",
        category: "anniversary",
        price: 899,
        description: "Classic chocolate sponge with cream and cherry filling.",
        image: "images/Black Forest.jpg"
    }

];


/* ================= GET CAKES ================= */

function getCakes() {

    const saved =
        localStorage.getItem("sabanaCakes");

    if (!saved) {

        localStorage.setItem(
            "sabanaCakes",
            JSON.stringify(defaultCakes)
        );

        return defaultCakes;

    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(error);

        return defaultCakes;

    }

}


/* ================= VARIABLES ================= */

let cakes = getCakes();

let currentCategory = "all";

let currentSearch = "";

let currentSort = "default";


/* ================= ELEMENTS ================= */

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

    if (currentSearch) {

        filtered = filtered.filter(cake =>

            cake.name
                .toLowerCase()
                .includes(currentSearch.toLowerCase())

            ||

            cake.category
                .toLowerCase()
                .includes(currentSearch.toLowerCase())

            ||

            cake.description
                .toLowerCase()
                .includes(currentSearch.toLowerCase())

        );

    }


    /* CATEGORY */

    if (currentCategory !== "all") {

        filtered = filtered.filter(

            cake =>
                cake.category.toLowerCase()
                === currentCategory.toLowerCase()

        );

    }


    /* SORT */

    if (currentSort === "low") {

        filtered.sort(
            (a, b) =>
                Number(a.price) - Number(b.price)
        );

    }


    if (currentSort === "high") {

        filtered.sort(
            (a, b) =>
                Number(b.price) - Number(a.price)
        );

    }


    if (currentSort === "az") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    if (currentSort === "za") {

        filtered.sort(
            (a, b) =>
                b.name.localeCompare(a.name)
        );

    }


    /* COUNT */

    cakeCount.textContent =
        `Showing ${filtered.length} cake${filtered.length !== 1 ? "s" : ""}`;


    /* CLEAR */

    cakeGrid.innerHTML = "";


    /* NO RESULT */

    if (filtered.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    /* CREATE CARDS */

    filtered.forEach(cake => {

        const card =
            document.createElement("div");

        card.className = "cake-card";


        card.innerHTML = `

            <img
                class="cake-image"
                src="${escapeHTML(cake.image)}"
                alt="${escapeHTML(cake.name)}"
                onerror="this.src='images/chocolate-truffle.jpeg'"
            >

            <div class="cake-info">

                <div class="cake-category">
                    ${escapeHTML(cake.category)}
                </div>

                <h3 class="cake-name">
                    ${escapeHTML(cake.name)}
                </h3>

                <p class="cake-description">
                    ${escapeHTML(cake.description)}
                </p>

                <div class="cake-bottom">

                    <div class="cake-price">
                        ₹${Number(cake.price).toLocaleString("en-IN")}
                    </div>

                    <button
                        class="order-small"
                        onclick="orderCake('${escapeAttribute(cake.name)}', '${cake.price}')"
                    >
                        Order
                    </button>

                </div>

            </div>

        `;


        cakeGrid.appendChild(card);

    });

}


/* ================= SEARCH ================= */

if (cakeSearch) {

    cakeSearch.addEventListener(
        "input",
        function () {

            currentSearch =
                this.value.trim();

            renderCakes();

        }
    );

}


/* ================= SORT ================= */

if (cakeSort) {

    cakeSort.addEventListener(
        "change",
        function () {

            currentSort =
                this.value;

            renderCakes();

        }
    );

}


/* ================= FILTER ================= */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                this.classList.add("active");


                currentCategory =
                    this.dataset.category;


                renderCakes();

            }
        );

    });


/* ================= WHATSAPP ================= */

function orderCake(name, price) {

    const phone =
        "919999999999";

    const message =
        `Hello Sabana Cake Studio! I would like to order "${name}" priced at ₹${price}.`;

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


function orderCustomCake() {

    const phone =
        "919999999999";

    const message =
        "Hello Sabana Cake Studio! I want to discuss a custom cake.";

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


/* ================= SECURITY HELPERS ================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

    return String(value)
        .replaceAll("\\", "\\\\")
        .replaceAll("'", "\\'")
        .replaceAll('"', '\\"');

}


/* ================= INITIAL LOAD ================= */

renderCakes();