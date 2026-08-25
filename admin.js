/* =====================================================
   SABANA CAKE STUDIO
   ADMIN PANEL
===================================================== */


/* ================= DATA ================= */

function getCakes() {

    const saved =
        localStorage.getItem("sabanaCakes");

    if (saved) {

        return JSON.parse(saved);

    }

    const defaults = [

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

    localStorage.setItem(
        "sabanaCakes",
        JSON.stringify(defaults)
    );

    return defaults;
}


function saveCakes(cakes) {

    localStorage.setItem(
        "sabanaCakes",
        JSON.stringify(cakes)
    );

}


/* ================= VARIABLES ================= */

let cakes = getCakes();

let editingId = null;


/* ================= DOM ================= */

const cakeForm =
    document.getElementById("cakeForm");

const cakeId =
    document.getElementById("cakeId");

const cakeName =
    document.getElementById("cakeName");

const cakeCategory =
    document.getElementById("cakeCategory");

const cakePrice =
    document.getElementById("cakePrice");

const cakeDescription =
    document.getElementById("cakeDescription");

const cakeImage =
    document.getElementById("cakeImage");

const cakeList =
    document.getElementById("adminCakeList");

const emptyState =
    document.getElementById("emptyState");

const saveBtn =
    document.getElementById("saveBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const formTitle =
    document.getElementById("formTitle");

const totalCakes =
    document.getElementById("totalCakes");

const averagePrice =
    document.getElementById("averagePrice");

const totalCategories =
    document.getElementById("totalCategories");

const clearBtn =
    document.getElementById("clearBtn");


/* ================= DASHBOARD ================= */

function updateDashboard() {

    totalCakes.textContent =
        cakes.length;


    if (cakes.length === 0) {

        averagePrice.textContent = "₹0";

    } else {

        const total =
            cakes.reduce(
                (sum, cake) =>
                    sum + Number(cake.price),
                0
            );

        const average =
            Math.round(
                total / cakes.length
            );

        averagePrice.textContent =
            "₹" +
            average.toLocaleString("en-IN");

    }


    const categories =
        new Set(
            cakes.map(
                cake => cake.category
            )
        );

    totalCategories.textContent =
        categories.size;

}


/* ================= RENDER ================= */

function renderAdminCakes() {

    updateDashboard();


    if (cakes.length === 0) {

        cakeList.innerHTML = "";

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    cakeList.innerHTML = cakes.map(
        cake => createAdminCard(cake)
    ).join("");

}


/* ================= ADMIN CARD ================= */

function createAdminCard(cake) {

    const category =
        cake.category.charAt(0).toUpperCase()
        + cake.category.slice(1);

    return `

        <div class="admin-cake-item">

            <div class="admin-cake-image">

                <img
                    src="${escapeHTML(cake.image)}"
                    alt="${escapeHTML(cake.name)}"
                    onerror="this.style.opacity='0.3'"
                >

            </div>


            <div class="admin-cake-details">

                <span class="admin-cake-category">
                    ${category}
                </span>

                <h3>
                    ${escapeHTML(cake.name)}
                </h3>

                <p>
                    ${escapeHTML(cake.description)}
                </p>

                <span class="admin-cake-price">
                    ₹${Number(cake.price).toLocaleString("en-IN")}
                </span>

            </div>


            <div class="item-actions">

                <button
                    class="edit-btn"
                    onclick="editCake(${cake.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteCake(${cake.id})"
                >
                    Delete
                </button>

            </div>

        </div>

    `;

}


/* ================= ADD / EDIT ================= */

cakeForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            cakeName.value.trim();

        const category =
            cakeCategory.value;

        const price =
            Number(cakePrice.value);

        const description =
            cakeDescription.value.trim();

        const image =
            cakeImage.value.trim();


        if (
            !name ||
            !category ||
            !price ||
            !description ||
            !image
        ) {

            alert(
                "Please fill all fields."
            );

            return;

        }


        /* EDIT */

        if (editingId !== null) {

            const index =
                cakes.findIndex(
                    cake =>
                        cake.id === editingId
                );

            if (index !== -1) {

                cakes[index] = {

                    ...cakes[index],

                    name,
                    category,
                    price,
                    description,
                    image

                };

            }


            alert(
                "Cake updated successfully! 🍰"
            );

        }


        /* ADD */

        else {

            const newCake = {

                id:
                    Date.now(),

                name,
                category,
                price,
                description,
                image

            };


            cakes.push(newCake);


            alert(
                "Cake added successfully! 🎂"
            );

        }


        saveCakes(cakes);

        resetForm();

        renderAdminCakes();

    }
);


/* ================= EDIT ================= */

function editCake(id) {

    const cake =
        cakes.find(
            item => item.id === id
        );

    if (!cake) return;


    editingId = id;


    cakeId.value =
        cake.id;

    cakeName.value =
        cake.name;

    cakeCategory.value =
        cake.category;

    cakePrice.value =
        cake.price;

    cakeDescription.value =
        cake.description;

    cakeImage.value =
        cake.image;


    formTitle.textContent =
        "Edit Cake";

    saveBtn.textContent =
        "Save Changes";

    cancelBtn.style.display =
        "inline-block";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ================= DELETE ================= */

function deleteCake(id) {

    const cake =
        cakes.find(
            item => item.id === id
        );

    if (!cake) return;


    const confirmDelete =
        confirm(
            `Delete "${cake.name}"?`
        );


    if (!confirmDelete) {
        return;
    }


    cakes =
        cakes.filter(
            item => item.id !== id
        );


    saveCakes(cakes);

    renderAdminCakes();


    if (editingId === id) {

        resetForm();

    }

}


/* ================= CLEAR ALL ================= */

clearBtn.addEventListener(
    "click",
    function() {

        if (cakes.length === 0) {

            alert(
                "There are no cakes to clear."
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete ALL cakes?"
            );


        if (!confirmed) {
            return;
        }


        cakes = [];


        saveCakes(cakes);

        resetForm();

        renderAdminCakes();

    }
);


/* ================= CANCEL ================= */

cancelBtn.addEventListener(
    "click",
    resetForm
);


function resetForm() {

    editingId = null;

    cakeForm.reset();

    cakeId.value = "";

    formTitle.textContent =
        "Add New Cake";

    saveBtn.textContent =
        "+ Add Cake";

    cancelBtn.style.display =
        "none";

}


/* ================= ESCAPE ================= */

function escapeHTML(value) {

    return String(value)

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


/* ================= STORAGE UPDATE ================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "sabanaCakes"
        ) {

            cakes =
                getCakes();

            renderAdminCakes();

        }

    }
);


/* ================= INITIAL ================= */

renderAdminCakes();