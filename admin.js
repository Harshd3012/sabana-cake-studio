const STORAGE_KEY = "sabanaCakeProducts";


const cakeForm =
    document.getElementById("cakeForm");


const cakeImage =
    document.getElementById("cakeImage");


const imagePreview =
    document.getElementById("imagePreview");


const adminCakeList =
    document.getElementById("adminCakeList");


const adminEmptyState =
    document.getElementById("adminEmptyState");


const adminCakeCount =
    document.getElementById("adminCakeCount");



/* ================= IMAGE PREVIEW ================= */

cakeImage.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                imagePreview.innerHTML = `
                    <img
                        src="${event.target.result}"
                        alt="Cake Preview"
                    >
                `;

            };


        reader.readAsDataURL(file);

    }
);



/* ================= GET CAKES ================= */

function getCakes() {

    const savedCakes =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!savedCakes) {

        return [];

    }


    try {

        return JSON.parse(
            savedCakes
        );

    }
    catch (error) {

        return [];

    }

}



/* ================= SAVE CAKES ================= */

function saveCakes(cakes) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cakes)
    );

}



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


        const style =
            document
                .getElementById("cakeStyle")
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


        const description =
            document
                .getElementById("cakeDescription")
                .value
                .trim();


        const file =
            cakeImage.files[0];


        if (!file) {

            alert(
                "Please select a cake image."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                const newCake = {

                    id: Date.now(),

                    name: name,

                    category: category,

                    style: style,

                    weight: weight,

                    flavour: flavour,

                    price: price,

                    description: description,

                    image:
                        event.target.result

                };


                const cakes =
                    getCakes();


                cakes.push(
                    newCake
                );


                saveCakes(
                    cakes
                );


                cakeForm.reset();


                imagePreview.innerHTML = `
                    <span>
                        Image preview will appear here
                    </span>
                `;


                loadAdminCakes();


                alert(
                    "Cake added successfully!"
                );

            };


        reader.readAsDataURL(
            file
        );

    }
);



/* ================= LOAD ADMIN CAKES ================= */

function loadAdminCakes() {

    const cakes =
        getCakes();


    adminCakeList.innerHTML =
        "";


    if (
        cakes.length === 0
    ) {

        adminEmptyState.style.display =
            "block";

    }
    else {

        adminEmptyState.style.display =
            "none";

    }


    adminCakeCount.textContent =
        cakes.length +
        (
            cakes.length === 1
                ? " Cake"
                : " Cakes"
        );


    cakes.forEach(
        function (cake) {

            const card =
                document.createElement("div");


            card.className =
                "admin-cake-card";


            card.innerHTML = `

                <div class="admin-cake-image">

                    <img
                        src="${cake.image}"
                        alt="${cake.name}"
                    >

                </div>


                <div class="admin-cake-info">

                    <span class="admin-cake-category">

                        ${cake.category}

                    </span>


                    <h3>

                        ${cake.name}

                    </h3>


                    <p>

                        ${cake.description}

                    </p>


                    <div class="admin-cake-price">

                        ₹${Number(
                            cake.price
                        ).toLocaleString("en-IN")}

                    </div>


                    <button
                        class="delete-cake-btn"
                        data-id="${cake.id}"
                    >

                        Delete Cake

                    </button>

                </div>

            `;


            const deleteButton =
                card.querySelector(
                    ".delete-cake-btn"
                );


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteCake(
                        cake.id
                    );

                }
            );


            adminCakeList.appendChild(
                card
            );

        }
    );

}



/* ================= DELETE CAKE ================= */

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
            function (cake) {

                return (
                    cake.id !== id
                );

            }
        );


    saveCakes(
        cakes
    );


    loadAdminCakes();

}



/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAdminCakes();

    }
);