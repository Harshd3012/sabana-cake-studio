/* ==========================================
   SABANA CAKE STUDIO
   ADMIN JAVASCRIPT
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const cakeForm =
    document.getElementById("cakeForm");

const adminCakeList =
    document.getElementById("adminCakeList");

const clearAll =
    document.getElementById("clearBtn");


/* ==========================================
   GET CAKES
========================================== */

function getCakes() {

    const saved =
        localStorage.getItem("sabanaCakes");

    if (!saved) {

        return [];

    }

    return JSON.parse(saved);

}


/* ==========================================
   SAVE CAKES
========================================== */

function saveCakes(cakes) {

    localStorage.setItem(
        "sabanaCakes",
        JSON.stringify(cakes)
    );

}


/* ==========================================
   DISPLAY ADMIN CAKES
========================================== */

function displayAdminCakes() {

    const cakes =
        getCakes();


    adminCakeList.innerHTML = "";


    if (cakes.length === 0) {

        adminCakeList.innerHTML = `

            <div class="empty-message">

                🍰

                <br><br>

                No cakes added yet.

            </div>

        `;

        return;

    }


    cakes.forEach(cake => {

        const item =
            document.createElement("div");

        item.className =
            "admin-cake";


        item.innerHTML = `

            <div class="admin-cake-image">

                <img
                    src="${cake.image}"
                    alt="${cake.name}"
                    onerror="this.style.display='none'"
                >

            </div>


            <div class="admin-cake-info">

                <h3>
                    ${cake.name}
                </h3>

                <p>
                    ${cake.description}
                </p>

                <strong>
                    ₹${Number(cake.price).toLocaleString("en-IN")}
                </strong>

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

}


/* ==========================================
   ADD CAKE
========================================== */

cakeForm.addEventListener(
    "submit",
    function(event) {

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
            document
                .getElementById("cakePrice")
                .value;


        const description =
            document
                .getElementById("cakeDescription")
                .value
                .trim();


        const image =
            document
                .getElementById("cakeImage")
                .value
                .trim();


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


        const cakes =
            getCakes();


        const newCake = {

            id: Date.now(),

            name: name,

            category: category,

            price: Number(price),

            description: description,

            image: image

        };


        cakes.push(newCake);


        saveCakes(cakes);


        cakeForm.reset();


        displayAdminCakes();
updateStats();
    updateStats();


        alert(
            "🎂 Cake added successfully!"
        );

    }
);


/* ==========================================
   DELETE CAKE
========================================== */

function deleteCake(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this cake?"
        );


    if (!confirmDelete) {

        return;

    }


    let cakes =
        getCakes();


    cakes =
        cakes.filter(
            cake => cake.id !== id
        );


    saveCakes(cakes);


    displayAdminCakes();
    updateStats();

}


/* ==========================================
   CLEAR ALL
========================================== */

if (clearAll) clearAll.addEventListener(
    "click",
    function() {

        const confirmClear =
            confirm(
                "Delete ALL cakes from the collection?"
            );


        if (!confirmClear) {

            return;

        }


        localStorage.removeItem(
            "sabanaCakes"
        );


        displayAdminCakes();
updateStats();
updateStats();
        updateStats();

    }
);


/* ==========================================
   DASHBOARD STATS
========================================== */

function updateStats() {
    const cakes = getCakes();

    const total = document.getElementById("totalCakes");
    const average = document.getElementById("averagePrice");
    const categories = document.getElementById("totalCategories");

    if (total) total.textContent = cakes.length;

    if (average) {
        const avg = cakes.length
            ? Math.round(cakes.reduce((sum, cake) => sum + Number(cake.price || 0), 0) / cakes.length)
            : 0;
        average.textContent = `₹${avg.toLocaleString("en-IN")}`;
    }

    if (categories) {
        categories.textContent = new Set(cakes.map(cake => cake.category)).size;
    }
}

/* ==========================================
   INITIAL LOAD
========================================== */

displayAdminCakes();
updateStats();
