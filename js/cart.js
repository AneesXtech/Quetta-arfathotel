/**
 * Quetta Arfat Hotel - Cart Management System (Red Theme)
 * Primary: Dark Red (#8B0000) | Secondary: Light Red (#FF4D4D)
 */

const CART_STORAGE_KEY = 'qa-cart-v1';
const TAX_RATE = 0.05; // 5%

// Get current cart array from localStorage
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage:', e);
    return [];
  }
}

// Save cart array to localStorage and notify listeners
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
}

// Add item to cart or increase quantity
function addToCart(item, quantity = 1, instructions = '') {
  let cart = getCart();
  const existingIndex = cart.findIndex(i => i.id === item.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
    if (instructions) {
      cart[existingIndex].instructions = instructions;
    }
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      nameUrdu: item.nameUrdu || '',
      price: Number(item.price),
      image: item.image,
      quantity: Math.max(1, quantity),
      instructions: instructions ? instructions.trim() : ''
    });
  }

  saveCart(cart);
  showToast(`${item.name} added to cart!`);
}

// Update quantity of an item
function updateQuantity(itemId, quantity) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter(i => i.id !== itemId);
  } else {
    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }
  saveCart(cart);
}

// Remove single item from cart
function removeFromCart(itemId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== itemId);
  saveCart(cart);
}

// Clear all items from cart
function clearCart() {
  saveCart([]);
}

// Get calculated totals
function getCartTotals() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + tax;

  return { count, subtotal, tax, grandTotal, cart };
}

// Calculate ready estimate time (+60 mins)
function getReadyTimeEstimate() {
  const future = new Date(Date.now() + 60 * 60 * 1000);
  const dateStr = future.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = future.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return { date: dateStr, time: timeStr };
}

// Open Cart Drawer
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer-container');
  if (drawer) {
    drawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
  }
}

// Close Cart Drawer
function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer-container');
  if (drawer) {
    drawer.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Render the Cart Drawer HTML
function renderCartDrawer() {
  const drawerContent = document.getElementById('cart-drawer-content');
  if (!drawerContent) return;

  const { count, subtotal, tax, grandTotal, cart } = getCartTotals();
  const estimate = getReadyTimeEstimate();

  if (cart.length === 0) {
    drawerContent.innerHTML = `
      <div class="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center min-h-[60vh] bg-white">
        <span class="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/50"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        </span>
        <div>
          <p class="text-lg font-bold text-foreground">Your cart is empty</p>
          <p class="mt-1 text-sm text-muted-foreground">Add something delicious from the menu</p>
        </div>
        <button onclick="closeCartDrawer(); window.location.href='#menu';" class="mt-2 flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95 shadow-md">
          Browse Menu
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
      </div>
    `;
    return;
  }

  drawerContent.innerHTML = `
    <!-- Items List -->
    <div class="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 bg-white">
      ${cart.map(item => `
        <div class="flex items-center gap-3 rounded-2xl border border-border bg-white p-3 shadow-xs">
          <div class="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
            <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover">
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="truncate text-sm font-bold text-foreground">${item.name}</h3>
            ${item.nameUrdu ? `<p class="text-xs text-muted-foreground">${item.nameUrdu}</p>` : ''}
            <p class="font-display mt-0.5 text-base text-primary">Rs. ${item.price * item.quantity}</p>
            ${item.instructions ? `<p class="mt-0.5 truncate text-[11px] italic text-muted-foreground">“${item.instructions}”</p>` : ''}
          </div>
          <div class="flex shrink-0 items-center gap-1.5 rounded-xl border border-border p-1 bg-background">
            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="flex h-7 w-7 items-center justify-center rounded-lg text-primary transition-colors hover:bg-red-50 hover:text-red-600" aria-label="Decrease quantity">
              ${item.quantity <= 1 ? `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              ` : `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path></svg>
              `}
            </button>
            <span class="w-5 text-center text-sm font-extrabold text-foreground">${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-white transition-transform hover:scale-105 active:scale-95" aria-label="Increase quantity">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
            </button>
          </div>
        </div>
      `).join('')}

      <button onclick="closeCartDrawer(); window.location.href='#menu';" class="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 py-3 text-sm font-bold text-primary transition-colors hover:border-primary/60 hover:bg-primary/5">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        Add more items
      </button>

      <!-- Bill Breakdown -->
      <div class="rounded-2xl border border-border bg-white p-4 space-y-2.5">
        <div class="flex items-center justify-between text-sm">
          <span class="flex items-center gap-2 text-muted-foreground">Subtotal</span>
          <span class="font-bold">Rs. ${subtotal}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="flex items-center gap-2 text-muted-foreground">Tax (5%)</span>
          <span class="font-bold">Rs. ${tax}</span>
        </div>
        <div class="flex items-center justify-between border-t border-dashed border-border pt-3">
          <span class="text-base font-extrabold text-foreground">Grand Total</span>
          <span class="font-display text-2xl text-primary">Rs. ${grandTotal}</span>
        </div>
      </div>
    </div>

    <!-- Drawer Footer -->
    <div class="border-t border-border bg-white p-4 shadow-lg">
      <button onclick="closeCartDrawer(); window.location.href='checkout.html';" class="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white transition-all hover:bg-[#6e0000] active:scale-[0.99] shadow-md">
        Proceed to Checkout
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </button>
      <p class="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        Ready in approx 60 minutes — <span class="font-bold text-foreground">${estimate.date}</span> at <span class="rounded-md bg-secondary/20 px-1.5 py-0.5 font-bold text-primary">${estimate.time}</span>
      </p>
    </div>
  `;
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-2xl transition-all duration-300 pointer-events-none opacity-0 translate-y-2';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary"><path d="M20 6 9 17l-5-5"></path></svg>
    <span>${message}</span>
  `;

  toast.classList.remove('opacity-0', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-2');
  }, 2200);
}

// Synchronize all UI elements on cart updates
function syncCartUI() {
  const { count, grandTotal } = getCartTotals();

  // Header badges
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    el.textContent = count;
    if (count > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Floating Cart Pill
  const floatingPill = document.getElementById('floating-cart-pill');
  if (floatingPill) {
    if (count > 0) {
      floatingPill.classList.remove('hidden');
      const countEl = floatingPill.querySelector('.pill-count');
      const totalEl = floatingPill.querySelector('.pill-total');
      if (countEl) countEl.textContent = count;
      if (totalEl) totalEl.textContent = `Rs. ${grandTotal}`;
    } else {
      floatingPill.classList.add('hidden');
    }
  }

  // Update Drawer if open
  renderCartDrawer();
}

// Global event listeners
window.addEventListener('cartUpdated', syncCartUI);
document.addEventListener('DOMContentLoaded', syncCartUI);
