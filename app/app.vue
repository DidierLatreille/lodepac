<template>
  <div>
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <div class="announcement">
      <span>DE ZONA NORTE, CON TODO.</span
      ><span>DELIVERY JUE · VIE · SÁB / 20 A 23 H</span>
    </div>
    <header
      class="site-header"
      :class="{ 'is-hidden': headerHidden && !mobileMenuOpen && !cartOpen }"
      @focusin="headerHidden = false"
    >
      <a
        class="brand"
        href="#inicio"
        aria-label="Lo de Pac, inicio"
        @click="closeMenu()"
        ><span>LO DE</span><strong>PAC</strong></a
      >
      <nav class="desktop-nav" aria-label="Navegación principal">
        <a href="#burritos">Los burritos</a><a href="#delivery">Cómo pedir</a
        ><a :href="instagram" target="_blank" rel="noopener noreferrer"
          >@lodepac <span aria-hidden="true">↗</span></a
        >
      </nav>
      <a class="button button-small header-order" href="#burritos"
        >Elegí el tuyo <span aria-hidden="true">↓</span></a
      >
      <button
        ref="menuToggle"
        class="mobile-toggle"
        type="button"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="mobileMenuOpen = !mobileMenuOpen"
        @keydown.esc="closeMenu(true)"
      >
        <span>{{ mobileMenuOpen ? "CERRAR" : "MENÚ" }}</span
        ><span aria-hidden="true">{{ mobileMenuOpen ? "×" : "+" }}</span>
      </button>
      <nav
        v-if="mobileMenuOpen"
        id="mobile-navigation"
        class="mobile-nav"
        aria-label="Navegación móvil"
        @keydown.esc="closeMenu(true)"
      >
        <a href="#burritos" @click="closeMenu()">Los burritos</a
        ><a href="#delivery" @click="closeMenu()">Cómo pedir</a
        ><button type="button" @click="openCart">Tu carrito ({{ itemCount }})</button>
        <a
          :href="instagram"
          target="_blank"
          rel="noopener noreferrer"
          @click="closeMenu()"
          >Pedir por Instagram ↗</a
        >
      </nav>
    </header>
    <main id="contenido">
      <section id="inicio" class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">
            <span class="little-star" aria-hidden="true">&#10035;&#65038;</span> LO DE PAC ·
            BURRITOS EN ZONA NORTE
          </p>
          <h1 id="hero-title">
            POCO<br />CHAMUYO.<br /><span>MUCHO</span><br />RELLENO.
          </h1>
          <p class="hero-description">
            Burritos con delivery en Vicente López y Martínez.<br />Cocción
            lenta. Queso sin miedo.
          </p>
          <div class="hero-actions">
            <a class="button" href="#burritos"
              >Elegí tu burrito <span aria-hidden="true">↓</span></a
            ><span class="price-note"
              >{{ formattedPrice }} <small>POR UNIDAD</small></span
            >
          </div>
        </div>
        <div class="hero-art" aria-label="Burritos del menú de Lo de Pac">
          <span class="hero-caption"
            >el bajón tiene<br /><em>nuevo favorito.</em></span
          >
          <div class="food-wrap food-wrap-birria">
            <FoodPhoto
              variant="birria"
              alt="Burrito de birria de Lo de Pac, envuelto en aluminio"
              priority
            />
          </div>
          <div class="food-wrap food-wrap-korean">
            <FoodPhoto
              variant="korean"
              alt="Burrito Korean BBQ Chicken de Lo de Pac, envuelto en aluminio"
              priority
            />
          </div>
          <div class="hero-sticker" aria-hidden="true">
            <span>SE COME</span><strong>CON<br />LAS MANOS.</strong
            ><span>Y CON GANAS.</span>
          </div>
          <span class="photo-footnote">FOTOS REALES. HAMBRE REAL.</span>
        </div>
        <div class="hero-bottom">
          <span>VICENTE LÓPEZ + MARTÍNEZ</span
          ><a href="#burritos"
            >SEGUÍ BAJANDO <span aria-hidden="true">↓</span></a
          >
        </div>
      </section>
      <div class="flavor-strip" aria-hidden="true">
        <div class="flavor-track">
          <div v-for="copy in 2" :key="copy" class="flavor-group">
            <template v-for="flavor in stripFlavors" :key="flavor">
              <span>{{ flavor }}</span><b>&#10035;&#65038;</b>
            </template>
          </div>
        </div>
      </div>
      <section id="burritos" class="menu-section" aria-labelledby="menu-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">EL TRÍO QUE NO FALLA</p>
            <h2 id="menu-title">ELEGÍ TU<br /><span>BURRITO.</span></h2>
          </div>
          <p>
            Birria, Korean BBQ Chicken y Philly Cheesesteak.<br />El mismo
            compromiso con el relleno.
          </p>
        </div>
        <div class="burrito-grid">
          <article
            v-for="burrito in burritos"
            :key="burrito.number"
            class="burrito-card"
            :class="burrito.className"
          >
            <div class="card-top">
              <span>{{ burrito.number }} / EL MENÚ</span
              ><span class="card-star" aria-hidden="true">&#10035;&#65038;</span>
            </div>
            <h3>
              {{ burrito.name
              }}<span v-if="burrito.className === 'korean'">CHICKEN</span
              ><span v-if="burrito.className === 'philly'">CHEESESTEAK</span>
            </h3>
            <p class="card-subtitle">{{ burrito.subtitle }}</p>
            <div class="card-tags">
              <span v-for="tag in burrito.tags" :key="tag">{{ tag }}</span>
            </div>
            <p class="card-description">{{ burrito.description }}</p>
            <p class="card-detail">{{ burrito.detail }}</p>
            <div class="card-order">
              <span>{{ formattedPrice }} <small>POR UNIDAD</small></span>
              <div class="quantity-controls" :aria-label="`Cantidad de ${menuNames[burrito.className]}`">
                <button type="button" :aria-label="`Quitar un ${menuNames[burrito.className]}`" :disabled="!cart[burrito.className]" @click="changeQuantity(burrito.className, -1)">−</button>
                <span aria-live="polite">{{ cart[burrito.className] }}</span>
                <button type="button" :aria-label="`Agregar un ${menuNames[burrito.className]}`" :disabled="cart[burrito.className] >= 99" @click="changeQuantity(burrito.className, 1)">+</button>
              </div>
            </div>
          </article>
        </div>
        <div class="menu-bottom">
          <span>EL PLAN: PEDIR, ABRIR, NO COMPARTIR.</span
          ><a :href="menuImage" target="_blank" rel="noopener noreferrer"
            >Ver el menú original <span aria-hidden="true">↗</span></a
          >
        </div>
      </section>
      <section
        id="delivery"
        class="delivery-section"
        aria-labelledby="delivery-title"
      >
        <div class="delivery-copy">
          <p class="eyebrow">DEL CHAT A TU PUERTA</p>
          <h2 id="delivery-title">VOS PONÉ<br /><span>EL HAMBRE.</span></h2>
          <p>
            Nosotros ponemos los burritos.<br />Escribinos, reservá el tuyo y
            coordinamos la entrega.
          </p>
          <button class="button" type="button" @click="openCart">Revisá tu carrito <span aria-hidden="true">↗</span></button>
        </div>
        <div class="delivery-ticket">
          <div class="ticket-heading">
            <span>LO DE PAC / DELIVERY</span><span aria-hidden="true">↗</span>
          </div>
          <dl>
            <div>
              <dt>POR DÓNDE</dt>
              <dd>Vicente López<br />y Martínez</dd>
            </div>
            <div>
              <dt>CUÁNDO</dt>
              <dd>Jueves, viernes<br />y sábados</dd>
            </div>
            <div>
              <dt>A QUÉ HORA</dt>
              <dd>20:00 — 23:00</dd>
            </div>
          </dl>
          <p>
            Reservá por mensaje. Confirmamos disponibilidad, zona y costo de
            envío al pedir.
          </p>
          <div class="ticket-end">
            <span>BUEN BAJÓN.</span><span aria-hidden="true">&#10035;&#65038; &#10035;&#65038; &#10035;&#65038;</span>
          </div>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <a
        class="footer-wordmark"
        href="#inicio"
        aria-label="Lo de Pac, volver al inicio"
        >LO DE PAC<span aria-hidden="true">&#10035;&#65038;</span></a
      >
      <div class="footer-bottom">
        <span>BURRITOS CON AGUANTE. ZONA NORTE.</span
        ><a :href="instagram" target="_blank" rel="noopener noreferrer"
          >@lodepac <span aria-hidden="true">↗</span></a
        ><a href="#inicio">VOLVER ARRIBA ↑</a>
      </div>
    </footer>
    <button
      ref="cartBubble"
      class="cart-bubble"
      type="button"
      aria-haspopup="dialog"
      aria-controls="cart-dialog"
      :aria-expanded="cartOpen"
      :aria-label="`Abrir carrito: ${itemCount} ${itemCount === 1 ? 'burrito' : 'burritos'}`"
      @click="openCart"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 7h12l2 14H4L6 7Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      <span class="cart-bubble-count" aria-hidden="true">{{ itemCount }}</span>
    </button>
    <span class="sr-only" role="status">{{ cartStatus }}</span>
    <dialog
      id="cart-dialog"
      ref="cartDialog"
      class="cart-dialog"
      aria-labelledby="cart-title"
      @cancel.prevent="closeCart"
      @close="onCartClosed"
      @click.self="closeCart"
    >
      <div class="cart-panel">
        <div class="cart-heading">
          <div><p class="eyebrow">LO DE PAC / TU PEDIDO</p><h2 id="cart-title">ALTO CARRITO.</h2></div>
          <button class="cart-close" type="button" aria-label="Cerrar carrito" autofocus @click="closeCart">×</button>
        </div>
        <div v-if="!itemCount" class="cart-empty">
          <p>ACÁ FALTAN BURRITOS.</p>
          <span>Elegí tus favoritos y armate alto pedido.</span>
          <a class="button" href="#burritos" @click.prevent="browseMenu">Ver los burritos <span aria-hidden="true">↓</span></a>
        </div>
        <template v-else>
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-line">
              <div class="cart-item-info"><h3>{{ item.name }}</h3><span>{{ formattedPrice }} por unidad</span></div>
              <button class="cart-remove" type="button" :aria-label="`Eliminar ${item.name} del carrito`" @click="removeItem(item.id)">Quitar</button>
              <div class="quantity-controls" :aria-label="`Cantidad de ${item.name}`">
                <button type="button" :aria-label="`Quitar un ${item.name}`" @click="changeQuantity(item.id, -1)">−</button>
                <span>{{ item.quantity }}</span>
                <button type="button" :aria-label="`Agregar un ${item.name}`" :disabled="item.quantity >= 99" @click="changeQuantity(item.id, 1)">+</button>
              </div>
              <strong class="cart-subtotal">{{ formatPrice(item.subtotal) }}</strong>
            </div>
          </div>
          <div class="cart-summary">
            <div class="cart-total"><span>Total · {{ itemCount }} {{ itemCount === 1 ? 'burrito' : 'burritos' }}</span><strong>{{ formatPrice(total) }}</strong></div>
            <p class="cart-note">Envío a coordinar con el local.</p>
            <a class="button cart-checkout" :href="whatsappUrl" target="_blank" rel="noopener noreferrer">Pedir por WhatsApp <span aria-hidden="true">↗</span></a>
            <p class="cart-note">Tu pedido se abre listo para enviar. El local confirma disponibilidad y entrega.</p>
          </div>
        </template>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import menuImage from "./assets/menu.jpg";
