/* eslint-disable no-undef */
const addToCartButtonElement = document.querySelector('.cart-btn');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

addToCartButtonElement.addEventListener('click', async () => {
    const productId = addToCartButtonElement.dataset.productid;
    const csrfToken = addToCartButtonElement.dataset.csrf;

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productId,
                _csrf: csrfToken,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        alert('Something went wrong');
        return;
    }

    if (!response.ok) {
        alert('Something went wrong');
        return;
    }

    const resposneData = await response.json();
    const newTotalQuantity = resposneData.newTotalItems;
    cartBadgeElements.forEach((el) => {
        const element = el;
        element.textContent = newTotalQuantity;
    });
});
