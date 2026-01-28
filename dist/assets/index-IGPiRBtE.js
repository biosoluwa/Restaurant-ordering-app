(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const c=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],id:0,price:14,emoji:"🍕"},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"🍔",id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",id:2}];let o=[];const l=document.getElementById("card-form"),m=document.getElementById("card-details-modal"),a=document.getElementById("thanks");document.addEventListener("click",function(e){e.target.classList.contains("add-btn")?f(e.target.id):e.target.classList.contains("remove")?g(e.target.id):e.target.id==="complete-order"&&(document.getElementById("order").classList.remove("showOnPage"),m.style.display="inline")});l.addEventListener("submit",function(e){e.preventDefault(),p(),o=[],a.style.display="flex"});function p(){let e=document.getElementById("userName"),t=document.getElementById("card-number"),n=document.getElementById("card-cvv");const r=new FormData(l).get("userName");e.value="",t.value="",n.value="",m.style.display="none",a.innerHTML=`<p>Thanks ${r}! Your order is on it's way</p>`}function f(e){const t=c.filter(function(n){return Number(e)===n.id})[0];o.push(t),a.style.display="none",u()}function g(e){const t=c.filter(function(n){return Number(e)===n.id})[0];o.pop(t),u()}function u(){document.getElementById("order").classList.add("showOnPage");let e="";o.forEach(function(n){e+=`
        <div class="order-items">
            <div class="remove-item">
                 <p class="big-text">${n.name}</p>
                 <p class="remove">remove</p>
            </div>
            <p>$${n.price}</p>
        </div>
    `});const t=o.reduce(function(n,s){return n+s.price},0);e+=` <div class="total-order">
                      <p class="big-text">Total price:</p>
                      <p>$${t}</p>
                   </div>`,document.getElementById("order-details").innerHTML=e}function y(){let e="";c.forEach(function(t){e+=`<div class="menu-items">
                                    <div class="image-and-desc">
                                      <span class="emoji"> ${t.emoji}</span>
                                        <div class="menu-item-description">
                                            <h2>${t.name}</h2>
                                            <p class="grey-text">${t.ingredients}</p>
                                            <p>$${t.price}</p>
                                        </div>
                                    </div>
                                    <img src="/images/add-btn.png" class="add-btn" id="${t.id}">
                              </div>`}),document.getElementById("menu").innerHTML=e}y();
