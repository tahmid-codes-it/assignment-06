const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => displayCategory(data.categories))
}

const loadTree = (id, btn) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    
    const allButtons = document.querySelectorAll("#category-container button");
    allButtons.forEach(button => {
        button.classList.remove("bg-[#136b33]", "text-white");
    });

    
    btn.classList.add("bg-[#136b33]", "text-white");

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayTree(data.plants));
};



const loadTreeDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`

    const res = await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants);
};

const displayTreeDetails = (tree) => {
    console.log(tree);
    const treeDetails = document.getElementById("plant-details");
    treeDetails.innerHTML = `
    <h3 class="text-lg font-bold">${tree.name}</h3>
                <img class="w-full h-60 object-cover rounded-md mt-2" src="${tree.image}" alt="">
                <p class="py-2"><span class="font-bold">Category:</span> ${tree.category}</p>
                <p class="py-2"><span class="font-bold">Price:</span> ৳${tree.price}</p>
                <p class="py-2"><span class="font-bold">Description:</span> ${tree.description}</p>
    `;
    document.getElementById("my_modal_5").showModal();
}

const displayTree = (trees) => {
    console.log(trees);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let tree of trees) {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card h-auto sm:h-[420px] md:h-[460px] bg-base-100  shadow-sm">
                        <figure class="px-5 pt-5">
                            <img class="w-full h-52 object-cover rounded-md"src=${tree.image}
                                alt="${tree.category}" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <h2 onclick ="loadTreeDetail(${tree.id})" class="card-title text-[14px] font-bold">${tree.name}</h2>
                            <p class="text-[12px]">${tree.description}</p>
                            <div class="flex justify-between">
                                <span class="bg-[#dcfce7] badge badge-xs text-[14px] px-3 py-3 rounded-full">
                                ${tree.category}
                                </span>
                                <span class="font-bold text-[14px]">৳<span>${tree.price}</span></span>
                            </div>

                           <button onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})" 
    class="btn btn-block bg-[#15803D] text-white rounded-full">
    Add to Cart
</button>

                        </div>
                    </div>
        `

        cardContainer.appendChild(cardDiv);
    }
}



const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    for (let category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button 
                onclick="loadTree(${category.id}, this)" 
                class="btn btn-ghost text-left justify-center md:justify-start w-full rounded-lg mt-1 py-0 md:py-7 lg:py-5 hover:bg-[#136b33] hover:text-white"
            >
                ${category.category_name}
            </button>
        `;
        categoryContainer.appendChild(btnDiv);
    }
};


const loadallPlants = () => {
    showSpinner();
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            displayPlants(data.plants);
         hideSpinner();
        });
}


const loadPlantDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`

    const res = await fetch(url);
    const details = await res.json();
    displayPlantDetails(details.plants);
};

const displayPlantDetails = (plant) => {
    console.log(plant);
    const plantDetails = document.getElementById("plant-details");
    plantDetails.innerHTML = `
    <h3 class="text-lg font-bold">${plant.name}</h3>
                <img class="w-full h-60 object-cover rounded-md mt-2" src="${plant.image}" alt="">
                <p class="py-2"><span class="font-bold">Category:</span> ${plant.category}</p>
                <p class="py-2"><span class="font-bold">Price:</span> ৳${plant.price}</p>
                <p class="py-2"><span class="font-bold">Description:</span> ${plant.description}</p>
    `;
    document.getElementById("my_modal_5").showModal();
}


const displayPlants = (plants) => {
    
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let plant of plants) {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card h-auto sm:h-[420px] md:h-[460px] bg-base-100  shadow-sm">
                        <figure class="px-5 pt-5">
                            <img class="w-full h-52 object-cover rounded-md"src=${plant.image}
                                alt="${plant.category}" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <h2 onclick="loadPlantDetail(${plant.id})" class="card-title text-[14px] font-bold">${plant.name}</h2>
                            <p class="text-[12px]">${plant.description}</p>
                            <div class="flex justify-between">
                                <span class="bg-[#dcfce7] badge badge-xs text-[14px] px-3 py-3 rounded-full">
                                ${plant.category}
                                </span>
                                <span class="font-bold text-[14px]">৳<span>${plant.price}</span></span>
                            </div>

                           <button onclick="addToCart(${plant.id}, '${plant.name}', ${plant.price})" 
                             class="btn btn-block bg-[#15803D] text-white rounded-full">
                             Add to Cart
                           </button>

                        </div>
                    </div>
        `

        cardContainer.appendChild(cardDiv);
    };
    
}

let cart = [];

const addToCart = (id, name, price) => {
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    }

    else {
        cart.push({ id, name, price, quantity: 1 });
    }

    alert(`${name} has been added to cart`);
    displayCart();
};


const displayCart = () => {
    const cartContainer = document.getElementById("add-to-cart-container");
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("inter-font", "bg-[#F0FDF4]", "flex", "justify-between", "p-4", "rounded-lg", "items-center", "mb-2");
        div.innerHTML = `
            <div>
                <h1 class="font-bold">${item.name}</h1>
                <p class="text-[#8e8e93]">৳${item.price} × ${item.quantity}</p>
            </div>
            <div>
                <p onclick="removeFromCart(${item.id})" class="cursor-pointer text-[#8e8e93]">
                    <i class="fa-solid fa-xmark"></i>
                </p>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    // total section
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("flex", "justify-between", "mt-2", "font-bold");
    totalDiv.innerHTML = `
        <p>Total:</p>
        <p>৳${total}</p>
    `;
    cartContainer.appendChild(totalDiv);
};

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    displayCart();
};


const showSpinner = () => {
    document.getElementById("loading-spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
};

const hideSpinner = () => {
    document.getElementById("loading-spinner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
};




loadallPlants();

loadCategories();




