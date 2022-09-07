"use strict";

const basketCounterEl = document.querySelector
    ('.menu_page_second_block_btn_second_card span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.menu_page_second_block_btn_second_card')
    .addEventListener('click', () => {
        basketEl.classList.toggle('hiddenM');
    });

const basket = {};

document.querySelector('.products_basic_list')
    .addEventListener('click', event => {
        if (!event.target.closest('.products_items_btn')) {
            return;
        }
        const productsBasicListEl = event.target.closest('.products_items');
        const id = +productsBasicListEl.dataset.id;
        const name = productsBasicListEl.dataset.name;
        const price = +productsBasicListEl.dataset.price;
        addToCart(id, name, price);
    });

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    const productsArr = Object.values(basket);
    let count = 0;
    for (const product of productsArr) {
        count += product.count;
    }
    return count;
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
    const basketRowEl =
        basketEl.querySelector(`.basketRow[data-productId='${id}']`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].count * basket[id].price;

}

function renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
      $<span class="productTotalRow">${(basket[productId].price
            * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

