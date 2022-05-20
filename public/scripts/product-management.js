const deleteProductBtnElements = document.querySelectorAll('.product-item button');
const productItemLiElement = document.querySelectorAll('#product-item-li');
console.log(productItemLiElement);
deleteProductBtnElements.forEach((el, index) => {
    el.addEventListener('click', async (event) => {
        const buttonElement = event.target;
        console.log(buttonElement);
        const productId = buttonElement.dataset.productid;
        const csrfToken = buttonElement.dataset.csrf;

        const response = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            alert('Qualcosa non ha funzionato')
        }

        productItemLiElement[index].remove();
    });
});
