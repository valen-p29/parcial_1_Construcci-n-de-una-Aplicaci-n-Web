// Cart functionality and authentication state
let cart = [];
let currentFilter = 'all';
let searchTerm = '';
let isAuthenticated = false; // Add authentication state
let products = []; // Store loaded products

// DOM elements - will be initialized after components load
let productsGrid, cartBtn, cartSidebar, cartItems, cartTotal, loginBtn, loginModal, 
    closeModal, closeCart, filterBtns, navLinks, loginForm, btnSearch,
    collectionModal, closeCollectionModal, viewCollectionBtn, quickViewModal, closeQuickViewModal;

// Hardcoded credentials
const VALID_CREDENTIALS = {
    email: 'admin@fashionstore.com',
    password: 'admin123'
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponents();
    initializeDOMElements();
    await loadProducts();
    renderProducts('all');
    setupEventListeners();
    updateAuthUI(); // Initialize auth UI state
});

// Initialize DOM elements after components are loaded
function initializeDOMElements() {
    productsGrid = document.getElementById('productsGrid');
    cartBtn = document.getElementById('cartBtn');
    cartSidebar = document.getElementById('cartSidebar');
    cartItems = document.getElementById('cartItems');
    cartTotal = document.getElementById('cartTotal');
    loginBtn = document.getElementById('loginBtn');
    loginModal = document.getElementById('loginModal');
    closeModal = document.querySelector('.close');
    closeCart = document.querySelector('.close-cart');
    filterBtns = document.querySelectorAll('.filter-btn');
    navLinks = document.querySelectorAll('.nav-link');
    loginForm = document.getElementById('loginForm');
    btnSearch = document.querySelector('.btn-search');
    collectionModal = document.getElementById('collectionModal');
    closeCollectionModal = document.getElementById('closeCollectionModal');
    viewCollectionBtn = document.getElementById('viewCollectionBtn');
    quickViewModal = document.getElementById('quickViewModal');
    closeQuickViewModal = document.getElementById('closeQuickViewModal');
}

// Load HTML components
async function loadComponents() {
    try {
        // Load header
        const headerResponse = await fetch('pages/header.html');
        if (headerResponse.ok) {
            const headerHTML = await headerResponse.text();
            document.querySelector('.card-header').innerHTML = headerHTML;
        }
        
        // Load footer
        const footerResponse = await fetch('pages/footer.html');
        if (footerResponse.ok) {
            const footerHTML = await footerResponse.text();
            document.querySelector('.card-footer').innerHTML = footerHTML;
        }
        
        console.log('Components loaded successfully');
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Load products from JSON file
async function loadProducts() {
    try {
        const response = await fetch('data/product.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        products = data.products;
        console.log('Products loaded successfully:', products.length, 'items');
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Error al cargar los productos');
        // Fallback: use empty array
        products = [];
    }
}

// Setup event listeners
function setupEventListeners() {
    // Cart events
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Search functionality
    btnSearch.addEventListener('click', toggleSearch);
    
    // Login modal events
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    
    // Filter events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            currentFilter = filter;
            renderProducts(filter);
            updateActiveFilter(e.target);
        });
    });
    
    // Navigation links events (header and footer)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            if (category) {
                currentFilter = category;
                renderProducts(category);
                updateActiveNavLink(e.target);
                // Also update filter buttons
                const correspondingFilterBtn = document.querySelector(`[data-filter="${category}"]`);
                if (correspondingFilterBtn) {
                    updateActiveFilter(correspondingFilterBtn);
                }
                // Scroll to products section
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Footer category links
    const footerCategoryLinks = document.querySelectorAll('.footer-links a[data-category]');
    footerCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            if (category) {
                currentFilter = category;
                renderProducts(category);
                // Update filter buttons
                const correspondingFilterBtn = document.querySelector(`[data-filter="${category}"]`);
                if (correspondingFilterBtn) {
                    updateActiveFilter(correspondingFilterBtn);
                }
                // Scroll to products section
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSubscription);
    }
    
    // Collection modal events
    if (viewCollectionBtn) {
        viewCollectionBtn.addEventListener('click', () => {
            collectionModal.style.display = 'block';
        });
    }
    
    if (closeCollectionModal) {
        closeCollectionModal.addEventListener('click', () => {
            collectionModal.style.display = 'none';
        });
    }
    
    // Collection category buttons
    const categoryBtns = document.querySelectorAll('.btn-category');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.closest('.collection-category').dataset.category;
            collectionModal.style.display = 'none';
            currentFilter = category;
            renderProducts(category);
            // Update filter buttons
            const correspondingFilterBtn = document.querySelector(`[data-filter="${category}"]`);
            if (correspondingFilterBtn) {
                updateActiveFilter(correspondingFilterBtn);
            }
            // Scroll to products section
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Quick View modal events
    if (closeQuickViewModal) {
        closeQuickViewModal.addEventListener('click', () => {
            quickViewModal.style.display = 'none';
        });
    }
    
    // Size selection
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('size-btn')) {
            document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
    
    // Quantity controls
    const decreaseQty = document.getElementById('decreaseQty');
    const increaseQty = document.getElementById('increaseQty');
    const qtyInput = document.getElementById('quickViewQty');
    
    if (decreaseQty) {
        decreaseQty.addEventListener('click', () => {
            const currentQty = parseInt(qtyInput.value);
            if (currentQty > 1) {
                qtyInput.value = currentQty - 1;
            }
        });
    }
    
    if (increaseQty) {
        increaseQty.addEventListener('click', () => {
            const currentQty = parseInt(qtyInput.value);
            if (currentQty < 10) {
                qtyInput.value = currentQty + 1;
            }
        });
    }
    
    // Add to cart from quick view
    const addToCartQuick = document.getElementById('addToCartQuick');
    if (addToCartQuick) {
        addToCartQuick.addEventListener('click', () => {
            const productId = parseInt(quickViewModal.dataset.productId);
            const quantity = parseInt(qtyInput.value);
            const selectedSize = document.querySelector('.size-btn.active').dataset.size;
            
            addToCartWithDetails(productId, quantity, selectedSize);
            quickViewModal.style.display = 'none';
        });
    }
    
    // Buy now button
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const productId = parseInt(quickViewModal.dataset.productId);
            const quantity = parseInt(qtyInput.value);
            const selectedSize = document.querySelector('.size-btn.active').dataset.size;
            
            addToCartWithDetails(productId, quantity, selectedSize);
            quickViewModal.style.display = 'none';
            toggleCart(); // Open cart
            showNotification('¡Producto listo para comprar!');
        });
    }
    
    // Wishlist from quick view
    const quickViewWishlist = document.getElementById('quickViewWishlist');
    if (quickViewWishlist) {
        quickViewWishlist.addEventListener('click', () => {
            const productId = parseInt(quickViewModal.dataset.productId);
            addToWishlist(productId);
        });
    }
}

