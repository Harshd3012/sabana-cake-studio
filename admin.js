/* =====================================================
   SABANA CAKE STUDIO
   ADMIN PANEL JAVASCRIPT
===================================================== */


/* ================= LOGIN CHECK ================= */

if (
    sessionStorage.getItem(
        "sabanaAdminLoggedIn"
    ) !== "true"
) {

    window.location.replace("login.html");

}


/* ================= ELEMENTS ================= */

const cakeForm =
    document.getElementById("cakeForm");

const cakeImage =
    document.getElementById("cakeImage");

const imagePreview =
    document.getElementById("imagePreview");

const adminCakeList =
    document.getElementById("adminCakeList");

const emptyState =
    document.getElementById("emptyState");

const totalCakes =
    document.getElementById("totalCakes");

const averagePrice =
    document.getElementById("averagePrice");

const totalCategories =
    document.getElementById("totalCategories");

const clearAllButton =
    document.getElementById("clearAllButton");

const logoutButton =
    document.getElementById("logoutButton");


/* ================= GET CAKES ================= */

function getCakes() {

    const saved =
        localStorage.getItem("sabanaCakes");

    if (!saved) {

        const defaults = [

            {
                id: 1,
                name: "Chocolate Truffle Cake",
                category: "birthday",
                price: 899,
                description:
                    "Rich chocolate cake covered with smooth chocolate truffle.",
                image:
                    "images/chocolate-truffle.jpeg"
            },

            {
                id: 2,
                name: "Red Velvet Cake",
                category: "birthday",
                price: 999,
                description:
                    "Soft red velvet layers with creamy and delicious frosting.",
                image:
                    "images/Red Velvet Cake.jpg"
            },

            {
                id: 3,
                name: "Vanilla Pastry Cake",
                category: "custom",
                price: 749,
                description:
                    "Light vanilla sponge layered with smooth creamy frosting.",
                image:
                    "images/Vannella Pestry.jpg"
            },

            {
                id: 4,
                name: "Black Forest Cake",
                category: "anniversary",
                price: 899,
                description:
                    "Classic chocolate sponge with cream and cherry filling.",
                image:
                    "images/Black Forest.jpg"
            }

        ];


        localStorage.setItem(
            "sabanaCakes",
            JSON.stringify(defaults)
        );


        return defaults;

    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(error);

        return [];

    }

}


/* ================= SAVE ================= */

function saveCakes(cakes) {

    localStorage.setItem(
        "sabanaCakes",
        JSON.stringify(cakes)
    );

}


/* ================= IMAGE PREVIEW ================= */

cakeImage.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {

            imagePreview.innerHTML = "";

            return;

        }


        if (!file.type.startsWith("image/")) {

            alert(
                "Please select an image file."
            );

            this.value = "";

            return;

        }


        const reader =
            new FileReader();


        reader.onload = function (event) {

            imagePreview.innerHTML = `

                <img
                    src="${event.target.result}"
                    alt="Preview"
                >

            `;

        };


        reader.readAsDataURL(file);

    }
);


/* ================= ADD CAKE ================= */

cakeForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("cakeName")
                .value
                .trim();


        const category =
            document
                .getElementById("cakeCategory")
                .value;


        const price =
            Number(
                document
                    .getElementById("cakePrice")
                    .value
            );


        const description =
            document
                .getElementById("cakeDescription")
                .value
                .trim();


        const file =
            cakeImage.files[0];


        if (
            !name ||
            !category ||
            !price ||
            !description ||
            !file
        ) {

            alert(
                "Please fill all fields and select an image."
            );

            return;

        }


        if (!file.type.startsWith("image/")) {

            alert(
                "Please select a valid image."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload = function (event) {

            const imageData =
                event.target.result;


            const cakes =
                getCakes();


            const newCake = {

                id:
                    Date.now(),

                name:
                    name,

                category:
                    category,

                price:
                    price,

                description:
                    description,

                image:
                    imageData

            };


            cakes.push(newCake);


            try {

                saveCakes(cakes);

            } catch (error) {

                alert(
                    "Image is too large for browser storage. Please use a smaller image."
                );

                console.error(error);

                return;

            }


            cakeForm.reset();

            imagePreview.innerHTML = "";


            renderAdminCakes();


            alert(
                "🎂 Cake added successfully!"
            );

        };


        reader.readAsDataURL(file);

    }
);


/* ================= RENDER ADMIN ================= */

function renderAdminCakes() {

    const cakes =
        getCakes();


    adminCakeList.innerHTML = "";


    if (cakes.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }


    cakes.forEach(cake => {

        const item =
            document.createElement("div");

        item.className =
            "admin-cake";


        item.innerHTML = `

            <img
                src="${cake.image}"
                alt="${escapeHTML(cake.name)}"
            >

            <div class="admin-cake-info">

                <h3>
                    ${escapeHTML(cake.name)}
                </h3>

                <p>
                    ${escapeHTML(cake.category)}
                </p>

                <div class="admin-cake-price">
                    ₹${Number(cake.price).toLocaleString("en-IN")}
                </div>

            </div>

            <button
                class="delete-button"
                onclick="deleteCake(${cake.id})"
            >
                Delete
            </button>

        `;


        adminCakeList.appendChild(item);

    });


    updateStats(cakes);

}


/* ================= DELETE ================= */

function deleteCake(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this cake?"
        );


    if (!confirmed) {

        return;

    }


    let cakes =
        getCakes();


    cakes =
        cakes.filter(
            cake =>
                cake.id !== id
        );


    saveCakes(cakes);


    renderAdminCakes();

}


/* ================= CLEAR ALL ================= */

clearAllButton.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Are you sure you want to delete ALL cakes?"
            );


        if (!confirmed) {

            return;

        }


        localStorage.removeItem(
            "sabanaCakes"
        );


        renderAdminCakes();

    }
);


/* ================= STATS ================= */

function updateStats(cakes) {

    totalCakes.textContent =
        cakes.length;


    if (cakes.length === 0) {

        averagePrice.textContent =
            "₹0";

    } else {

        const total =
            cakes.reduce(
                (sum, cake) =>
                    sum + Number(cake.price),
                0
            );


        const average =
            total / cakes.length;


        averagePrice.textContent =
            "₹" +
            Math.round(average)
                .toLocaleString("en-IN");

    }


    const categories =
        new Set(
            cakes.map(
                cake =>
                    cake.category
            )
        );


    totalCategories.textContent =
        categories.size;

}


/* ================= LOGOUT ================= */

logoutButton.addEventListener(
    "click",
    function () {

        sessionStorage.removeItem(
            "sabanaAdminLoggedIn"
        );


        window.location.replace(
            "login.html"
        );

    }
);


/* ================= SECURITY ================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* ================= INITIAL LOAD ================= */

renderAdminCakes();