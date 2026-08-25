/**
 * Quetta Arfat Hotel - Main Home Page Logic (Red Theme)
 * Line-by-Line Category Banners + Dark Red Horizontal Card + Stepper/Plus on Image + ScrollSpy
 * Categories: All, Paratha, Omelette, Rolls, Tea & Coffee, Drinks, Addons
 */

let activeCategory = 'all';
let searchQuery = '';
let selectedItem = null;
let modalQuantity = 1;
let placeholderInterval = null;
let isProgrammaticScroll = false;

const CATEGORY_BANNERS = {
  paratha: "images/mega-menu/Paratha.jpg",
  omelette: "images/mega-menu/Omelette.jpg",
  rolls: "images/mega-menu/Rolls.jpg",
  tea: "images/mega-menu/Coffer & Tea.jpg",
  drinks: "images/mega-menu/Drinks.jpg",
  addons: "images/mega-menu/addons.jpg"
};

const SEARCH_PLACEHOLDERS = [
  "Search for Alamgir Special Tea...",
  "Search for Lahori Egg Chana...",
  "Search for Cheese Paratha...",
  "Search for Malai Boti Roll...",
  "Search for Nutella Paratha...",
  "Search for Karak Milk Tea...",
  "Search for Chicken Omelette...",
  "Search for Special Halwa Puri...",
  "Search for Kashmiri Pink Chai..."
];

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryBar();
  renderMenu();
  setupSearchInput();
  startRotatingPlaceholder();
  setupMobileMenu();
  setupEscapeKey();
  setupScrollSpy();
});

// Render the top horizontal sticky category navigation bar
function renderCategoryBar() {
  const container = document.getElementById('category-navbar-items');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = activeCategory === cat.id;
    return `
      <div class="transition-all duration-300 ease-out w-fit shrink-0">
        <button onclick="setCategory('${cat.id}')" class="transition-all duration-300 ease-out cursor-pointer whitespace-nowrap capitalize tracking-wide text-sm sm:text-base md:text-lg ${isActive
        ? 'bg-secondary text-white font-medium px-5 sm:px-7 py-1.5 sm:py-2 rounded-full shadow-md scale-105'
        : 'text-white/90 hover:text-white font-medium px-3 sm:px-5 py-1.5 sm:py-2 hover:scale-105'
      }">
          ${cat.name}
        </button>
      </div>
    `;
  }).join('');
}

// Change active category and smoothly scroll to its section
function setCategory(catId) {
  activeCategory = catId;
  renderCategoryBar();

  // If search was active, reset it so full catalog is visible
  if (searchQuery) {
    searchQuery = '';
    const input = document.getElementById('menu-search-input');
    if (input) input.value = '';
    renderMenu();
  }

  isProgrammaticScroll = true;
  setTimeout(() => { isProgrammaticScroll = false; }, 800);

  if (catId === 'all') {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      const yOffset = -60;
      const y = menuSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  } else {
    const targetSection = document.getElementById(`category-section-${catId}`);
    if (targetSection) {
      const yOffset = -65;
      const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}

// Setup ScrollSpy to highlight category tabs while scrolling
function setupScrollSpy() {
  window.addEventListener('scroll', () => {
    if (isProgrammaticScroll || searchQuery) return;

    const sections = CATEGORIES.filter(c => c.id !== 'all')
      .map(c => ({ id: c.id, el: document.getElementById(`category-section-${c.id}`) }))
      .filter(item => item.el !== null);

    const scrollY = window.pageYOffset;
    const menuEl = document.getElementById('menu');

    if (menuEl && scrollY < menuEl.offsetTop - 100) {
      if (activeCategory !== 'all') {
        activeCategory = 'all';
        renderCategoryBar();
      }
      return;
    }

    let current = activeCategory;
    for (const section of sections) {
      const top = section.el.getBoundingClientRect().top;
      if (top <= 120) {
        current = section.id;
      }
    }

    if (current && activeCategory !== current) {
      activeCategory = current;
      renderCategoryBar();
    }
  }, { passive: true });
}

// Dynamic Rotating Search Placeholder (Typewriter Effect)
function startRotatingPlaceholder() {
  const input = document.getElementById('menu-search-input');
  if (!input) return;

  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = SEARCH_PLACEHOLDERS[0];
  let typingSpeed = 70;

  function typePlaceholder() {
    if (document.activeElement === input || input.value.trim().length > 0) {
      setTimeout(typePlaceholder, 1000);
      return;
    }

    currentText = SEARCH_PLACEHOLDERS[index];

    if (!isDeleting) {
      input.placeholder = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2200;
      } else {
        typingSpeed = 60 + Math.random() * 30;
      }
    } else {
      input.placeholder = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % SEARCH_PLACEHOLDERS.length;
        typingSpeed = 400;
      } else {
        typingSpeed = 30;
      }
    }

    placeholderInterval = setTimeout(typePlaceholder, typingSpeed);
  }

  typePlaceholder();
}

