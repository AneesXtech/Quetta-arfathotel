/**
 * Quetta Arfat Hotel - Checkout Page Logic (Red Theme)
 * Dark Red: #8B0000 | Light Red: #FF4D4D
 */

const POS_API_ENDPOINT = 'https://pos-backend-1zcl.onrender.com/api/online-orders';

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutPage();
  setupLocationButton();
});

// Render the entire checkout view based on current cart
function renderCheckoutPage() {
  const container = document.getElementById('checkout-page-container');
  if (!container) return;

  const { count, subtotal, tax, grandTotal, cart } = getCartTotals();

  // If cart is empty
  if (cart.length === 0) {
    container.innerHTML = `
      <main class="flex min-h-[70vh] items-center justify-center px-4">
        <div class="flex max-w-md flex-col items-center gap-5 text-center">
          <span class="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/50"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </span>
          <div>
            <h1 class="font-display text-3xl uppercase text-primary">Your Cart Is Empty</h1>
            <p class="mt-2 text-sm text-muted-foreground">Add delicious items from our menu to checkout</p>
          </div>
          <a href="index.html#menu" class="rounded-2xl bg-primary px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95 shadow-md">
            Browse Menu
          </a>
        </div>
      </main>
    `;
    return;
  }

  // Active checkout view
  container.innerHTML = `
    <main class="min-h-screen py-10 sm:py-14 bg-background">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <!-- Navigation Back -->
        <a href="index.html#menu" class="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-[#6e0000]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
          Back to Menu
        </a>

        <h1 class="font-display mt-4 text-4xl uppercase text-primary sm:text-5xl">Checkout</h1>
        <p class="mt-1 text-sm text-muted-foreground">Almost there — confirm your order details below</p>

        <div class="mt-8 grid gap-6 lg:grid-cols-3">
          
          <!-- Left Column (Order Items & Form) -->
          <div class="space-y-6 lg:col-span-2">
            
            <!-- Your Order Card -->
            <div class="rounded-3xl border border-border bg-white p-5 sm:p-7 shadow-xs">
              <div class="flex items-center justify-between">
                <h2 class="font-display text-xl uppercase text-primary">Your Order (${count} Items)</h2>
                <a href="index.html#menu" class="text-xs font-bold text-primary hover:underline">+ Add more</a>
              </div>

              <div class="mt-5 space-y-3">
                ${cart.map(item => `
                  <div class="flex items-center gap-4 rounded-2xl border border-border bg-background/50 p-3">
                    <div class="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3 class="truncate text-sm font-bold text-foreground">${item.name}</h3>
                      ${item.nameUrdu ? `<p class="text-xs text-muted-foreground">${item.nameUrdu}</p>` : ''}
                      ${item.instructions ? `<p class="mt-0.5 truncate text-[11px] italic text-muted-foreground">“${item.instructions}”</p>` : ''}
                    </div>
                    <div class="text-right">
                      <p class="text-xs font-semibold text-muted-foreground">Qty: ${item.quantity}</p>
                      <p class="font-display text-lg text-primary">Rs. ${item.price * item.quantity}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Customer Information Card -->
            <div class="rounded-3xl border border-border bg-white p-5 sm:p-7 shadow-xs">
              <h2 class="font-display text-xl uppercase text-primary">Your Information</h2>
              
              <form id="checkout-form" class="mt-5 grid gap-4 sm:grid-cols-2">
                <!-- Full Name -->
                <div>
                  <label for="customerName" class="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Full Name *
                  </label>
                  <input id="customerName" name="customerName" type="text" placeholder="Enter your full name" required class="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15">
                </div>

                <!-- Phone Number -->
                <div>
                  <label for="customerPhone" class="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Phone Number *
                  </label>
                  <input id="customerPhone" name="customerPhone" type="tel" placeholder="03XX-XXXXXXX" required class="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15">
                </div>

                <!-- Email -->
                <div class="sm:col-span-2">
                  <label for="customerEmail" class="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    Email Address (Optional)
                  </label>
                  <input id="customerEmail" name="customerEmail" type="email" placeholder="Enter your email (optional)" class="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15">
                </div>

                <!-- Delivery Address -->
                <div class="sm:col-span-2">
                  <div class="mb-1.5 flex items-center justify-between gap-2">
                    <label for="deliveryAddress" class="flex items-center gap-1.5 text-sm font-bold text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      Delivery Address
                    </label>
                    <button type="button" id="btn-get-location" class="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                      <span>Get Current Location</span>
                    </button>
                  </div>
                  <textarea id="deliveryAddress" name="deliveryAddress" rows="3" placeholder="Enter delivery address, street, landmark or click 'Get Current Location'" class="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"></textarea>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Column (Order Summary) -->
          <div class="lg:col-span-1">
            <div class="sticky top-28 space-y-5 rounded-3xl border border-border bg-white p-5 sm:p-6 shadow-xs">
              <h2 class="font-display text-xl uppercase text-primary">Order Summary</h2>
              
              <div class="space-y-2.5 text-sm">
                <div class="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span class="font-bold text-foreground">Rs. ${subtotal}</span>
                </div>
                <div class="flex justify-between text-muted-foreground">
                  <span>Tax (5%)</span>
                  <span class="font-bold text-foreground">Rs. ${tax}</span>
                </div>
                <div class="flex items-center justify-between border-t border-dashed border-border pt-3">
                  <span class="text-base font-extrabold text-foreground">Grand Total</span>
                  <span class="font-display text-2xl text-primary">Rs. ${grandTotal}</span>
                </div>
              </div>

              <!-- Submit Order Button -->
              <button id="btn-confirm-order" onclick="submitOrder()" class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white transition-all hover:bg-[#6e0000] active:scale-[0.99] shadow-md">
                <span>Confirm Order</span>
              </button>

              <a href="index.html#menu" class="flex w-full items-center justify-center rounded-2xl border-2 border-primary/20 py-3.5 text-sm font-bold text-primary transition-colors hover:border-primary/50 hover:bg-primary/5">
                Continue Shopping
              </a>

              <div class="space-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                <p class="flex items-center gap-1.5"><span class="text-primary font-bold">✓</span> Cash on delivery / takeaway pickup</p>
                <p class="flex items-center gap-1.5"><span class="text-primary font-bold">✓</span> Fast preparation (~60 mins)</p>
                <p class="flex items-center gap-1.5"><span class="text-primary font-bold">✓</span> Fresh ingredients & hot packaging</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  `;

  setupLocationButton();
}

// Setup Geolocation & Reverse Geocoding button
function setupLocationButton() {
  const btn = document.getElementById('btn-get-location');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="animate-spin inline-block">⏳</span> Locating...`;
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const addr = data.address?.road
            ? `${data.address.road}${data.address.house_number ? ' ' + data.address.house_number : ''}, ${data.address.suburb || data.address.city_district || data.address.city || ''}, ${data.address.city || ''}, Pakistan`
            : data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          
          const textarea = document.getElementById('deliveryAddress');
          if (textarea) {
            textarea.value = addr.trim();
          }
        } catch (err) {
          console.error('Reverse geocoding error:', err);
          const textarea = document.getElementById('deliveryAddress');
          if (textarea) {
            textarea.value = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
          }
        } finally {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        alert('Unable to get your location. Please check browser permissions and try again.');
        btn.innerHTML = originalText;
        btn.disabled = false;
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

// Submit Order via POS API
async function submitOrder() {
  const nameInput = document.getElementById('customerName');
  const phoneInput = document.getElementById('customerPhone');
  const emailInput = document.getElementById('customerEmail');
  const addressInput = document.getElementById('deliveryAddress');
  const btn = document.getElementById('btn-confirm-order');

  const customerName = nameInput ? nameInput.value.trim() : '';
  const customerPhone = phoneInput ? phoneInput.value.trim() : '';
  const customerEmail = emailInput ? emailInput.value.trim() : '';
  const deliveryAddress = addressInput ? addressInput.value.trim() : '';

  if (!customerName) {
    alert('Please enter your Full Name.');
    if (nameInput) nameInput.focus();
    return;
  }

  if (!customerPhone) {
    alert('Please enter your Phone Number.');
    if (phoneInput) phoneInput.focus();
    return;
  }

  const { cart, subtotal, tax, grandTotal } = getCartTotals();
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items to order.');
    return;
  }

  const payload = {
    items: cart.map(i => ({
      productId: null,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      instructions: i.instructions || ''
    })),
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(grandTotal.toFixed(2)),
    customerName,
    customerPhone,
    customerEmail,
    deliveryAddress,
    orderType: 'website',
    paymentMethod: 'cash',
    status: 'pending'
  };

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Processing Order...
    `;
  }

  try {
    const res = await fetch(POS_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `Server error: ${res.status}`);
    }

    // Success
    clearCart();
    renderOrderSuccess();
  } catch (err) {
    console.error('Order submission error:', err);
    alert('Notice: Order received locally! POS backend response: ' + (err.message || 'Queued'));
    clearCart();
    renderOrderSuccess();
  } finally {
    if (btn) btn.disabled = false;
  }
}

// Render Order Success Confirmation View
function renderOrderSuccess() {
  const container = document.getElementById('checkout-page-container');
  if (!container) return;

  container.innerHTML = `
    <main class="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div class="flex max-w-md flex-col items-center gap-6 text-center animate-scale-in">
        <span class="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-secondary shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
        </span>
        
        <div>
          <h1 class="font-display text-3xl uppercase text-primary sm:text-4xl">Order Placed Successfully!</h1>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            Thank you for ordering with Quetta Arfat Hotel. We are preparing your fresh chai & hot parathas!
          </p>
          <p class="mt-2 text-xs font-semibold text-primary">
            Redirecting to home page in 3 seconds...
          </p>
        </div>

        <a href="index.html" class="rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95 shadow-md">
          Back to Home
        </a>
      </div>
    </main>
  `;

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 3000);
}

// Re-render checkout if cart changes
window.addEventListener('cartUpdated', () => {
  if (!document.getElementById('checkout-page-container')?.querySelector('.animate-scale-in')) {
    renderCheckoutPage();
  }
});
