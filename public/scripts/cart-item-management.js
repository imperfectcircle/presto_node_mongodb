/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

cartItemUpdateFormElements.forEach((el) => {
    el.addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target;

        const productId = form.dataset.productid;
        const csrfToken = form.dataset.csrf;
        const quantity = form.firstElementChild.value;

        let response;
        try {
            response = await fetch('/cart/items', {
                method: 'PATCH',
                body: JSON.stringify({
                    productId,
                    quantity,
                    _csrf: csrfToken,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            return 'Qualcosa è andato storto';
        }

        if (!response.ok) {
            return 'Qualcosa è andato storto';
        }

        const responseData = await response.json();

        if (responseData.updatedCartData.updatedItemPrice === 0) {
            form.parentElement.parentElement.remove();
        } else {
            const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
            cartItemTotalPriceElement.textContent = responseData
                .updatedCartData
                .updatedItemPrice
                .toFixed(2);
        }

        cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

        // eslint-disable-next-line no-shadow
        cartBadgeElements.forEach((el) => {
            const element = el;
            element.textContent = responseData.updatedCartData.newTotalQuantity;
        });
    });
});