import "./assets/fonts.css";
import { siteInfo } from "#shared/utils/seo";

useHead({
  link: [
    {
      rel: "preload", href: "/fonts/barlow-condensed-900-latin.woff2",
      as: "font", type: "font/woff2", crossorigin: "anonymous",
    },
    {
      rel: "preload", href: "/fonts/dm-sans-variable-latin.woff2",
      as: "font", type: "font/woff2", crossorigin: "anonymous",
    },
  ],
});

const instagram = siteInfo.instagram;
const stripFlavors = ["BIRRIA", "KOREAN BBQ", "PHILLY CHEESESTEAK", "BIRRIA", "KOREAN BBQ", "PHILLY CHEESESTEAK"] as const;
const unitPrice = 14000;
const formattedPrice = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
}).format(unitPrice);
const mobileMenuOpen = ref(false);
const menuToggle = ref<HTMLButtonElement | null>(null);
const headerHidden = ref(false);
const cartDialog = ref<HTMLDialogElement | null>(null);
const cartBubble = ref<HTMLButtonElement | null>(null);
const cartOpen = ref(false);
const cartStatus = ref("");
let lastScrollY = 0;
let scrollTravel = 0;
let scrollFrame = 0;
let returnFocus: HTMLElement | null = null;
let browseAfterClose = false;
let unlockPage: (() => void) | undefined;
let desktopViewport: MediaQueryList | undefined;

