/* ==================================================
   SABANA CAKE STUDIO
   ADMIN PANEL
   ================================================== */


/* ================= STORAGE KEY ================= */

const STORAGE_KEY =
    "sabanaCakeProducts";



/* ================= ELEMENTS ================= */

const cakeForm =
    document.getElementById("cakeForm");

const cakeImage =
    document.getElementById("cakeImage");

const imagePreview =
    document.getElementById("imagePreview");

const uploadContent =
    document.getElementById("uploadContent");

const adminCakeList =
    document.getElementById("adminCakeList");

const adminCakeCount =
    document.getElementById("adminCakeCount");

const toast =
    document.getElementById("toast");



/* ================= IMAGE PREVIEW ================= */

cakeImage.addEventListener(
    "change",
    function() {

        const file =
            this.files[0];

        if (!file) {
            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                imagePreview.src =
                    event.target.result;

                imagePreview.style.display =
                    "block";

                uploadContent.style.display =
                    "none";

            };


        reader.readAsDataURL(file);

    }
);



/* ================= FORM SUBMIT ================= */

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


        const style =
            document
                .getElementById("cakeStyle")
                .value
                .trim();


        const description =
            document
                .getElementById("cakeDescription")
                .value
                .trim();


        const weight =
            document
                .getElementById("cakeWeight")
                .value
                .trim();


        const flavour =
            document
                .getElementById("cakeFlavour")
                .value
                .trim();


        const price =
            document
                .getElementById("cakePrice")
                .value;



        /* ================= IMAGE ================= */

        const file =
            cakeImage.files[0];


        if (!file) {

            alert(
                "Please select a cake photo."
            );

            return;

        }



        /* ================= READ IMAGE ================= */

        const reader =
            new FileReader();


        reader.onload =
            function(event) {


                const newCake = {

                    id:
                        Date.now(),

                    name:
                        name,

                    category:
                        category,

                    style:
                        style,

                    description:
                        description,

                    weight:
                        weight,

                    flavour:
                        flavour,

                    price:
                        Number(price),

                    image:
                        event.target.result

                };


                saveCake(
                    newCake
                );


                cakeForm.reset();


                imagePreview.src =
                    "";

                imagePreview.style.display =
                    "none";

                uploadContent.style.display =
                    "flex";


                showToast(
                    "Cake added successfully! 🍰"
                );


                renderAdminCakes();

            };


        reader.readAsDataURL(file);

    }
);



/* ================= GET CAKES ================= */

function getCakes() {

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!data) {

        return [];

    }


    try {

        return JSON.parse(
            data
        );

    }
    catch (error) {

        return [];

    }

}



/* ================= SAVE CAKE ================= */

function saveCake(
    cake
) {

    const cakes =
        getCakes();


    cakes.push(
        cake
    );


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cakes)
    );

}



/* ================= DELETE CAKE ================= */

function deleteCake(
    id
) {

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
            function(cake) {

                return cake.id !== id;

            }
        );


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cakes)
    );


    renderAdminCakes();


    showToast(
        "Cake deleted."
    );

}



/* ================= RENDER ADMIN ================= */

function renderAdminCakes() {


    const cakes =
        getCakes();


    adminCakeCount.textContent =
        cakes.length +
        (
            cakes.length === 1
                ? " Cake"
                : " Cakes"
        );


    if (
        cakes.length === 0
    ) {

        adminCakeList.innerHTML = `

            <div class="empty-list">

                <div>
                    🍰
                </div>

                <p>
                    No cakes added yet.
                </p>

            </div>

        `;

        return;

    }



    adminCakeList.innerHTML =
        "";


    cakes.forEach(
        function(cake) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-cake-item";


            item.innerHTML = `

                <img
                    src="${cake.image}"
                    alt="${escapeHTML(cake.name)}"
                >


                <div class="admin-cake-content">

                    <span class="category">
                        ${escapeHTML(cake.category)}
                    </span>

                    <h3>
                        ${escapeHTML(cake.name)}
                    </h3>

                    <p>
                        ${escapeHTML(cake.weight)}
                        •
                        ${escapeHTML(cake.flavour)}
                    </p>

                    <div class="admin-cake-price">
                        ₹${Number(cake.price).toLocaleString("en-IN")}
                    </div>

                    <button
                        class="delete-btn"
                        onclick="deleteCake(${cake.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            adminCakeList.appendChild(
                item
            );

        }
    );

}



/* ================= ESCAPE HTML ================= */

function escapeHTML(
    text
) {

    return String(text)
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



/* ================= TOAST ================= */

function showToast(
    message
) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}



/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderAdminCakes();

    }
);