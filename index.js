import {menuArray} from "./data.js";
let orderArray = []
const cardForm = document.getElementById('card-form')
const modal = document.getElementById('card-details-modal')



cardForm.addEventListener('submit', function(e){
    e.preventDefault()
})

document.addEventListener('click', function(e){
    if(e.target.classList.contains('add-btn')){
    handleAddBtnClick(e.target.id)
    }else if(e.target.classList.contains('remove')){
        handleRemoveBtnClick(e.target.id)
    }else if(e.target.id === 'complete-order'){
       modal.style.display = 'inline'
    } else if(e.target.id === 'pay-btn'){
        submitForm()   
     }
})

function submitForm(){
    const thanksDiv = document.getElementById('thanks')
    const cardFormData = new FormData(cardForm)
    const name = cardFormData.get('userName')
    modal.style.display = 'none'
    thanksDiv.style.display = 'flex'
    thanksDiv.innerHTML = `<p>Thanks ${name}! Your order is on it's way</p>`

}

function handleAddBtnClick(menuId){
    const targetObj = menuArray.filter(function(menu){
        return (Number(menuId) === menu.id)
    })[0]
    orderArray.push(targetObj)
    renderOrder()
}

function handleRemoveBtnClick(menuId){
    const targetObj = menuArray.filter(function(menu){
        return (Number(menuId) === menu.id)
    })[0]
    orderArray.pop(targetObj)
    renderOrder()
}

function renderOrder(){
    document.getElementById('order').classList.add('showOnPage')

    let orderHtml = ''

    orderArray.forEach(function(item){
    orderHtml += `
        <div class="order-items">
            <div class="remove-item">
                 <p class="big-text">${item.name}</p>
                 <p class="remove">remove</p>
            </div>
            <p>$${item.price}</p>
        </div>
    ` })

  const totalOrder = orderArray.reduce(function(total, currentItem){
        return total + currentItem.price
    }, 0)
    orderHtml += ` <div class="total-order">
                      <p class="big-text">Total price:</p>
                      <p>$${totalOrder}</p>
                   </div>`
    document.getElementById('order-details').innerHTML = orderHtml  
}

function renderMenu(){
    let menuItems = ''
    menuArray.forEach(function(menu){ 
              menuItems +=   `<div class="menu-items">
                                    <div class="image-and-desc">
                                        <p class="emoji"> ${menu.emoji} </p>
                                        <div class="menu-item-description">
                                            <h2>${menu.name}</h2>
                                            <p class="grey-text">${menu.ingredients}</p>
                                            <p><strong>$${menu.price}</strong></p>
                                        </div>
                                    </div>
                                    <img src="images/add-btn.png" class="add-btn" id="${menu.id}">
                              </div>`
    })
        document.getElementById('menu').innerHTML = menuItems
}

renderMenu()