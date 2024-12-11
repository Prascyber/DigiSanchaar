document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const updateCartButton = document.getElementById('update-cart');
    const checkoutButton = document.getElementById('checkout');
    const checkoutSection = document.getElementById('checkout-section');
    const checkoutForm = document.getElementById('payment-form');
    const paymentMethod = document.getElementById('payment-method');
    const upiDetails = document.getElementById('upi-details');

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <input type="number" value="${item.quantity}" min="1" class="quantity">
                <button class="remove">Remove</button>
            `;
            cartItems.appendChild(itemElement);

            total += item.price * item.quantity;

            itemElement.querySelector('.quantity').addEventListener('change', (e) => {
                item.quantity = Number(e.target.value);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                updateCartCount();
            });

            itemElement.querySelector('.remove').addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.name !== item.name);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                updateCartCount();
            });
        });

        cartTotal.textContent = `Total: ₹${total}`;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const name = productCard.getAttribute('data-name');
            const price = Number(productCard.getAttribute('data-price'));
            const img = productCard.querySelector('img').src;
            const quantity = Number(productCard.querySelector('.quantity').value);

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, img, quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });

    if (updateCartButton) {
        updateCartButton.addEventListener('click', () => {
            updateCartDisplay();
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            checkoutSection.style.display = 'block';
            window.scrollTo(0, checkoutSection.offsetTop);
        });
    }

    if (paymentMethod) {
        paymentMethod.addEventListener('change', () => {
            if (paymentMethod.value === 'upi') {
                upiDetails.style.display = 'block';
            } else {
                upiDetails.style.display = 'none';
            }
        });
    }

    if (checkoutForm) {
        document.getElementById('rzp-button1').addEventListener('click', (e) => {
            e.preventDefault();
            if (paymentMethod.value === 'upi' && !document.getElementById('transaction-id').value) {
                alert('Please enter the UPI transaction ID.');
                return;
            }

            const options = {
                key: 'rzp_test_clFGpdM8o2QECc', // Replace with your Razorpay key
                amount: parseInt(cartTotal.textContent.replace('Total: ₹', '')) * 100, // Amount in paise
                currency: 'INR',
                name: 'Your Business Name',
                description: 'Test Transaction',
                image: 'https://example.com/your_logo',
                handler: function (response) {
                    if (response.razorpay_payment_id) {
                        alert('Payment Successful! Thank you for your purchase.');
                        localStorage.removeItem('cart');
                        cart = [];
                        updateCartCount();
                        updateCartDisplay();
                        checkoutSection.style.display = 'none';
                    } else {
                        alert('Payment failed. Please try again.');
                    }
                },
                prefill: {
                    name: document.getElementById('name').value,
                    email: 'customer@example.com', // You can add dynamic email here
                    contact: '9000090000' // You can add dynamic contact here
                },
                notes: {
                    address: document.getElementById('address').value
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        });
    }

    updateCartCount();
    updateCartDisplay();
});
