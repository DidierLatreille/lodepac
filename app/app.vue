<script setup lang="ts">
import menuImage from './assets/menu.jpg'
import './assets/css/main.css'
import { siteInfo } from '#shared/utils/seo'

const instagram = siteInfo.instagram
const unitPrice = 14000
const formattedPrice = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
}).format(unitPrice)
const mobileMenuOpen = ref(false)
const burritos = [
  { number: '01', name: 'BIRRIA', subtitle: 'México, bien envuelto.', description: 'Carne tierna y desmechada, cocinada durante horas con chiles y especias. Mucho queso y una tortilla lista para bancarse todo.', tags: ['COCCIÓN LENTA', 'MUCHO QUESO'], detail: 'Aprox. 350 g por burrito · Aprox. 70 g de proteína', className: 'birria' },
  { number: '02', name: 'KOREAN BBQ', subtitle: 'Chicken con otro level.', description: 'Pollo desmenuzado, cebolla caramelizada y una salsa con gochujang, mostaza y especias. Dulce, apenas picante y con cheddar fundido.', tags: ['POLLO + CHEDDAR', 'UN TOQUE PICANTE'], detail: 'Aprox. 70 g de proteína', className: 'korean' },
  { number: '03', name: 'PHILLY', subtitle: 'Cheesesteak en modo burrito.', description: 'El Philly Cheesesteak también juega en este equipo. Una tercera forma de resolver ese antojo que no se negocia.', tags: ['CHEESESTEAK', 'ANTOJO RESUELTO'], detail: 'Consultanos los ingredientes por Instagram.', className: 'philly' },
]

function closeMenu() { mobileMenuOpen.value = false }

const menuNames = {
  birria: 'Burrito de birria',
  korean: 'Burrito Korean BBQ Chicken',
  philly: 'Burrito Philly Cheesesteak',
} as const

