/**
 * Write your challenge solution here
 */

const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')

let cart = []
let totalPrice = 0;

function addToCart( productName, price){
    let existingItem = cart.find((item)=> item.name == productName)
    if(existingItem){
        existingItem.quantity+=1;
        updateCart();
    }else{
        cart.push({name: productName, price, quantity : 1})
        updateCart();
    }
}

function updateCart(){
    cartItems.innerHTML = "";
    if( cart.length === 0){
        cartItems.innerHTML = '<div class="empty-cart" > Cart is Empty </div> '
    }else{
        cart.forEach((item) => {

            const itemContainer = document.createElement('div');
            itemContainer.classList.add("cart-item");

            const titleElement = document.createElement("div");
            titleElement.innerText = item.name;
      
            const quantityControls = document.createElement("div");
            quantityControls.classList.add("quantity-controls");
      
            const buttonMinus = document.createElement("button");
            buttonMinus.innerText = "-";
            buttonMinus.addEventListener('click', ()=>{
                item.quantity-=1;
                if( item.quantity<=0 ){
                    removeFromCart(item.name)
                }else 
                    updateCart();
            })
      
            const currQuantity = document.createElement("span");
            currQuantity.innerText = item.quantity;
      
            const buttonPlus = document.createElement("button");
            buttonPlus.innerText = "+";
            buttonPlus.addEventListener('click', ()=>{
                addToCart(item.name, item.price) 
            })
      
            const currTotalCost = document.createElement("span");
            console.log(currTotalCost.innerText)
            // console.log(item.quantity, item.price)
            currTotalCost.innerText = `$` + item.quantity * item.price

            const removeBtn = document.createElement("button");
            removeBtn.innerText = "Remove";
            removeBtn.onclick = ()=> removeFromCart(item.name);

            
            quantityControls.appendChild(buttonMinus);
            quantityControls.appendChild(currQuantity);
            quantityControls.appendChild(buttonPlus);
            quantityControls.appendChild(currTotalCost);
            quantityControls.appendChild(removeBtn);

            itemContainer.appendChild(titleElement);
            itemContainer.appendChild(quantityControls);
            cartItems.appendChild(itemContainer);
            
        })
    }
    updateTotal()
}

function removeFromCart(productName){
    cart = cart.filter((item)=> item.name !== productName)
    updateCart()
}

function updateTotal(){
    let total = 0
    for(let i =0 ;i< cart.length ; i++){
        total += cart[i].quantity * cart[i].price
    }
    // total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    cartTotal.style.fontWeight = 'bold'
    cartTotal.style.fontSize = '25px'
}


// function addToCart( productName  , price){
//     let exists = false;
//     for(let i =0 ;i<cart.length;i++){
//         if( cart[i].name===productName)
//             exists = true;
//     }

//     cart.push({ name: productName, price, quantity: 1 })
//     if( !exists) {
//         createItem(productName, price)
//     }else{
//         addMoreItem(productName ,price)
//     }

// }

// function addMoreItem(productName, price){
//     currTotalCost.innerText = Number(currTotalCost.innerText) + price
// }

// function createItem(productName, price){
//     const itemContainer = document.createElement('div')
//     itemContainer.style.display = 'flex'
//     itemContainer.style.justifyContent = 'space-between'
//     itemContainer.style.alignItems = 'center'
    
//     const titleElement      = document.createElement('div')
//     titleElement.innerText  = productName;
//     // console.log(titleElement.innerText)
    
//     const quantityControls  = document.createElement('div')
    
//     const buttonMinus = document.createElement('button')
//     buttonMinus.innerText = '-'
//     // console.log(buttonMinus.value )

//     const currQuantity = document.createElement('span');
//     currQuantity.innerText = 1;

//     const buttonPlus = document.createElement('button')
//     buttonPlus.innerText = '+'
//     // console.log(buttonPlus.value )

//     const currTotalCost = document.createElement('span')
//     currTotalCost.innerText = price;

//     const removeBtn = document.createElement('button')
//     removeBtn.innerText = 'Remove'

//     quantityControls.appendChild(buttonMinus)
//     quantityControls.appendChild(currQuantity)
//     quantityControls.appendChild(buttonPlus)
//     quantityControls.appendChild(currTotalCost)
//     quantityControls.appendChild(removeBtn)
    

//     itemContainer.appendChild(titleElement)
//     itemContainer.appendChild(quantityControls)

//     cartItems.appendChild(itemContainer)

// }
