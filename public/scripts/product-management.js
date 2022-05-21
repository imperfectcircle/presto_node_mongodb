const deleteProductBtnElements = document.querySelectorAll('.product-item button');
const productItemLiElement = document.querySelectorAll('#product-item-li');

deleteProductBtnElements.forEach((el, index) => {
    el.addEventListener('click', async (event) => {
        const buttonElement = event.target;

        const productId = buttonElement.dataset.productid;
        const csrfToken = buttonElement.dataset.csrf;

        // eslint-disable-next-line no-undef
        const response = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            alert('Qualcosa non ha funzionato');
        }

        productItemLiElement[index].remove();
    });
});