function onViewportChange() {
  if (desktopViewport?.matches) closeMenu();
}

function onPageScroll() {
  if (scrollFrame || cartOpen.value) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    if (cartOpen.value) return;
    // Clamp elastic overscroll on mobile so bouncing at the bottom doesn't toggle the nav.
    const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
    const delta = y - lastScrollY;
    scrollTravel = Math.sign(delta) === Math.sign(scrollTravel) ? scrollTravel + delta : delta;
    if (y < 140 || mobileMenuOpen.value) headerHidden.value = false;
    else if (Math.abs(scrollTravel) >= 10) headerHidden.value = scrollTravel > 0;
    lastScrollY = y;
  });
}

function openCart() {
  if (!cartDialog.value || cartOpen.value) return;
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  closeMenu();
  cartOpen.value = true;
  const y = window.scrollY;
  const bodyStyle = document.body.style;
  const previous = { position: bodyStyle.position, top: bodyStyle.top, width: bodyStyle.width, overflow: bodyStyle.overflow };
  Object.assign(bodyStyle, { position: "fixed", top: `-${y}px`, width: "100%", overflow: "hidden" });
  unlockPage = () => {
    Object.assign(bodyStyle, previous);
    const rootStyle = document.documentElement.style;
    const behavior = rootStyle.scrollBehavior;
    rootStyle.scrollBehavior = "auto";
    window.scrollTo(0, y);
    rootStyle.scrollBehavior = behavior;
    lastScrollY = y;
    scrollTravel = 0;
  };
  cartDialog.value.showModal();
}

function closeCart() {
  cartDialog.value?.close();
}

function onCartClosed() {
  unlockPage?.();
  unlockPage = undefined;
  cartOpen.value = false;
  const target = returnFocus?.isConnected ? returnFocus : cartBubble.value;
  target?.focus({ preventScroll: true });
  if (browseAfterClose) {
    browseAfterClose = false;
    document.getElementById("burritos")?.scrollIntoView();
  }
}

function browseMenu() {
  browseAfterClose = true;
  closeCart();
}

function onPagePointerDown(event: PointerEvent) {
  if (mobileMenuOpen.value && event.target instanceof Element && !event.target.closest(".site-header")) closeMenu();
}

const menuNames = {
  birria: "Burrito de birria",
  korean: "Burrito Korean BBQ Chicken",
  philly: "Burrito Philly Cheesesteak",
} as const;
type BurritoId = keyof typeof menuNames;
type Cart = Record<BurritoId, number>;
const cart = reactive<Cart>({ birria: 0, korean: 0, philly: 0 });
const cartItems = computed(() =>
  (Object.keys(menuNames) as BurritoId[])
    .filter((id) => cart[id] > 0)
    .map((id) => ({ id, name: menuNames[id], quantity: cart[id], subtotal: cart[id] * unitPrice })),
);
const itemCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));
const total = computed(() => itemCount.value * unitPrice);
const formatPrice = (price: number) => new Intl.NumberFormat("es-AR", {
  style: "currency", currency: "ARS", maximumFractionDigits: 0,
}).format(price);
const whatsappUrl = computed(() => {
  const lines = [
    "Hola, Lo de Pac. Quiero hacer este pedido:",
    "",
    ...cartItems.value.map((item) => `${item.quantity} × ${item.name} — ${formatPrice(item.subtotal)}`),
    "",
    `Total: ${formatPrice(total.value)}`,
    "¿Me confirman disponibilidad y costo de envío? Gracias.",
  ];
  return `https://wa.me/5491132711877?text=${encodeURIComponent(lines.join("\n"))}`;
});

