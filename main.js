document.addEventListener('DOMContentLoaded', function() {
    // Initialize quantity
    let quantity = 0;
    
    // DOM Elements
    const menuBtn = document.querySelector('.menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const navLinks = document.querySelector('.links');
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityDisplay = document.querySelector('.quantity');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartContent = document.querySelector('.cart-content');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    // Mobile Menu Toggle
    menuBtn && menuBtn.addEventListener('click', () => {
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
    });

    closeMenuBtn && closeMenuBtn.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Cart Toggle
    cartIcon && cartIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        cartDropdown.classList.toggle('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cart-icon') && !e.target.closest('.cart-dropdown')) {
            cartDropdown.classList.remove('active');
        }
    });

    // Image Gallery
    let currentImageIndex = 0;
    const imageSources = [
        'images/image-product-1.jpg',
        'images/image-product-2.jpg',
        'images/image-product-3.jpg',
        'images/image-product-4.jpg'
    ];

    function updateMainImage(index) {
        mainImage.src = imageSources[index];
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
        currentImageIndex = index;
    }

    // Thumbnail click handler
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });

    // Lightbox functionality
    if (mainImage && lightbox && lightboxImg) {
        mainImage.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = imageSources[currentImageIndex];
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Next/Previous image navigation
    function showNextImage() {
        const nextIndex = (currentImageIndex + 1) % imageSources.length;
        updateMainImage(nextIndex);
        if (lightbox.style.display === 'flex') {
            lightboxImg.src = imageSources[nextIndex];
        }
    }

    function showPrevImage() {
        const prevIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        updateMainImage(prevIndex);
        if (lightbox.style.display === 'flex') {
            lightboxImg.src = imageSources[prevIndex];
        }
    }

    // Navigation buttons
    nextBtn && nextBtn.addEventListener('click', showNextImage);
    prevBtn && prevBtn.addEventListener('click', showPrevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Quantity Selector
    function updateQuantityDisplay() {
        if (quantity < 0) quantity = 0; // Ensure quantity is never negative
        if (quantityDisplay) {
            quantityDisplay.textContent = quantity;
            console.log('Quantity updated to:', quantity);
        }
    }

    // Quantity button event listeners
    if (minusBtn) {
        minusBtn.style.pointerEvents = 'auto';
        minusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (quantity > 0) {
                quantity--;
                cartCount.innerHTML = quantity;
                const totalPrice = (125 * quantity).toFixed(2);
                cartContent.innerHTML = `
                <div class="cart-header">Cart</div>
                <div class="cart-items">
                    <div class="cart-item">
                        <img src="images/image-product-1-thumbnail.jpg" alt="Fall Limited Edition Sneakers" class="cart-item-image">
                        <div class="cart-item-details">
                            <p>Fall Limited Edition Sneakers</p>
                            <p>$125.00 x ${quantity} <span class="cart-item-total">$${totalPrice}</span></p>
                        </div>
                        <button class="delete-item">
                            <img src="images/icon-delete.svg" alt="Remove">
                        </button>
                    </div>
                    <button class="checkout-btn">Checkout</button>
                </div>`;
                updateQuantityDisplay();
                
                // Reset add to cart button when quantity reaches 0
                if (quantity === 0 && addToCartBtn) {
                    addToCartBtn.textContent = 'Add to Cart';
                    addToCartBtn.style.pointerEvents = 'auto';
                    addToCartBtn.style.opacity = '1';
                }
            }
        });
    }

    if (plusBtn) {
        plusBtn.style.pointerEvents = 'auto';
        plusBtn.addEventListener('click', (e) => {
            addToCartBtn.textContent = 'Added to Cart';
            addToCartBtn.style.pointerEvents = 'none';
            addToCartBtn.style.opacity = '.7';
            e.preventDefault();
            quantity++;
            cartCount.innerHTML = quantity;
            const totalPrice = (125 * quantity).toFixed(2);
            cartContent.innerHTML = `
            <div class="cart-header">Cart</div>
            <div class="cart-items">
                <div class="cart-item">
                    <img src="images/image-product-1-thumbnail.jpg" alt="Fall Limited Edition Sneakers" class="cart-item-image">
                    <div class="cart-item-details">
                        <p>Fall Limited Edition Sneakers</p>
                        <p>$125.00 x ${quantity} <span class="cart-item-total">$${totalPrice}</span></p>
                    </div>
                    <button class="delete-item">
                        <img src="images/icon-delete.svg" alt="Remove">
                    </button>
                </div>
                <button class="checkout-btn">Checkout</button>
            </div>`;    
            updateQuantityDisplay();
        });
    }

    // Function to disable quantity controls
    function disableQuantityControls(disable = true) {
        if (plusBtn) plusBtn.style.pointerEvents = disable ? 'none' : 'auto';
        if (minusBtn) minusBtn.style.pointerEvents = disable ? 'none' : 'auto';
        if (quantityDisplay) quantityDisplay.style.opacity = disable ? '0.5' : '1';
    }

    // Add to Cart
    addToCartBtn && addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Add to cart clicked');
        
        // Get the current display quantity
        const displayQty = parseInt(quantityDisplay.textContent) || 0;
        const qtyToAdd = displayQty > 0 ? displayQty : 1;
        
        console.log('Adding to cart with quantity:', qtyToAdd);
        
        // Ensure cart count element exists
        if (!cartCount) {
            console.error('Cart count element not found');
            return;
        }
        
        // Update cart count and reset quantity display
        const currentCount = parseInt(cartCount.textContent || '0');
        const newQuantity = currentCount + qtyToAdd;
        cartCount.textContent = newQuantity;
        cartCount.style.display = 'flex';
        
        // Set quantity display to 1 after adding to cart
        quantity = 1;
        quantityDisplay.textContent = '1';
        
        console.log('Updated cart count to:', newQuantity, 'Display quantity set to 1');
        
        // Disable controls during animation
        disableQuantityControls(true);
        
        // Save original button state
        const originalHTML = addToCartBtn.innerHTML;
        const originalText = addToCartBtn.textContent;
        
        // Update button to show added state
        addToCartBtn.style.pointerEvents = 'none';
        addToCartBtn.style.opacity = '0.7';
        addToCartBtn.textContent = 'Added to Cart';
        
        // Reset add to cart button after 2 seconds
        setTimeout(() => {
            if (addToCartBtn) {
                addToCartBtn.style.pointerEvents = 'auto';
                addToCartBtn.style.opacity = '1';
                addToCartBtn.textContent = "Add to Cart";
            }
        }, 2000);
        cartCount.innerHTML = quantity;
        // Update cart content
        cartContent.innerHTML = `
            <div class="cart-header">Cart</div>
            <div class="cart-items">
                <div class="cart-item">
                    <img src="images/image-product-1-thumbnail.jpg" alt="Fall Limited Edition Sneakers" class="cart-item-image">
                    <div class="cart-item-details">
                        <p>Fall Limited Edition Sneakers</p>
                        <p>$125.00 x 1 <span class="cart-item-total">$125</span></p>
                    </div>
                    <button class="delete-item">
                        <img src="images/icon-delete.svg" alt="Remove">
                    </button>
                </div>
                <button class="checkout-btn">Checkout</button>
            </div>`;

        // Add delete functionality
        const deleteBtn = cartContent.querySelector('.delete-item');
        deleteBtn && deleteBtn.addEventListener('click', () => {
            cartCount.style.display = 'none';
            cartCount.textContent = '0';
            cartContent.innerHTML = '<p>Your cart is empty</p>';
            console.log('Cart cleared');
        });

        // Add checkout functionality
        const checkoutBtn = cartContent.querySelector('.checkout-btn');
        checkoutBtn && checkoutBtn.addEventListener('click', () => {
            console.log('Proceeding to checkout');
            // Add your checkout logic here
            alert('Proceeding to checkout!');
        });

        // Re-enable after 2 seconds
        setTimeout(() => {
            addToCartBtn.style.pointerEvents = 'none';
            addToCartBtn.style.opacity = '.7';
            addToCartBtn.textContent = "Added to Cart";
            disableQuantityControls(false);
        }, 2000);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cart-dropdown') && !e.target.closest('.cart-icon')) {
            cartDropdown && cartDropdown.classList.remove('active');
        }
    });

    // Handle keyboard navigation for menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navLinks) navLinks.classList.remove('active');
            if (cartDropdown) cartDropdown.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Close lightbox if open
            const lightbox = document.querySelector('.lightbox');
            if (lightbox && window.getComputedStyle(lightbox).display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});