// Toggle search functionality
function toggleSearch() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.remove();
        searchTerm = '';
        renderProducts(currentFilter);
        document.body.classList.remove('search-active');
    } else {
        const searchHTML = `
            <div class="search-bar">
                <div class="search-bar-container">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" class="search-input" placeholder="Buscar productos, marcas, categorías..." id="searchInput">
                        <button class="search-clear" id="clearSearch" style="display: none;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="search-suggestions">
                        <div class="suggestion-item" onclick="filterByCategory('hombre')">
                            <i class="fas fa-tshirt"></i>
                            <span>Hombre</span>
                        </div>
                        <div class="suggestion-item" onclick="filterByCategory('mujer')">
                            <i class="fas fa-female"></i>
                            <span>Mujer</span>
                        </div>
                        <div class="suggestion-item" onclick="filterByCategory('accesorios')">
                            <i class="fas fa-gem"></i>
                            <span>Accesorios</span>
                        </div>
                        <div class="suggestion-item" onclick="filterByCategory('all')">
                            <i class="fas fa-th-large"></i>
                            <span>Ver Todo</span>
                        </div>
                        <div class="suggestion-item" onclick="searchSuggestion('ofertas')">
                            <i class="fas fa-tags"></i>
                            <span>Ofertas</span>
                        </div>
                    </div>
                    <button class="search-close" onclick="toggleSearch()">
                        <i class="fas fa-times"></i>
                        <span>Cerrar</span>
                    </button>
                </div>
            </div>
        `;
        
        // Insert after header
        const header = document.querySelector('.header');
        header.insertAdjacentHTML('afterend', searchHTML);
        
        // Add search-active class to body
        document.body.classList.add('search-active');
        
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.focus();
        
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            renderProducts(currentFilter);
            
            // Show/hide clear button
            if (e.target.value.length > 0) {
                clearSearch.style.display = 'flex';
            } else {
                clearSearch.style.display = 'none';
            }
        });
        
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            searchTerm = '';
            renderProducts(currentFilter);
            clearSearch.style.display = 'none';
            searchInput.focus();
        });
    }
}

