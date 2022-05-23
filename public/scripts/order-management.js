const updateOrderFormElements = document.querySelectorAll('.order-actions form');

updateOrderFormElements.forEach((el) => {
    el.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;

        // eslint-disable-next-line no-undef
        const formData = new FormData(form);
        const newStatus = formData.get('status');
        const orderId = formData.get('orderid');
        const csrfToken = formData.get('_csrf');

        let response;

        try {
            // eslint-disable-next-line no-undef
            response = await fetch(`/admin/orders/${orderId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    newStatus,
                    _csrf: csrfToken,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            // eslint-disable-next-line no-undef
            alert('Something went wrong - could not update order status.');
            return;
        }

        if (!response.ok) {
            // eslint-disable-next-line no-undef
            alert('Something went wrong - could not update order status.');
            return;
        }

        const responseData = await response.json();

        form.parentElement.parentElement.querySelector('.badge').textContent = responseData
            .newStatus.toUpperCase();
    });
});
