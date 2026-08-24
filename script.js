/* =====================================================
   SABANA CAKE STUDIO
   MAIN WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   CAKE DATABASE
===================================================== */

const cakes = [

    {
        name: "Chocolate Truffle Cake",
        category: "birthday",
        categoryName: "Birthday",
        price: 899,
        image: "images/chocolate-truffle.jpeg",
        description:
            "Rich chocolate cake layered with creamy chocolate ganache."
    },


    {
        name: "Red Velvet Cake",
        category: "anniversary",
        categoryName: "Anniversary",
        price: 999,
        image: "images/Red Velvet Cake.jpg",
        description:
            "Soft red velvet sponge with smooth cream cheese frosting."
    },


    {
        name: "Vanilla Berry Cake",
        category: "custom",
        categoryName: "Custom",
        price: 799,
        image: "images/Vannella Pestry.jpg",
        description:
            "Light vanilla sponge with fresh berries and creamy frosting."
    },


    {
        name: "Black Forest Cake",
        category: "birthday",
        categoryName: "Birthday",
        price: 849,
        image: "images/Black Forest.jpg",
        description:
            "Classic chocolate sponge with cherries, cream and chocolate."
    }

];


/* =====================================================
   WHATSAPP NUMBER
===================================================== */

/*
   IMPORTANT:

   Yahan apna WhatsApp number daalna.

   Example:

   const WHATSAPP_NUMBER = "919876543210";

   Country code ke saath number likhna.
*/

const WHATSAPP_NUMBER = "91XXXXXXXXXX";



/* =====================================================
   VARIABLES
===================================================== */

let currentCategory = "all";

let currentSearch = "";

let currentSort = "default";


/* =====================================================
   DOM ELEMENTS
===================================================== */

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


const filterButtons =
    document.querySelectorAll(".filter-btn");



/* =====================================================
   DISPLAY CAKES
===================================================== */

function displayCakes() {

    let filteredCakes = [...cakes];


    /* SEARCH */

    if (currentSearch.trim() !== "") {

        const search =
            currentSearch.toLowerCase().trim();


        filteredCakes =
            filteredCakes.filter(cake =>

                cake.name
                    .toLowerCase()
                    .includes(search)

                ||

                cake.description
                    .toLowerCase()
                    .includes(search)

                ||

                cake.categoryName
                    .toLowerCase()
                    .includes(search)

            );

    }



    /* CATEGORY */

    if (currentCategory !== "all") {

        filteredCakes =
            filteredCakes.filter(
                cake =>
                    cake.category === currentCategory
            );

    }



    /* SORT */

    switch (currentSort) {

        case "low":

            filteredCakes.sort(
                (a, b) =>
                    a.price - b.price
            );

            break;


        case "high":

            filteredCakes.sort(
                (a, b) =>
                    b.price - a.price
            );

            break;


        case "az":

            filteredCakes.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

            break;


        case "za":

            filteredCakes.sort(
                (a, b) =>
                    b.name.localeCompare(a.name)
            );

            break;

    }



    /* CLEAR GRID */

    cakeGrid.innerHTML = "";



    /* NO RESULTS */

    if (filteredCakes.length === 0) {

        noResults.classList.add("show");

        cakeCount.textContent =
            "Showing 0 cakes";

        return;

    }


    noResults.classList.remove("show");



    /* COUNT */

    cakeCount.textContent =
        `Showing ${filteredCakes.length} ${
            filteredCakes.length === 1
                ? "cake"
                : "cakes"
        }`;



    /* CREATE CARDS */

    filteredCakes.forEach(
        cake => {

            const card =
                document.createElement("div");

            card.className =
                "cake-card";


            card.innerHTML = `

                <div class="cake-image">

                    <img
                        src="${cake.image}"
                        alt="${cake.name}"
                        loading="lazy"
                    >

                </div>


                <div class="cake-info">

                    <span class="cake-style">
                        ${cake.categoryName}
                    </span>


                    <h3>
                        ${cake.name}
                    </h3>


                    <p>
                        ${cake.description}
                    </p>


                    <div class="cake-bottom">

                        <strong>
                            ₹${cake.price}
                        </strong>


                        <button
                            class="order-button"
                            onclick="orderCake('${escapeQuotes(cake.name)}', ${cake.price})"
                        >
                            WhatsApp
                        </button>

                    </div>

                </div>

            `;


            cakeGrid.appendChild(card);

        }
    );

}



/* =====================================================
   ESCAPE QUOTES
===================================================== */

function escapeQuotes(text) {

    return text
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}



/* =====================================================
   SEARCH
===================================================== */

if (cakeSearch) {

    cakeSearch.addEventListener(
        "input",
        function () {

            currentSearch =
                this.value;

            displayCakes();

        }
    );

}



/* =====================================================
   SORT
===================================================== */

if (cakeSort) {

    cakeSort.addEventListener(
        "change",
        function () {

            currentSort =
                this.value;

            displayCakes();

        }
    );

}



/* =====================================================
   CATEGORY FILTER
===================================================== */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {


                filterButtons.forEach(
                    btn =>
                        btn.classList.remove("active")
                );


                this.classList.add("active");


                currentCategory =
                    this.dataset.category;


                displayCakes();

            }
        );

    }
);



/* =====================================================
   ORDER CAKE
===================================================== */

function orderCake(
    cakeName,
    price
) {

    if (
        WHATSAPP_NUMBER ===
        "91XXXXXXXXXX"
    ) {

        alert(
            "Please add your WhatsApp number in script.js first."
        );

        return;

    }


    const message =
        `Hello Sabana Cake Studio!%0A%0A` +
        `I would like to order:%0A` +
        `Cake: ${cakeName}%0A` +
        `Price: ₹${price}%0A%0A` +
        `Please share the available options.`;



    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        url,
        "_blank"
    );

}



/* =====================================================
   CUSTOM CAKE ORDER
===================================================== */

function orderCustomCake() {

    if (
        WHATSAPP_NUMBER ===
        "91XXXXXXXXXX"
    ) {

        alert(
            "Please add your WhatsApp number in script.js first."
        );

        return;

    }


    const message =
        `Hello Sabana Cake Studio!%0A%0A` +
        `I want to discuss a custom cake.%0A` +
        `Please share the available options.`;



    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        url,
        "_blank"
    );

}



/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCakes();

    }
);