// Setup real-time live search input
function setupSearchInput() {
  const input = document.getElementById('menu-search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderMenu();
  });
}

// Rock-Solid Dedicated CSS Product Card (Matching Reference Screenshot to the pixel)
function renderItemCard(item, inCartQty) {
  return `
    <div data-item-id="${item.id}" onclick="openItemModal('${item.id}')" class="menu-item-card">
      
      <!-- Text Area (Left Side): Title, Urdu Subtitle, Crimson Price -->
      <div class="menu-item-left">
        <div>
          <h3 class="menu-item-title">
            ${item.name}
          </h3>
          ${item.nameUrdu ? `
            <p class="menu-item-subtitle">
              ${item.nameUrdu}
            </p>
          ` : ''}
        </div>

        <div class="menu-item-price-row">
          <span class="menu-item-from">From</span>
          <span class="menu-item-price">Rs. ${item.price}</span>
        </div>
      </div>

      <!-- Right Image Box: Locked 124px Square with Pinned Controls -->
      <div class="menu-item-right">
        
        <!-- Food Thumbnail -->
        <img src="${item.image}" alt="${item.name}" loading="lazy" class="menu-item-img">

        <!-- Hot Selling Badge -->
        ${item.isPopular ? `
          <span class="menu-item-badge">
            Hot Selling
          </span>
        ` : ''}

        <!-- Cart Controls -->
        ${inCartQty === 0 ? `
          <button onclick="event.stopPropagation(); quickAddToCart('${item.id}')" class="menu-item-add-btn" type="button" aria-label="Add ${item.name} to cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        ` : `
          <div onclick="event.stopPropagation();" class="menu-item-stepper">
            <button onclick="updateQuantity('${item.id}', ${inCartQty - 1})" class="menu-item-stepper-btn" type="button" aria-label="Decrease quantity">
              ${inCartQty <= 1 ? `
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #ef4444;"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
              ` : `
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="color: #8B0000;"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              `}
            </button>
            <div class="menu-item-stepper-qty">${inCartQty}</div>
            <button onclick="updateQuantity('${item.id}', ${inCartQty + 1})" class="menu-item-stepper-btn" type="button" aria-label="Increase quantity">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="color: #8B0000;"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
            </button>
          </div>
        `}

      </div>
    </div>
  `;
}