function changeQuantity(id: BurritoId, amount: number) {
  cart[id] = Math.min(99, Math.max(0, cart[id] + amount));
  cartStatus.value = `${menuNames[id]}: ${cart[id]}. ${itemCount.value} burritos en tu carrito.`;
  if (cartOpen.value && !cart[id]) nextTick(() => cartDialog.value?.querySelector<HTMLButtonElement>(".cart-close")?.focus());
}

function removeItem(id: BurritoId) {
  changeQuantity(id, -cart[id]);
}

onMounted(() => {
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", onPageScroll, { passive: true });
  document.addEventListener("pointerdown", onPagePointerDown);
  desktopViewport = window.matchMedia("(min-width: 761px)");
  desktopViewport.addEventListener("change", onViewportChange);
  try {
    const saved = JSON.parse(sessionStorage.getItem("lodepac-cart") || "{}");
    for (const id of Object.keys(menuNames) as BurritoId[]) {
      if (Number.isSafeInteger(saved[id]) && saved[id] >= 0) cart[id] = Math.min(saved[id], 99);
    }
  } catch {
    // A missing or invalid stored cart starts empty.
  }
  watch(cart, () => {
    try {
      sessionStorage.setItem("lodepac-cart", JSON.stringify(cart));
    } catch {
      // The cart stays usable if storage is unavailable.
    }
  }, { deep: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onPageScroll);
  document.removeEventListener("pointerdown", onPagePointerDown);
  desktopViewport?.removeEventListener("change", onViewportChange);
  cancelAnimationFrame(scrollFrame);
  unlockPage?.();
});
const burritos = [
  {
    number: "01",
    name: "BIRRIA",
    subtitle: "México, bien envuelto.",
    description:
      "Carne tierna y desmechada, cocinada durante horas con chiles y especias. Mucho queso y una tortilla lista para bancarse todo.",
    tags: ["COCCIÓN LENTA", "MUCHO QUESO"],
    detail: "Aprox. 350 g por burrito · Aprox. 70 g de proteína",
    className: "birria",
  },
  {
    number: "02",
    name: "KOREAN BBQ",
    subtitle: "Chicken con otro level.",
    description:
      "Pollo desmenuzado, cebolla caramelizada y una salsa con gochujang, mostaza y especias. Dulce, apenas picante y con cheddar fundido.",
    tags: ["POLLO + CHEDDAR", "UN TOQUE PICANTE"],
    detail: "Aprox. 70 g de proteína",
    className: "korean",
  },
  {
    number: "03",
    name: "PHILLY",
    subtitle: "Cheesesteak en modo burrito.",
    description:
      "El Philly Cheesesteak también juega en este equipo. Una tercera forma de resolver ese antojo que no se negocia.",
    tags: ["CHEESESTEAK", "ANTOJO RESUELTO"],
    detail: "Consultanos los ingredientes por Instagram.",
    className: "philly",
  },
 ] as const;

function closeMenu(restoreFocus = false) {
  mobileMenuOpen.value = false;
  if (restoreFocus) menuToggle.value?.focus();
}

useLandingSeo(
  burritos.map((burrito) => ({
    name: menuNames[burrito.className as keyof typeof menuNames],
    description: burrito.description,
  })),
  unitPrice,
);
</script>

<style lang="scss">
$blue: #1f4075;
$navy: #142e55;
$yellow: #fff3a3;
$paper: #fff9da;
$orange: #fa774c;
$display: "Barlow Condensed", sans-serif;

@layer reset, base, components, responsive;

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body,
  h1,
  h2,
  h3,
  p,
  dl,
  dd {
    margin: 0;
  }
  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }
  button {
    font: inherit;
    cursor: pointer;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img {
    display: block;
    max-width: 100%;
  }
}

@layer base {
  :root {
    --blue: #{$blue};
    --navy: #{$navy};
    --yellow: #{$yellow};
    --paper: #{$paper};
    --orange: #{$orange};
    --display: #{$display};
    --body-font: "DM Sans", sans-serif;
  }
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 8rem;
    scrollbar-gutter: stable;
  }
  body {
    background: var(--blue);
    color: var(--yellow);
    font-family: var(--body-font);
    font-size: 1rem;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  ::selection {
    color: var(--blue);
    background: var(--yellow);
  }
  :focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 6px;
  }
  h1,
  h2,
  h3,
  .brand strong,
  .hero-sticker strong,
  .flavor-track span,
  .ticket-end,
  .footer-wordmark {
    font-family: var(--display);
    font-weight: 900;
  }
  h1,
  h2,
  h3 {
    line-height: 0.98;
    letter-spacing: -0.015em;
  }
  a,
  button {
    touch-action: manipulation;
  }
}

