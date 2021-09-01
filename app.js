// Get Cocktail Data By API
const getCocktailName = document.getElementById('search-btn').addEventListener('click', ()=>{
    const inputValue = document.getElementById('search-box');
    const inputValueText = inputValue.value;
    inputValue.value = '';
    const errorText = document.getElementById('error-text');

    if(inputValueText === ''){
        // error message for empty input
        errorText.textContent = '';
        const drinksContainer = document.getElementById('drinks-container');
        drinksContainer.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card text-center text-danger">
        <div class="card-header">
            This Is An Error Message
        </div>
        <div class="card-body">
            <h5 class="card-title">Please Enter A Drink Name</h5>
            <p class="card-text">If you don't search any drink, how will we know what kind of drink you are looking for??.</p>
            
        </div>
        <div class="card-footer">
            Thank You 
        </div>
    </div>
        `
        errorText.appendChild(div)
    }
    else{
        errorText.textContent = '';
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValueText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayDrinksItems(data.drinks))
    }
    
});

// Display Cocktail Data By API
const displayDrinksItems = drinksItem => {
    const drinksContainer = document.getElementById('drinks-container');
    drinksContainer.textContent = '';

    drinksItem.forEach(drink =>{
        const col = document.createElement('col');
        col.innerHTML = `
        <div class="card h-100">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${drink.strDrink}</h5>
            <p class="card-text">${drink.strInstructions.slice(0, 120)} <span>.....</span></p>
            <button onclick="getDetailsByModal(${drink.idDrink})" type="button" class="btn btn-warning text-white" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                See More
            </button>

        </div>

    </div>
        `;
        drinksContainer.appendChild(col);
        
    })
};

// Get Details By Id & Set With Modal
const getDetailsByModal = getDetails =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${getDetails}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetailByModal(data.drinks[0]))
}

// Display Details With Modal

const displayDetailByModal = details => {
    const modalBox = document.getElementById('modal-box');
    modalBox.textContent = '';
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">${details.strDrink}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img src="${details.strDrinkThumb}" class="img-fluid" alt="">
            <h5>${details.strIngredient1}, ${details.strIngredient2}, ${details.strIngredient3}, ${details.strIngredient4},</h5>
            <p>${details.strInstructions}</p>  
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Order</button>
        </div>`;
    modalBox.appendChild(div)
    
};

