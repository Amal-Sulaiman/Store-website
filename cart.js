let shopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let body = document.querySelector('body');
let buttonAdd = document.querySelector('.buttonAdd');


let listCards = JSON.parse(localStorage.getItem('cart')) || [];
reloadCard() ;

shopping.addEventListener('click', ()=> {
   body.classList.toggle(`activeCard`);// add class from the body
});

closeShopping.addEventListener('click', () => {
   body.classList.remove('activeCard'); // Removes class from the body
});

let products = [
    {
        id: 1,
        name: 'مصحف مجمع الملك فهد مقاس ثمن',
        image: 'image.jpeg',
        price:27.99

    },
    {
        id: 2,
        name: 'العشر الاخير من مصحف المدينة',
        image: 'image2.jpg',
        price:13.95

    },
    {
        id: 3,
        name:'تجويد القرآن الكريم أسود 17×24',
        image: 'image3.jpg',
        price:37.90

    },
    {
        id: 4,
        name: 'ربع يس من مصحف المدينة',
        image: 'image4.jpg',
        price:20.85

    },
    {
        id: 5,
        name: 'مصحف مجمع الملك فهد مقاس ثمن',
        image: 'image5.jpg',
        price:32.50

    },{
        id: 6,
        name: 'مصحف القرآن الكريم ',
        image: 'image6.jpg',
        price:23.99

    },
  
];

addPro();
function addPro() {
    products.forEach((value, key) => {
        // Create new div element
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        // Set innerHTML 
        itemDiv.innerHTML = `
            <img src="${value.image}" alt="image for quran" style="width:100%">
            <div class="titleItem">${value.name}</div>
            <div class="price"> ر.س ${value.price}  </div>
            <h1 class="description" > القرآن الكريم</h1>
            <button class ="buttonAdd" onclick="addToCard(${key})">Add to Cart</button>
            `;
        // Append the new div to the list
        list.appendChild(itemDiv);
    });
}



function addToCard(key){
   
    if (listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1 ;
    }
    else
    {listCards[key].quantity = 1 + listCards[key].quantity;}
    reloadCard();
    save();
    }



function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice = totalPrice + (value.price*value.quantity);
            count = count + value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}" /></div>
                <div>${value.name}</div>
                <div>ر.س${value.price * value.quantity}</div>
                <div>
               
                <button class="delete" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button class="add" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
                 <button class="remove-product" onclick="deleteItem(${key})">  Remove </button>`;
            listCard.appendChild(newDiv);
        };
    })
    
    total.innerText = "total: " +totalPrice.toFixed(2);
    quantity.innerText = count;
}



function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }
    else{
        listCards[key].quantity = quantity;
    }
    reloadCard();
    save();
}

function save() {
    localStorage.setItem('cart', JSON.stringify(listCards));//from js to object json
}


function deleteItem(key){
    delete listCards[key];
    reloadCard();
    save();
}