// Render products
function renderProducts(category) {
    let filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Create product card template
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-overlay">
                    <button class="btn-quick-view" onclick="quickViewProduct(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-add-to-wishlist" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${getCategoryDisplayName(product.category)}</p>
                <h4 class="product-name">${product.name}</h4>
                <p class="product-price">${formatCurrency(product.price)}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Añadir al Carrito
                </button>
            </div>
        </div>
    `;
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'hombre': 'Hombre',
        'mujer': 'Mujer',
        'accesorios': 'Accesorios'
    };
    return categoryNames[category] || category;
}

// Update active filter button
function updateActiveFilter(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Add to cart
function addToCart(productId) {
    addToCartWithDetails(productId, 1, 'M');
}

// Add to cart with details (size, quantity)
function addToCartWithDetails(productId, quantity = 1, size = 'M') {
    const product = products.find(p => p.id === productId);
    const cartItemId = `${productId}-${size}`;
    const existingItem = cart.find(item => item.cartId === cartItemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ 
            ...product, 
            cartId: cartItemId,
            quantity: quantity,
            selectedSize: size
        });
    }
    
    updateCartUI();
    showNotification(`Producto añadido al carrito (Talla: ${size}, Cantidad: ${quantity})`);
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
    
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">${formatCurrency(item.price)}</p>
                <p class="cart-item-details">Talla: ${item.selectedSize || 'M'} | Cantidad: ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart('${item.cartId || item.id}')" style="background: none; border: none; color: #ff6b6b; cursor: pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatCurrency(total);
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => (item.cartId || item.id) !== itemId);
    updateCartUI();
}

// Toggle cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    // Validate credentials
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        // Successful login
        isAuthenticated = true;
        updateAuthUI();
        showNotification('¡Bienvenido a Fashion Store!');
        loginModal.style.display = 'none';
        loginForm.reset();
        errorDiv.style.display = 'none';
    } else {
        // Failed login
        errorDiv.style.display = 'block';
        showNotification('Credenciales incorrectas');
        
        // Clear password field
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    }
}

// Update authentication UI
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    if (isAuthenticated) {
        loginBtn.innerHTML = '<i class="fas fa-user"></i>';
        loginBtn.title = 'Perfil de usuario';
        loginBtn.onclick = () => {
            // Show profile dropdown or redirect to profile page
            showNotification('Funciones de perfil en desarrollo');
        };
    } else {
        loginBtn.innerHTML = 'Iniciar Sesión';
        loginBtn.title = '';
        loginBtn.onclick = () => {
            loginModal.style.display = 'block';
        };
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-hover);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle newsletter subscription
function handleNewsletterSubscription() {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Por favor ingresa tu email');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor ingresa un email válido');
        return;
    }
    
    // Simulate subscription
    showNotification('¡Gracias por suscribirte! Recibirás nuestras ofertas exclusivas.');
    emailInput.value = '';
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Format currency in Colombian Pesos
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Quick view product
function quickViewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Populate modal with product data
        document.getElementById('quickViewImage').src = product.image;
        document.getElementById('quickViewImage').alt = product.name;
        document.getElementById('quickViewCategory').textContent = getCategoryDisplayName(product.category);
        document.getElementById('quickViewTitle').textContent = product.name;
        document.getElementById('quickViewPrice').textContent = formatCurrency(product.price);
        document.getElementById('quickViewDescription').textContent = product.description || 'Descripción no disponible.';
        
        // Populate features
        const featuresList = document.getElementById('quickViewFeatures');
        featuresList.innerHTML = '';
        if (product.features && product.features.length > 0) {
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        } else {
            featuresList.innerHTML = '<li>Información de características no disponible</li>';
        }
        
        // Reset quantity and size selection
        document.getElementById('quickViewQty').value = 1;
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.size-btn[data-size="M"]').classList.add('active');
        
        // Store current product ID for cart actions
        quickViewModal.dataset.productId = productId;
        
        // Show modal
        quickViewModal.style.display = 'block';
    }
}

// Add to wishlist (placeholder function)
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} agregado a favoritos`);
        // Here you could implement wishlist functionality
    }
}

// Filter by category function (for suggestion items)
function filterByCategory(category) {
    // Clear any existing search term
    searchTerm = '';
    
    // Set the current filter
    currentFilter = category;
    
    // Update the products display
    renderProducts(category);
    
    // Update active filter button in the main section
    const correspondingFilterBtn = document.querySelector(`[data-filter="${category}"]`);
    if (correspondingFilterBtn) {
        updateActiveFilter(correspondingFilterBtn);
    }
    
    // Update active navigation link in header
    const correspondingNavLink = document.querySelector(`[data-category="${category}"]`);
    if (correspondingNavLink) {
        updateActiveNavLink(correspondingNavLink);
    }
    
    // Close search bar
    toggleSearch();
    
    // Scroll to products section after a small delay
    setTimeout(() => {
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    }, 300);
    
    // Show notification
    const categoryNames = {
        'all': 'Todos los productos',
        'hombre': 'Productos para Hombre',
        'mujer': 'Productos para Mujer',
        'accesorios': 'Accesorios'
    };
    showNotification(`Mostrando: ${categoryNames[category] || category}`);
}

// Search suggestion function (for text searches)
function searchSuggestion(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        searchTerm = term.toLowerCase();
        renderProducts(currentFilter);
        toggleSearch(); // Close search bar
        // Scroll to products section after a small delay to allow for search bar animation
        setTimeout(() => {
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}

// Add slideIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);