useLandingSeo(burritos.map(burrito => ({
  name: menuNames[burrito.className as keyof typeof menuNames],
  description: burrito.description,
})), unitPrice)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <div class="announcement"><span>DE ZONA NORTE, CON TODO.</span><span>DELIVERY JUE · VIE · SÁB / 20 A 23 H</span></div>
    <header class="site-header">
      <a class="brand" href="#inicio" aria-label="Lo de Pac, inicio" @click="closeMenu"><span>LO DE</span><strong>PAC</strong></a>
      <nav class="desktop-nav" aria-label="Navegación principal"><a href="#burritos">Los burritos</a><a href="#delivery">Cómo pedir</a><a :href="instagram" target="_blank" rel="noopener noreferrer">@lodepac <span aria-hidden="true">↗</span></a></nav>
      <a class="button button-small header-order" :href="instagram" target="_blank" rel="noopener noreferrer">Pedí el tuyo <span aria-hidden="true">↗</span></a>
      <button class="mobile-toggle" type="button" :aria-expanded="mobileMenuOpen" aria-controls="mobile-navigation" :aria-label="mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'" @click="mobileMenuOpen = !mobileMenuOpen" @keydown.esc="closeMenu"><span>{{ mobileMenuOpen ? 'CERRAR' : 'MENÚ' }}</span><span aria-hidden="true">{{ mobileMenuOpen ? '×' : '+' }}</span></button>
      <nav v-if="mobileMenuOpen" id="mobile-navigation" class="mobile-nav" aria-label="Navegación móvil" @keydown.esc="closeMenu"><a href="#burritos" @click="closeMenu">Los burritos</a><a href="#delivery" @click="closeMenu">Cómo pedir</a><a :href="instagram" target="_blank" rel="noopener noreferrer" @click="closeMenu">Pedir por Instagram ↗</a></nav>
    </header>
    <main id="contenido">
      <section id="inicio" class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="little-star" aria-hidden="true">✳</span> LO DE PAC · BURRITOS EN ZONA NORTE</p>
          <h1 id="hero-title">POCO<br>CHAMUYO.<br><span>MUCHO</span><br>RELLENO.</h1>
          <p class="hero-description">Burritos con delivery en Vicente López y Martínez.<br>Cocción lenta. Queso sin miedo.</p>
          <div class="hero-actions"><a class="button" href="#burritos">Elegí tu burrito <span aria-hidden="true">↓</span></a><span class="price-note">{{ formattedPrice }} <small>POR UNIDAD</small></span></div>
        </div>
        <div class="hero-art" aria-label="Burritos del menú de Lo de Pac">
          <span class="hero-caption">el bajón tiene<br><em>nuevo favorito.</em></span>
          <div class="food-wrap food-wrap-birria"><FoodPhoto variant="birria" alt="Burrito de birria de Lo de Pac, envuelto en aluminio" priority /></div>
          <div class="food-wrap food-wrap-korean"><FoodPhoto variant="korean" alt="Burrito Korean BBQ Chicken de Lo de Pac, envuelto en aluminio" priority /></div>
          <div class="hero-sticker" aria-hidden="true"><span>SE COME</span><strong>CON<br>LAS MANOS.</strong><span>Y CON GANAS.</span></div>
          <span class="photo-footnote">FOTOS REALES. HAMBRE REAL.</span>
        </div>
        <div class="hero-bottom"><span>VICENTE LÓPEZ + MARTÍNEZ</span><a href="#burritos">SEGUÍ BAJANDO <span aria-hidden="true">↓</span></a></div>
      </section>
      <div class="flavor-strip" aria-hidden="true"><div class="flavor-track"><span>BIRRIA</span><b>✳</b><span>KOREAN BBQ</span><b>✳</b><span>PHILLY CHEESESTEAK</span><b>✳</b><span>BIRRIA</span><b>✳</b><span>KOREAN BBQ</span><b>✳</b><span>PHILLY CHEESESTEAK</span><b>✳</b></div></div>
      <section id="burritos" class="menu-section" aria-labelledby="menu-title">
        <div class="section-heading"><div><p class="eyebrow">EL TRÍO QUE NO FALLA</p><h2 id="menu-title">ELEGÍ TU<br><span>BURRITO.</span></h2></div><p>Birria, Korean BBQ Chicken y Philly Cheesesteak.<br>El mismo compromiso con el relleno.</p></div>
        <div class="burrito-grid">
          <article v-for="burrito in burritos" :key="burrito.number" class="burrito-card" :class="burrito.className">
            <div class="card-top"><span>{{ burrito.number }} / EL MENÚ</span><span class="card-star" aria-hidden="true">✳</span></div>
            <h3>{{ burrito.name }}<span v-if="burrito.className === 'korean'">CHICKEN</span><span v-if="burrito.className === 'philly'">CHEESESTEAK</span></h3>
            <p class="card-subtitle">{{ burrito.subtitle }}</p>
            <div class="card-tags"><span v-for="tag in burrito.tags" :key="tag">{{ tag }}</span></div>
            <p class="card-description">{{ burrito.description }}</p><p class="card-detail">{{ burrito.detail }}</p>
            <a class="card-order" :href="instagram" target="_blank" rel="noopener noreferrer" :aria-label="`Pedir burrito ${burrito.name} por Instagram, ${formattedPrice}`"><span>{{ formattedPrice }} <small>POR UNIDAD</small></span><span class="order-arrow" aria-hidden="true">↗</span></a>
          </article>
        </div>
        <div class="menu-bottom"><span>EL PLAN: PEDIR, ABRIR, NO COMPARTIR.</span><a :href="menuImage" target="_blank" rel="noopener noreferrer">Ver el menú original <span aria-hidden="true">↗</span></a></div>
      </section>
      <section id="delivery" class="delivery-section" aria-labelledby="delivery-title">
        <div class="delivery-copy"><p class="eyebrow">DEL CHAT A TU PUERTA</p><h2 id="delivery-title">VOS PONÉ<br><span>EL HAMBRE.</span></h2><p>Nosotros ponemos los burritos.<br>Escribinos, reservá el tuyo y coordinamos la entrega.</p><a class="button" :href="instagram" target="_blank" rel="noopener noreferrer">Pedí por Instagram <span aria-hidden="true">↗</span></a></div>
        <div class="delivery-ticket"><div class="ticket-heading"><span>LO DE PAC / DELIVERY</span><span aria-hidden="true">↗</span></div><dl><div><dt>POR DÓNDE</dt><dd>Vicente López<br>y Martínez</dd></div><div><dt>CUÁNDO</dt><dd>Jueves, viernes<br>y sábados</dd></div><div><dt>A QUÉ HORA</dt><dd>20:00 — 23:00</dd></div></dl><p>Reservá por mensaje. Confirmamos disponibilidad, zona y costo de envío al pedir.</p><div class="ticket-end"><span>BUEN BAJÓN.</span><span aria-hidden="true">✳ ✳ ✳</span></div></div>
      </section>
    </main>
    <footer class="site-footer"><a class="footer-wordmark" href="#inicio" aria-label="Lo de Pac, volver al inicio">LO DE PAC<span aria-hidden="true">✳</span></a><div class="footer-bottom"><span>BURRITOS CON AGUANTE. ZONA NORTE.</span><a :href="instagram" target="_blank" rel="noopener noreferrer">@lodepac <span aria-hidden="true">↗</span></a><a href="#inicio">VOLVER ARRIBA ↑</a></div></footer>
  </div>
</template>
