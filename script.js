const loadCategories = () =>{
        fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => displayCategory(data.categories))
}

const loadTree = (id) =>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayTree(data.plants))
}

const displayTree = (trees)=>{
    console.log(trees);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let tree of trees){
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card h-auto sm:h-[420px] md:h-[460px] bg-base-100  shadow-sm">
                        <figure class="px-5 pt-5">
                            <img class="w-full h-52 object-cover rounded-md"src=${tree.image}
                                alt="${tree.category}" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title text-[14px] font-bold">${tree.name}</h2>
                            <p class="text-[12px]">${tree.description}</p>
                            <div class="flex justify-between">
                                <span class="bg-[#dcfce7] badge badge-xs text-[14px] px-3 py-3 rounded-full">
                                ${tree.category}
                                </span>
                                <span class="font-bold text-[14px]">৳<span>${tree.price}</span></span>
                            </div>

                            <div class="card-actions mt-3">
                                <button class="btn btn-block bg-[#15803D] text-white rounded-full">Add to Cart</button>
                            </div>
                        </div>
                    </div>
        `

        cardContainer.appendChild(cardDiv);
    }
}



    const displayCategory = (categories) => {
        // 1. get the container
const categoryContainer = document.getElementById("category-container");
categoryContainer.innerHTML ="";
        // 2. get into every category
        for (let category of categories){
        //3.create element
 const btnDiv = document.createElement ("div");
 btnDiv.innerHTML = `
                    
                    <button onclick="loadTree(${category.id})" class="btn btn-ghost text-left text justify-center md:justify-start w-full hover:bg-[#136b33] hover:text-white rounded-lg mt-1 py-0 md:py-7 lg:py-5">
                    ${category.category_name}
                    </button>
 `
        //     4.append into container
        categoryContainer.appendChild(btnDiv)
        }
       
    }


const loadallPlants = ()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res)=>res.json())
    .then((data)=>displayPlants(data.plants))
}

const displayPlants = (plants)=>{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let plant of plants){
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card h-auto sm:h-[420px] md:h-[460px] bg-base-100  shadow-sm">
                        <figure class="px-5 pt-5">
                            <img class="w-full h-52 object-cover rounded-md"src=${plant.image}
                                alt="${plant.category}" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title text-[14px] font-bold">${plant.name}</h2>
                            <p class="text-[12px]">${plant.description}</p>
                            <div class="flex justify-between">
                                <span class="bg-[#dcfce7] badge badge-xs text-[14px] px-3 py-3 rounded-full">
                                ${plant.category}
                                </span>
                                <span class="font-bold text-[14px]">৳<span>${plant.price}</span></span>
                            </div>

                            <div class="card-actions mt-3">
                                <button class="btn btn-block bg-[#15803D] text-white rounded-full">Add to Cart</button>
                            </div>
                        </div>
                    </div>
        `

        cardContainer.appendChild(cardDiv);
    }
}



loadallPlants();

loadCategories();