@layer components {
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  .skip-link {
    position: fixed;
    z-index: 60;
    padding: 1rem;
    top: -6rem;
    left: 1rem;
    color: var(--blue);
    background: var(--yellow);
  }
  .skip-link:focus {
    top: 1rem;
  }
  .announcement {
    padding: 0.7rem 4.5%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    background: var(--yellow);
    color: var(--blue);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }
  .site-header {
    position: sticky;
    top: 0.75rem;
    z-index: 40;
    width: calc(100% - 3rem);
    max-width: 1456px;
    margin: 0.75rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(0.75rem, 1.5vw, 1.5rem);
    padding: 1rem 1.5rem;
    border: 1px solid #fff3a338;
    border-radius: 24px;
    background: #142e55f5;
    box-shadow: 0 12px 32px #071a3426, inset 0 1px 0 #ffffff14;
    transition: transform 0.25s ease;
  }
  .site-header.is-hidden {
    transform: translateY(calc(-100% - 1.5rem));
  }
  .site-header:has(:focus-visible) {
    transform: none;
  }
  .brand {
    flex-shrink: 0;
    width: 74px;
    line-height: 0.9;
    text-align: center;
    transform: rotate(-7deg);
  }
  .brand span {
    display: block;
    font-size: 1.05rem;
    font-weight: 900;
    letter-spacing: -0.04em;
  }
  .brand strong {
    display: block;
    font-family: var(--display);
    font-size: 3.1rem;
    letter-spacing: -0.03em;
  }
  .desktop-nav {
    display: flex;
    gap: clamp(1rem, 2vw, 2.5rem);
    font-size: 0.9rem;
    font-weight: 700;
  }
  .desktop-nav a {
    position: relative;
    padding-block: 0.5rem;
  }
  .desktop-nav a::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s;
  }
  .desktop-nav a:hover::after,
  .desktop-nav a:focus-visible::after {
    transform: scaleX(1);
  }
  .button {
    display: inline-flex;
    min-height: 58px;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 1.5rem;
    border: 2px solid var(--yellow);
    border-radius: 100px;
    background: var(--yellow);
    color: var(--blue);
    font-size: 1rem;
    font-weight: 800;
    transition:
      background 0.2s,
      color 0.2s,
      transform 0.2s,
      box-shadow 0.2s;
  }
  .button > span {
    font-size: 1.4rem;
    line-height: 1;
  }
  .button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 0 var(--navy);
  }
  .button-small {
    min-height: 46px;
    padding: 0.7rem 1.25rem;
    font-size: 0.875rem;
    gap: 1.5rem;
  }
  .mobile-toggle,
  .mobile-nav {
    display: none;
  }
  .hero {
    max-width: 1600px;
    margin-inline: auto;
    padding: 3rem 4.5% 1.5rem;
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 1rem;
    overflow: clip;
  }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 800;
    letter-spacing: 0.08em;
  }
  .little-star {
    font-size: 1.55rem;
  }
  .hero h1 {
    margin-top: 1.8rem;
    font-size: clamp(4.2rem, 7.7vw, 8.7rem);
  }
  .hero h1 > span {
    color: var(--orange);
    text-shadow: 0.025em 0.025em 0 var(--navy), 0.055em 0.055em 0 var(--yellow);
  }
  .hero-description {
    margin-top: 1.6rem;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--paper);
  }
  .hero-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.75rem;
    margin-top: 1.5rem;
  }
  .price-note {
    font-weight: 800;
    font-size: 1.45rem;
    line-height: 1.2;
  }
  .price-note small {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 0.25rem;
    letter-spacing: 0.07em;
  }
  .hero-art {
    position: relative;
    width: 100%;
    min-width: 0;
    min-height: 620px;
    align-self: stretch;
  }
  .hero-caption {
    position: absolute;
    z-index: 3;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.6rem;
    line-height: 1.2;
    transform: rotate(8deg);
    font-weight: 700;
  }
  .hero-caption em {
    font-weight: 500;
  }
  .food-wrap {
    position: absolute;
    width: 100%;
    transition: transform 0.55s cubic-bezier(0.2, 0.75, 0.2, 1);
  }
  .food-wrap-birria {
    top: 5%;
    left: -5%;
    transform: rotate(-13deg);
  }
  .food-wrap-korean {
    top: 43%;
    right: -2%;
    transform: rotate(10deg);
  }
  .food-wrap-birria:hover {
    z-index: 2;
    transform: translate(8px, -15px) rotate(-6deg) scale(1.05);
  }
  .food-wrap-korean:hover {
    z-index: 2;
    transform: translate(-10px, -12px) rotate(4deg) scale(1.05);
  }
  .hero-sticker {
    position: absolute;
    z-index: 3;
    bottom: 5%;
    right: 0;
    width: 145px;
    height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.35rem;
    border-radius: 50%;
    color: var(--blue);
    background: var(--yellow);
    border: 1px solid var(--blue);
    outline: 5px solid var(--yellow);
    transform: rotate(12deg);
  }
  .hero-sticker > span {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }
  .hero-sticker strong {
    font-family: var(--display);
    text-align: center;
    font-size: 1.7rem;
    line-height: 1;
  }
  .photo-footnote {
    position: absolute;
    bottom: 0;
    left: 6%;
    font-size: 0.75rem;
    letter-spacing: 0.07em;
    opacity: 0.8;
  }
  .hero-bottom {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 1.25rem;
    border-top: 1px solid #fff3a333;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .hero-bottom a {
    display: flex;
    gap: 1.5rem;
  }
  .flavor-strip {
    --flavor-gap: 2rem;
    overflow: hidden;
    padding-block: 0.9rem;
    margin-top: 1.5rem;
    border-block: 1px solid var(--yellow);
    background: var(--yellow);
    color: var(--blue);
  }
  .flavor-track {
    display: flex;
    width: max-content;
    animation: flavor-scroll 26s linear infinite;
  }
  .flavor-group {
    display: flex;
    flex-shrink: 0;
    min-width: 100vw;
    gap: var(--flavor-gap);
    padding-right: var(--flavor-gap);
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
  }
  /* Identical groups include their trailing gap, keeping the loop seamless. */
  @keyframes flavor-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .flavor-track span {
    font-family: var(--display);
    font-size: 2.2rem;
    line-height: 1.2;
    letter-spacing: 0.025em;
  }
  .flavor-track b {
    font-size: 2.3rem;
    font-weight: 400;
  }
  .menu-section {
    padding: 6rem 4.5% 3rem;
    max-width: 1600px;
    margin-inline: auto;
  }
  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  .section-heading h2,
  .delivery-copy h2 {
    font-size: clamp(3.5rem, 6vw, 6rem);
    margin-top: 1.2rem;
  }
  .section-heading h2 span {
    color: var(--orange);
    text-shadow: 0.025em 0.025em 0 var(--navy), 0.055em 0.055em 0 var(--yellow);
  }
  .section-heading > p {
    max-width: 22rem;
    padding-bottom: 0.25rem;
    color: var(--paper);
  }
  .burrito-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.2rem;
  }
  .burrito-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 1.5rem;
    color: var(--blue);
    border-radius: 3px;
    background: var(--yellow);
    border: 1px solid transparent;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }
  .burrito-card.korean {
    background: var(--orange);
  }
  .burrito-card.philly {
    background: var(--paper);
  }
  .burrito-card:hover,
  .burrito-card:focus-within {
    transform: translateY(-9px) rotate(-1deg);
    box-shadow: 7px 9px 0 var(--navy);
  }
  .burrito-card.korean:hover,
  .burrito-card.korean:focus-within {
    transform: translateY(-9px) rotate(1deg);
  }
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
  .card-star {
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 1;
    transition: transform 0.5s;
  }
  .burrito-card:hover .card-star {
    transform: rotate(90deg);
  }
  .burrito-card h3 {
    margin-top: 2.2rem;
    min-height: 6.3rem;
    font-size: clamp(2.5rem, 3.8vw, 4.25rem);
  }
  .burrito-card h3 span {
    display: block;
    font-size: 0.53em;
    margin-top: 0.25rem;
    letter-spacing: 0;
  }
  .card-subtitle {
    font-style: italic;
    font-weight: 500;
    font-size: 1.25rem;
  }
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-block: 1.4rem;
  }
  .card-tags span {
    border: 1px solid currentColor;
    border-radius: 30px;
    padding: 0.35rem 0.55rem;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.01em;
  }
  .card-description {
    font-size: 1rem;
    line-height: 1.6;
  }
  .card-detail {
    margin-block: 1rem 1.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .card-order {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    border-top: 1px solid #1f407550;
    padding-top: 1rem;
    font-size: 1.7rem;
    font-weight: 800;
  }
  .card-order small {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  .order-arrow {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid var(--blue);
    border-radius: 50%;
    transition:
      color 0.2s,
      background 0.2s,
      transform 0.2s;
  }
  .card-order:hover .order-arrow {
    background: var(--blue);
    color: var(--yellow);
    transform: rotate(45deg);
  }
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.1rem;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }
  .quantity-controls > span {
    min-width: 2ch;
    text-align: center;
  }
  .quantity-controls button {
    width: 44px;
    height: 44px;
    border: 1px solid var(--blue);
    border-radius: 50%;
    background: transparent;
    color: var(--blue);
    font-size: 1.5rem;
    line-height: 1;
  }
  .quantity-controls button:hover:not(:disabled) {
    background: var(--blue);
    color: var(--yellow);
  }
  .quantity-controls button:disabled { opacity: 0.4; cursor: not-allowed; }
  .cart-bubble {
    position: fixed;
    z-index: 45;
    right: max(1.5rem, env(safe-area-inset-right));
    bottom: calc(1.5rem + env(safe-area-inset-bottom));
    display: grid;
    place-items: center;
    width: 68px;
    height: 68px;
    border: 1px solid #fff3a380;
    border-radius: 50%;
    color: var(--yellow);
    background: #142e55f5;
    box-shadow: 0 8px 30px #071a3459, inset 0 1px 0 #ffffff33;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cart-bubble:hover { transform: translateY(-3px); box-shadow: 0 12px 36px #071a3477; }
  .cart-bubble svg { width: 29px; height: 29px; }
  .cart-bubble-count {
    position: absolute;
    top: -4px;
    right: -4px;
    display: grid;
    place-items: center;
    min-width: 28px;
    height: 28px;
    padding: 0 5px;
    border: 2px solid var(--blue);
    border-radius: 20px;
    background: var(--orange);
    color: var(--navy);
    font-size: 0.875rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }
  .cart-dialog {
    position: fixed;
    inset: 0;
    width: min(560px, calc(100% - 2rem));
    max-width: none;
    max-height: 88vh;
    max-height: 88dvh;
    padding: 0;
    margin: auto;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    border: 1px solid #fff3a345;
    border-radius: 28px;
    color: var(--yellow);
    background: #142e55fa;
    box-shadow: 0 24px 90px #071a3488, inset 0 1px 0 #ffffff1f;
  }
  .cart-dialog::backdrop { background: #061327a8; }
  .cart-dialog[open] { animation: cart-appear 0.2s ease-out; }
  .cart-panel { padding: 1.75rem; }
  .cart-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }
  .cart-heading .eyebrow { font-size: 0.75rem; }
  .cart-heading h2 { margin-top: 0.5rem; font-size: clamp(2.25rem, 7vw, 3rem); }
  .cart-close {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border: 1px solid #fff3a355;
    border-radius: 50%;
    background: #ffffff0d;
    color: var(--yellow);
    font-size: 1.75rem;
    line-height: 1;
  }
  .cart-empty { display: grid; gap: 1rem; padding: 1rem 0; }
  .cart-empty > p { font-family: var(--display); font-size: 2rem; font-weight: 800; }
  .cart-empty > span, .cart-note { color: var(--paper); }
  .cart-empty .button { margin-top: 1rem; }
  .cart-line {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: center;
    padding: 1.25rem 0;
    border-top: 1px solid #fff3a333;
  }
  .cart-item-info h3 { font-family: var(--body-font); font-size: 1rem; font-weight: 800; line-height: 1.4; }
  .cart-item-info > span { display: block; margin-top: 0.25rem; color: var(--paper); font-size: 0.875rem; }
  .cart-remove {
    min-height: 44px;
    padding: 0.5rem;
    border: 0;
    background: transparent;
    color: var(--paper);
    font-size: 0.875rem;
    text-decoration: underline;
    text-underline-offset: 0.25rem;
  }
  .cart-dialog .quantity-controls button { color: var(--yellow); border-color: #fff3a366; background: #ffffff0d; }
  .cart-dialog .quantity-controls button:hover:not(:disabled), .cart-close:hover { background: var(--yellow); color: var(--blue); }
  .cart-subtotal { justify-self: end; font-variant-numeric: tabular-nums; }
  .cart-summary { padding-top: 1.25rem; border-top: 1px dashed #fff3a355; }
  .cart-total { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem 1rem; font-weight: 800; }
  .cart-total strong { font-size: 1.75rem; font-variant-numeric: tabular-nums; }
  .cart-checkout { width: 100%; margin-top: 1.25rem; gap: 1rem; }
  .cart-note { margin-top: 0.65rem; font-size: 0.875rem; }
  @keyframes cart-appear {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @supports ((backdrop-filter: blur(16px)) or (-webkit-backdrop-filter: blur(16px))) {
    .site-header, .cart-bubble, .cart-dialog {
      background: linear-gradient(135deg, #ffffff0d, #ffffff00), #142e55d9;
      -webkit-backdrop-filter: blur(18px);
      backdrop-filter: blur(18px);
    }
  }
  .menu-bottom {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
  }
  .menu-bottom a {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
  .delivery-section {
    border-top: 1px solid #fff3a344;
    padding: 5rem 4.5% 6rem;
    margin: 2rem auto 0;
    max-width: 1600px;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  .delivery-copy h2 span {
    color: var(--orange);
    text-shadow: 0.025em 0.025em 0 var(--navy), 0.055em 0.055em 0 var(--yellow);
  }
  .delivery-copy > p:not(.eyebrow) {
    margin-top: 1.5rem;
    color: var(--paper);
    font-size: 1.05rem;
    line-height: 1.7;
  }
  .delivery-copy .button {
    margin-top: 2rem;
  }
  .delivery-ticket {
    max-width: 460px;
    width: 100%;
    justify-self: end;
    padding: 1.75rem 2rem;
    color: var(--blue);
    background: var(--yellow);
    transform: rotate(3deg);
    box-shadow: 10px 10px 0 var(--navy);
  }
  .ticket-heading {
    border-bottom: 2px dashed #1f407566;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }
  .ticket-heading span:last-child {
    font-size: 1.8rem;
  }
  .delivery-ticket dl > div {
    padding-block: 1.1rem;
    border-bottom: 1px solid #1f407533;
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 1rem;
  }
  .delivery-ticket dt {
    font-size: 0.75rem;
    font-weight: 700;
    padding-top: 0.25rem;
  }
  .delivery-ticket dd {
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1.3;
  }
  .delivery-ticket > p {
    margin-block: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.6;
  }
  .ticket-end {
    border-top: 2px dashed #1f407566;
    padding-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--display);
    font-size: 1.75rem;
  }
  .site-footer {
    padding: 3rem 4.5% calc(7rem + env(safe-area-inset-bottom));
    background: var(--yellow);
    color: var(--blue);
    overflow: hidden;
  }
  .footer-wordmark {
    display: block;
    width: fit-content;
    font-family: var(--display);
    font-size: clamp(5rem, 19vw, 19rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.045em;
    white-space: nowrap;
  }
  .footer-wordmark > span {
    display: inline-block;
    font-family: var(--body-font);
    font-size: 0.13em;
    vertical-align: top;
    margin: 0.5em 0 0 0.5em;
  }
  .footer-bottom {
    margin-top: 2rem;
    border-top: 1px solid #1f407550;
    padding-top: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
}

@layer responsive {
  @media (min-width: 1600px) {
    .hero-art {
      min-height: 770px;
    }
  }
  @media (max-width: 1100px) {
    .hero h1 {
      font-size: 7.8vw;
    }
    .hero-art {
      min-height: 570px;
    }
    .food-wrap-birria {
      top: 12%;
    }
    .food-wrap-korean {
      top: 44%;
    }
    .hero-sticker {
      width: 125px;
      height: 125px;
      bottom: 8%;
    }
    .hero-sticker strong {
      font-size: 1.4rem;
    }
    .hero-caption {
      font-size: 1.35rem;
    }
    .burrito-card {
      padding: 1.25rem;
    }
    .burrito-card h3 {
      min-height: 5rem;
    }
    .delivery-section {
      gap: 3rem;
    }
  }
  @media (max-width: 760px) {
    .announcement {
      justify-content: center;
      text-align: center;
      padding-inline: 1rem;
    }
    .announcement > span:first-child {
      display: none;
    }
    .site-header {
      top: 0.5rem;
      width: calc(100% - 1.5rem);
      margin-block: 0.5rem;
      padding: 0.85rem 1rem;
      border-radius: 20px;
    }
    .brand {
      width: 55px;
    }
    .brand span {
      font-size: 0.8rem;
    }
    .brand strong {
      font-size: 2.35rem;
    }
    .desktop-nav,
    .header-order {
      display: none;
    }
    .mobile-toggle {
      display: flex;
      min-height: 44px;
      align-items: center;
      gap: 1rem;
      color: var(--yellow);
      background: none;
      border: 0;
      padding: 0.5rem 0 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 800;
      letter-spacing: 0.06em;
    }
    .mobile-toggle span:last-child {
      font-size: 1.6rem;
      font-weight: 400;
    }
    .mobile-nav {
      display: flex;
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      z-index: 10;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem 6% 1.5rem;
      background: var(--navy);
      border: 1px solid #fff3a338;
      border-radius: 20px;
      max-height: calc(100dvh - 9rem);
      overflow-y: auto;
      box-shadow: 0 12px 32px #071a3440;
    }
    .mobile-nav a, .mobile-nav button {
      padding: 0.75rem 0;
      font-weight: 700;
      text-align: left;
      border: 0;
      color: inherit;
      background: none;
    }
    .hero {
      padding: 2rem 6% 1.25rem;
      grid-template-columns: minmax(0, 1fr);
    }
    .hero h1 {
      margin-top: 1.2rem;
      font-size: clamp(3.5rem, 15.5vw, 7rem);
    }
    .hero-description {
      margin-top: 1.25rem;
    }
    .hero-actions {
      gap: 1.5rem;
    }
    .hero-art {
      margin-top: 2rem;
      min-height: 0;
    }
    .hero-art::before {
      /* Reserve height in normal flow: Safari can collapse an empty grid item
         whose size depends only on aspect-ratio and absolute children. */
      content: "";
      display: block;
      padding-top: 113%;
    }
    .hero-caption {
      top: 0;
      right: 1%;
      font-size: 1.35rem;
    }
    .food-wrap-birria {
      top: 7%;
      left: -5%;
      width: 90%;
    }
    .food-wrap-korean {
      top: 39%;
      right: -1%;
      width: 93%;
    }
    .hero-sticker {
      bottom: 2%;
      right: 1%;
      width: 120px;
      height: 120px;
    }
    .hero-sticker strong {
      font-size: 1.3rem;
    }
    .photo-footnote {
      left: 0;
      bottom: 0;
    }
    .hero-bottom {
      margin-top: 2rem;
    }
    .hero-bottom a {
      gap: 0.5rem;
    }
    .flavor-track span {
      font-size: 1.8rem;
    }
    .flavor-strip {
      --flavor-gap: 1.5rem;
    }
    .menu-section {
      padding: 3.5rem 6% 2rem;
    }
    .section-heading {
      align-items: flex-start;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .section-heading h2,
    .delivery-copy h2 {
      font-size: clamp(3rem, 12vw, 5rem);
    }
    .burrito-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .burrito-card {
      padding: 1.5rem;
    }
    .burrito-card h3 {
      min-height: 0;
      font-size: clamp(2.6rem, 12vw, 3.6rem);
      margin-top: 1.5rem;
    }
    .card-subtitle {
      margin-top: 0.8rem;
    }
    .menu-bottom {
      flex-direction: column;
      gap: 1rem;
    }
    .cart-bubble {
      width: 60px;
      height: 60px;
      right: max(1rem, env(safe-area-inset-right));
      bottom: calc(1rem + env(safe-area-inset-bottom));
    }
    .cart-dialog {
      inset: auto 0 0;
      width: 100%;
      max-height: 90vh;
      max-height: 90dvh;
      margin: 0 auto;
      border-radius: 24px 24px 0 0;
      border-bottom: 0;
    }
    .cart-panel { padding: 1.25rem max(1.25rem, env(safe-area-inset-right)) calc(1.5rem + env(safe-area-inset-bottom)) max(1.25rem, env(safe-area-inset-left)); }
    .delivery-section {
      grid-template-columns: 1fr;
      gap: 3rem;
      margin-top: 1rem;
      padding: 3rem 6% 4rem;
    }
    .delivery-ticket {
      justify-self: center;
      width: 96%;
      max-width: 460px;
      padding: 1.5rem;
      transform: rotate(2deg);
    }
    .delivery-ticket dl > div {
      grid-template-columns: 1fr 1.7fr;
    }
    .site-footer {
      padding: 2rem 6% calc(6.5rem + env(safe-area-inset-bottom));
    }
    .footer-wordmark {
      font-size: 17.8vw;
    }
    .footer-bottom {
      align-items: flex-start;
    }
    .footer-bottom > span {
      width: 100%;
    }
  }
  @media (hover: none) {
    .food-wrap-birria:hover {
      transform: rotate(-13deg);
    }
    .food-wrap-korean:hover {
      transform: rotate(10deg);
    }
    .burrito-card:hover,
    .burrito-card.korean:hover {
      transform: none;
      box-shadow: none;
    }
    .button:hover {
      transform: none;
      box-shadow: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
}
</style>
