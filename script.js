/* ==================================================
   SABANA CAKE STUDIO
   MAIN WEBSITE
   ADMIN DATA CONNECTION
   ================================================== */


/* ================= SETTINGS ================= */

const STORAGE_KEY = "sabanaCakeProducts";


/*
    APNA ACTUAL WHATSAPP NUMBER
    YAHA BAAD MEIN CHANGE KARNA

    Example:
    917001767819

    91 = India country code
*/

const phoneNumber = "917001767819";



/* ================= STATE ================= */

let currentCategory = "all";

let allCakes = [];



/* ================= GET CAKES ================= */

function getCakes() {

    const savedData =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!savedData) {

        return [];

    }


    try {

        const cakes =
            JSON.parse(
                savedData
            );


        if (
            !Array.isArray(cakes)
        ) {

            return [];

        }


        return cakes;

    }
    catch (error) {

        console.error(
            "Could not load cakes:",
            error
        );

        return [];

    }

}



/* ================= LOAD WEBSITE ================= */

function loadCakes() {

    allCakes =
        getCakes();


    updateCakeListing();

}



/* ================= CREATE CAKE CARD ================= */

function createCakeCard(
    cake
) {


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "cake-card";


    card.dataset.category =
        cake.category || "custom";


    card.dataset.name =
        cake.name || "";


    card.dataset.price =
        Number(cake.price) || 0;



    const categoryName =
        capitalize(
            cake.category || "Custom"
        );


    const styleName =
        cake.style ||
        categoryName;


    card.innerHTML = `

        <div class="cake-image">

            <img
                src="${cake.image}"
                alt="${escapeHTML(cake.name)}"
                loading="lazy"
            >

        </div>


        <div class="cake-info">

            <span class="cake-style">
                ${escapeHTML(styleName)}
            </span>


            <h3>
                ${escapeHTML(cake.name)}
            </h3>


            <p>
                ${escapeHTML(cake.description)}
            </p>


            <div class="cake-details">

                <span>
                    ⚖️ ${escapeHTML(cake.weight)}
                </span>


                <span>
                    🍫 ${escapeHTML(cake.flavour)}
                </span>


                <span>
                    🎂 ${escapeHTML(categoryName)}
                </span>

            </div>


            <div class="cake-bottom">

                <strong>
                    ₹${Number(cake.price).toLocaleString("en-IN")}
                </strong>


                <button
                    class="whatsapp-order-btn"
                    data-id="${cake.id}"
                >
                    Order on WhatsApp
                </button>

            </div>

        </div>

    `;



    const orderButton =
        card.querySelector(
            ".whatsapp-order-btn"
        );


    orderButton.addEventListener(
        "click",
        function() {

            orderCake(
                cake
            );

        }
    );


    return card;

}



/* ================= RENDER CAKES ================= */

function renderCakes(
    cakes
) {


    const grid =
        document.getElementById(
            "cakeGrid"
        );


    grid.innerHTML =
        "";


    cakes.forEach(
        function(cake) {

            const card =
                createCakeCard(
                    cake
                );


            grid.appendChild(
                card
            );

        }
    );

}



/* ================= UPDATE LISTING ================= */

