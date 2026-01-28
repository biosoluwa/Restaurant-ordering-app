import {menuArray} from "./data.js";


let orderArray = []
const cardForm = document.getElementById('card-form')

const modal = document.getElementById('card-details-modal')
const thanksDiv = document.getElementById('thanks')


// event listeners
document.addEventListener('click', function(e){
    if(e.target.classList.contains('add-btn')){
    handleAddBtnClick(e.target.id)
    }else if(e.target.classList.contains('remove')){
        handleRemoveBtnClick(e.target.id)
    }else if(e.target.id === 'complete-order'){
        document.getElementById('order').classList.remove('showOnPage')
       modal.style.display = 'inline'
    } 
})
// event listener for the form 
cardForm.addEventListener('submit', function(e){
    e.preventDefault()
    submitForm() 
    orderArray = []
    thanksDiv.style.display = 'flex'
})


// when user clicks on pay button 
function submitForm(){
    let nameInput = document.getElementById('userName')
    let cardInput = document.getElementById('card-number')
    let cvvInput = document.getElementById('card-cvv')

    const cardFormData = new FormData(cardForm)
    const name = cardFormData.get('userName')

     nameInput.value = ''
     cardInput.value = ''
     cvvInput.value = ''
    modal.style.display = 'none'

    thanksDiv.innerHTML = `<p>Thanks ${name}! Your order is on it's way</p>`   
}


// when user clicks on the add(+) button beside the menu 
function handleAddBtnClick(menuId){
    const targetObj = menuArray.filter(function(menu){
        return (Number(menuId) === menu.id)
    })[0]

    if(orderArray.includes(targetObj)){
        targetObj.count++
    }else{
            targetObj.count = 1
            orderArray.push(targetObj)
    }
    thanksDiv.style.display = 'none'
    renderOrder()
}

// when user clicks on the remove text beside the order items 
function handleRemoveBtnClick(menuId){
     
       orderArray = orderArray.filter(function(item){
            if(item && item.id === Number(menuId) ){
                item.count --
            }
                return item.count > 0
            })
       renderOrder()
}

// show the order details on the page 
function renderOrder(){
     let orderHtml = ''
    document.getElementById('order').classList.add('showOnPage')
  if(orderArray.length > 0){
    orderArray.forEach(function(item){
      item.totalItemPrice = item.price * item.count
    orderHtml += `
        <div class="order-items">
            <div class="remove-item">
                 <p class="big-text">${item.name} (x${item.count})</p>
                 <p class="remove" id="${item.id}">remove</p>
            </div>
            <p>$${item.totalItemPrice}</p>
        </div>
    ` })

  const totalOrder = orderArray.reduce(function(total, currentItem){
        return total + currentItem.totalItemPrice
    }, 0)
    orderHtml += ` <div class="total-order">
                      <p class="big-text">Total price:</p>
                      <p>$${totalOrder}</p>
                   </div>`
    document.getElementById('order-details').innerHTML = orderHtml  
} else{
    document.getElementById('order').classList.remove('showOnPage')
}
}



// to render the menu on the page (beer, pizza, hamburger)
function renderMenu(){
    let menuItems = ''
    menuArray.forEach(function(menu){ 
              menuItems +=   `<div class="menu-items">
                                    <div class="image-and-desc">
                                      <span class="emoji"> ${menu.emoji}</span>
                                        <div class="menu-item-description">
                                            <h2>${menu.name}</h2>
                                            <p class="grey-text">${menu.ingredients}</p>
                                            <p>$${menu.price}</p>
                                        </div>
                                    </div>
                                    <img src="/images/add-btn.png" class="add-btn" id="${menu.id}">
                              </div>`
    })
        document.getElementById('menu').innerHTML = menuItems
}

renderMenu()