// Filter and render menu cards line-by-line with category banners
function renderMenu() {
  const container = document.getElementById('menu-items-grid');
  if (!container) return;

  const cart = getCart();

  // Search mode: show all matching items in responsive 3-col horizontal grid
  if (searchQuery) {
    const filtered = MENU_ITEMS.filter(item =>
      item.name.toLowerCase().includes(searchQuery) ||
      (item.nameUrdu && item.nameUrdu.includes(searchQuery)) ||
      item.description.toLowerCase().includes(searchQuery)
    );

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="mt-6 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border py-16 text-center bg-white shadow-xs">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/40"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <p class="text-lg font-bold text-foreground">No items found</p>
          <p class="text-sm text-muted-foreground">Try searching for another item or choose "All" category</p>
          <button onclick="document.getElementById('menu-search-input').value=''; searchQuery=''; renderMenu();" class="mt-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#6e0000] transition-colors">Clear Search</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        ${filtered.map(item => {
      const cartItem = cart.find(i => i.id === item.id);
      const inCartQty = cartItem ? cartItem.quantity : 0;
      return renderItemCard(item, inCartQty);
    }).join('')}
      </div>
    `;
    return;
  }

  // Render all categories line-by-line with their banners and cards
  const categoriesToRender = CATEGORIES.filter(c => c.id !== 'all');

  container.innerHTML = categoriesToRender.map(cat => {
    const bannerImg = CATEGORY_BANNERS[cat.id];
    const itemsInCat = MENU_ITEMS.filter(item => item.category === cat.id);

    return `
      <section id="category-section-${cat.id}" class="category-block mb-12 sm:mb-16 scroll-mt-20 w-full">
        
        <!-- Category Banner (12px Border Radius, Equal Width) -->
        ${bannerImg ? `
          <div class="w-full rounded-[12px] overflow-hidden shadow-md mb-6 sm:mb-8 border border-border rounded-2xl">
            <img src="${bannerImg}" alt="${cat.name}" loading="lazy" class="w-full h-auto object-cover rounded-[12px]">
          </div>
        ` : ''}

        <!-- Horizontal Cards Grid for this Category (Consistent Height) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full items-stretch">
          ${itemsInCat.map(item => {
      const cartItem = cart.find(i => i.id === item.id);
      const inCartQty = cartItem ? cartItem.quantity : 0;
      return renderItemCard(item, inCartQty);
    }).join('')}
        </div>

      </section>
    `;
  }).join('');
}

// Quick add single unit from menu card
function quickAddToCart(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (item) {
    addToCart(item, 1);
  }
}

// Open Item Details Modal
function openItemModal(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  selectedItem = item;
  modalQuantity = 1;

  const modalContainer = document.getElementById('item-modal-container');
  const modalContent = document.getElementById('item-modal-content');
  if (!modalContainer || !modalContent) return;

  modalContent.innerHTML = `
    <!-- Close button -->
    <button onclick="closeItemModal()" class="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-transform hover:scale-105 active:scale-95 shadow-md" aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
    </button>

    <!-- Image Column -->
    <div class="relative h-56 w-full shrink-0 sm:h-72 md:h-auto md:min-h-[500px] md:w-[45%] bg-muted">
      <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover">
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-14 text-white">
        <h2 class="font-display text-2xl uppercase leading-tight sm:text-3xl">${item.name}</h2>
        ${item.nameUrdu ? `<p class="mt-1 text-sm font-medium text-white/85">${item.nameUrdu}</p>` : ''}
      </div>
    </div>

    <!-- Details Column -->
    <div class="flex min-h-0 flex-1 flex-col">
      <div class="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
        <p class="font-display text-3xl text-primary sm:text-4xl">Rs. ${item.price}</p>
        <p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">${item.description}</p>
        
        <div class="my-5 h-px bg-border"></div>

        <label for="modal-instructions" class="text-sm font-bold text-foreground block mb-2">Special Instructions</label>
        <div class="relative">
          <textarea id="modal-instructions" rows="4" maxlength="500" placeholder="E.g., Kam cheeni, Ziyada patti, Extra crispy paratha..." oninput="updateCharCount(this)" class="w-full resize-none rounded-2xl border border-input bg-white p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"></textarea>
          <span id="instruction-char-count" class="pointer-events-none absolute bottom-3 right-4 text-xs text-muted-foreground/70">0/500</span>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="flex items-center justify-between gap-3 border-t border-border bg-white p-4 sm:p-5 shadow-sm">
        <div class="flex items-center gap-2 rounded-2xl border border-primary/15 bg-primary/5 p-1.5">
          <button onclick="changeModalQty(-1)" class="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-white text-primary transition-colors hover:bg-primary/10" aria-label="Decrease quantity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path></svg>
          </button>
          <span id="modal-qty-display" class="w-7 text-center text-base font-extrabold text-foreground">1</span>
          <button onclick="changeModalQty(1)" class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white transition-transform hover:scale-105 active:scale-95" aria-label="Increase quantity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
          </button>
        </div>

        <button onclick="confirmModalAddToCart()" class="group flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#6e0000] active:scale-[0.98] sm:flex-none sm:px-8 shadow-md">
          <span id="modal-add-price">Rs. ${item.price}</span>
          <span class="h-4 w-px bg-white/30"></span>
          <span>Add to Cart</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function updateCharCount(el) {
  const counter = document.getElementById('instruction-char-count');
  if (counter) counter.textContent = `${el.value.length}/500`;
}

function changeModalQty(delta) {
  modalQuantity = Math.max(1, modalQuantity + delta);
  const qtyEl = document.getElementById('modal-qty-display');
  const priceEl = document.getElementById('modal-add-price');
  if (qtyEl) qtyEl.textContent = modalQuantity;
  if (priceEl && selectedItem) priceEl.textContent = `Rs. ${selectedItem.price * modalQuantity}`;
}

function confirmModalAddToCart() {
  if (!selectedItem) return;
  const textarea = document.getElementById('modal-instructions');
  const instructions = textarea ? textarea.value.trim() : '';

  addToCart(selectedItem, modalQuantity, instructions);
  closeItemModal();
  openCartDrawer();
}

function closeItemModal() {
  const modalContainer = document.getElementById('item-modal-container');
  if (modalContainer) {
    modalContainer.classList.add('hidden');
    document.body.style.overflow = '';
  }
  selectedItem = null;
}

// Mobile navigation menu toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-menu');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
}

// Close modals and drawer on Escape key
function setupEscapeKey() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeItemModal();
      closeCartDrawer();
    }
  });
}

// Re-render menu on cart change so inline counters sync
window.addEventListener('cartUpdated', () => {
  renderMenu();
});
