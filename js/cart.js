// ===================================
// SHOPPING CART SYSTEM
// ===================================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartUI();
        console.log('🛒 Shopping cart initialized');
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('aguirre_cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('aguirre_cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    // Add item to cart
    addItem(course) {
        const existingItem = this.items.find(item => item.id === course.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: course.id,
                name: course.name,
                price: course.price,
                image: course.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.showAddedNotification(course.name);
        console.log('✅ Added to cart:', course.name);
    }

    // Remove item from cart
    removeItem(courseId) {
        this.items = this.items.filter(item => item.id !== courseId);
        this.saveCart();
        console.log('🗑️ Removed from cart:', courseId);
    }

    // Update item quantity
    updateQuantity(courseId, quantity) {
        const item = this.items.find(item => item.id === courseId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        console.log('🧹 Cart cleared');
    }

    // Update cart UI (counter badge)
    updateCartUI() {
        const cartBadge = document.getElementById('cart-count');
        const count = this.getItemCount();

        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Show notification when item is added
    showAddedNotification(courseName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
                <i class="fas fa-check-circle text-2xl"></i>
                <div>
                    <p class="font-bold">¡Agregado al carrito!</p>
                    <p class="text-sm">${courseName}</p>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Export for use in other scripts
window.ShoppingCart = cart;
