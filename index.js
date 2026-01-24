import {menuArray} from "./data.js";

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
                                    <img src="images/add-btn.png" class="add-btn">
                              </div>`
    })
        document.getElementById('menu').innerHTML = menuItems
}

renderMenu()