function updateCakeListing() {


    const searchInput =
        document.getElementById(
            "cakeSearch"
        );


    const sortSelect =
        document.getElementById(
            "cakeSort"
        );


    const searchText =
        searchInput
            .value
            .trim()
            .toLowerCase();


    const sortValue =
        sortSelect.value;



    /* ================= FILTER ================= */

    let filteredCakes =
        allCakes.filter(
            function(cake) {


                const category =
                    (
                        cake.category ||
                        "custom"
                    ).toLowerCase();


                const name =
                    (
                        cake.name ||
                        ""
                    ).toLowerCase();


                const description =
                    (
                        cake.description ||
                        ""
                    ).toLowerCase();


                const flavour =
                    (
                        cake.flavour ||
                        ""
                    ).toLowerCase();


                const style =
                    (
                        cake.style ||
                        ""
                    ).toLowerCase();


                const matchesCategory =
                    currentCategory === "all" ||
                    category === currentCategory;


                const matchesSearch =
                    searchText === "" ||

                    name.includes(
                        searchText
                    ) ||

                    description.includes(
                        searchText
                    ) ||

                    flavour.includes(
                        searchText
                    ) ||

                    style.includes(
                        searchText
                    );


                return (
                    matchesCategory &&
                    matchesSearch
                );

            }
        );



    /* ================= SORT ================= */

    if (
        sortValue === "low"
    ) {

        filteredCakes.sort(
            function(a, b) {

                return (
                    Number(a.price) -
                    Number(b.price)
                );

            }
        );

    }


    if (
        sortValue === "high"
    ) {

        filteredCakes.sort(
            function(a, b) {

                return (
                    Number(b.price) -
                    Number(a.price)
                );

            }
        );

    }


    if (
        sortValue === "az"
    ) {

        filteredCakes.sort(
            function(a, b) {

                return (
                    a.name || ""
                ).localeCompare(
                    b.name || ""
                );

            }
        );

    }


    if (
        sortValue === "za"
    ) {

        filteredCakes.sort(
            function(a, b) {

                return (
                    b.name || ""
                ).localeCompare(
                    a.name || ""
                );

            }
        );

    }



    /* ================= RENDER ================= */

    renderCakes(
        filteredCakes
    );



    /* ================= COUNT ================= */

    const count =
        document.getElementById(
            "cakeCount"
        );


    if (
        filteredCakes.length === 1
    ) {

        count.textContent =
            "Showing 1 cake";

    }
    else {

        count.textContent =
            "Showing " +
            filteredCakes.length +
            " cakes";

    }



    /* ================= NO RESULTS ================= */

    const noResults =
        document.getElementById(
            "noResults"
        );


    if (
        filteredCakes.length === 0
    ) {

        noResults.style.display =
            "block";

    }
    else {

        noResults.style.display =
            "none";

    }

}



/* ================= CATEGORY ================= */

function setCategory(
    category,
    button
) {


    currentCategory =
        category;


    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "active"
            );

        }
    );


    button.classList.add(
        "active"
    );


    updateCakeListing();

}



/* ================= WHATSAPP ORDER ================= */

function orderCake(
    cake
) {


    const message =
        `Hello! I would like to order:

Cake: ${cake.name}

Weight: ${cake.weight}

Flavour: ${cake.flavour}

Price: ₹${cake.price}

Please let me know the availability.`;


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappURL,
        "_blank"
    );

}



/* ================= CUSTOM ORDER ================= */

function orderCustomCake() {


    const message =
        "Hello! I would like to enquire about a custom cake.";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappURL,
        "_blank"
    );

}



/* ================= CAPITALIZE ================= */

function capitalize(
    text
) {


    if (!text) {

        return "";

    }


    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}



/* ================= ESCAPE HTML ================= */

function escapeHTML(
    text
) {


    return String(
        text || ""
    )

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );

}



/* ================= EVENTS ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /*
            SEARCH
        */

        const searchInput =
            document.getElementById(
                "cakeSearch"
            );


        searchInput.addEventListener(
            "input",
            updateCakeListing
        );



        /*
            SORT
        */

        const sortSelect =
            document.getElementById(
                "cakeSort"
            );


        sortSelect.addEventListener(
            "change",
            updateCakeListing
        );



        /*
            FILTER BUTTONS
        */

        const filterButtons =
            document.querySelectorAll(
                ".filter-btn"
            );


        filterButtons.forEach(
            function(button) {


                button.addEventListener(
                    "click",
                    function() {


                        setCategory(
                            button.dataset.category,
                            button
                        );

                    }
                );

            }
        );



        /*
            LOAD ADMIN CAKES
        */

        loadCakes();

    }
);



/* ================= STORAGE UPDATE ================= */

/*
    Agar same browser mein
    Admin panel se cake add/delete
    kiya gaya, website ko update
    karne mein help karega.
*/

window.addEventListener(
    "storage",
    function(event) {


        if (
            event.key === STORAGE_KEY
        ) {

            loadCakes();

        }

    }
);