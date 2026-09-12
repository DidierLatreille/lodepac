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

<script setup lang="ts">
import menuImage from './assets/menu.jpg'
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

<style lang="scss">

@layer reset, base, components, responsive;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body, h1, h2, h3, p, dl, dd { margin: 0; }
  button, a { -webkit-tap-highlight-color: transparent; }
  button { font: inherit; cursor: pointer; }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
}

@layer base {
  :root { --blue: #1f4075; --navy: #142e55; --yellow: #fff3a3; --paper: #fff9da; --orange: #fa774c; --display: Impact, 'Arial Narrow', 'Arial Black', sans-serif; }
  html { scroll-behavior: smooth; scroll-padding-top: 2rem; }
  body { background: var(--blue); color: var(--yellow); font-family: Arial, Helvetica, sans-serif; font-size: 1rem; line-height: 1.5; -webkit-font-smoothing: antialiased; }
  ::selection { color: var(--blue); background: var(--yellow); }
  :focus-visible { outline: 3px solid currentColor; outline-offset: 6px; }
  h1, h2, h3 { font-family: var(--display); font-weight: 900; line-height: .98; letter-spacing: -.025em; }
  a, button { touch-action: manipulation; }
}

@layer components {
  .skip-link { position: fixed; z-index: 20; padding: 1rem; top: -6rem; left: 1rem; color: var(--blue); background: var(--yellow); }
  .skip-link:focus { top: 1rem; }
  .announcement { padding: .7rem 4.5%; display: flex; justify-content: space-between; gap: 1rem; background: var(--yellow); color: var(--blue); font-size: .75rem; font-weight: 800; letter-spacing: .08em; }
  .site-header { position: relative; max-width: 1600px; margin: auto; display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 4.5%; border-bottom: 1px solid #fff3a333; }
  .brand { width: 74px; line-height: .9; text-align: center; transform: rotate(-7deg); }
  .brand span { display: block; font-size: 1.05rem; font-weight: 900; letter-spacing: -.04em; }
  .brand strong { display: block; font-family: var(--display); font-size: 3.1rem; letter-spacing: -.03em; }
  .desktop-nav { display: flex; gap: 2.5rem; font-size: .9rem; font-weight: 700; }
  .desktop-nav a { position: relative; padding-block: .5rem; }
  .desktop-nav a::after { position: absolute; content: ''; bottom: 0; left: 0; width: 100%; height: 2px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .2s; }
  .desktop-nav a:hover::after, .desktop-nav a:focus-visible::after { transform: scaleX(1); }
  .button { display: inline-flex; min-height: 58px; align-items: center; justify-content: center; gap: 2rem; padding: 1rem 1.5rem; border: 2px solid var(--yellow); border-radius: 100px; background: var(--yellow); color: var(--blue); font-size: 1rem; font-weight: 800; transition: background .2s, color .2s, transform .2s, box-shadow .2s; }
  .button > span { font-size: 1.4rem; line-height: 1; }
  .button:hover { transform: translateY(-3px); box-shadow: 0 5px 0 var(--navy); }
  .button-small { min-height: 46px; padding: .7rem 1.25rem; font-size: .875rem; gap: 1.5rem; }
  .mobile-toggle, .mobile-nav { display: none; }
  .hero { max-width: 1600px; margin-inline: auto; padding: 3rem 4.5% 1.5rem; position: relative; display: grid; grid-template-columns: 1fr 1fr; column-gap: 1rem; overflow: clip; }
  .eyebrow { display: flex; align-items: center; gap: .65rem; font-size: .875rem; line-height: 1.4; font-weight: 800; letter-spacing: .08em; }
  .little-star { font-size: 1.55rem; }
  .hero h1 { margin-top: 1.8rem; font-size: clamp(4.2rem, 7.7vw, 8.7rem); }
  .hero h1 > span { color: transparent; -webkit-text-stroke: 1.5px var(--yellow); }
  .hero-description { margin-top: 1.6rem; font-size: 1.05rem; line-height: 1.6; color: var(--paper); }
  .hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.75rem; margin-top: 1.5rem; }
  .price-note { font-weight: 800; font-size: 1.45rem; line-height: 1.2; }
  .price-note small { display: block; font-size: .75rem; font-weight: 500; margin-top: .25rem; letter-spacing: .07em; }
  .hero-art { position: relative; min-width: 0; min-height: 620px; align-self: stretch; }
  .hero-caption { position: absolute; z-index: 3; top: .5rem; right: .5rem; font-size: 1.6rem; line-height: 1.2; transform: rotate(8deg); font-weight: 700; }
  .hero-caption em { font-family: Georgia, serif; font-weight: 400; }
  .food-wrap { position: absolute; width: 100%; transition: transform .55s cubic-bezier(.2,.75,.2,1); }
  .food-wrap-birria { top: 5%; left: -5%; transform: rotate(-13deg); }
  .food-wrap-korean { top: 43%; right: -2%; transform: rotate(10deg); }
  .food-wrap-birria:hover { z-index: 2; transform: translate(8px, -15px) rotate(-6deg) scale(1.05); }
  .food-wrap-korean:hover { z-index: 2; transform: translate(-10px, -12px) rotate(4deg) scale(1.05); }
  .hero-sticker { position: absolute; z-index: 3; bottom: 5%; right: 0; width: 145px; height: 145px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: .35rem; border-radius: 50%; color: var(--blue); background: var(--yellow); border: 1px solid var(--blue); outline: 5px solid var(--yellow); transform: rotate(12deg); }
  .hero-sticker > span { font-size: .75rem; font-weight: 800; letter-spacing: .04em; }
  .hero-sticker strong { font-family: var(--display); text-align: center; font-size: 1.7rem; line-height: 1; }
  .photo-footnote { position: absolute; bottom: 0; left: 6%; font-size: .75rem; letter-spacing: .07em; opacity: .8; }
  .hero-bottom { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 1rem; margin-top: 3rem; padding-top: 1.25rem; border-top: 1px solid #fff3a333; font-size: .75rem; font-weight: 700; letter-spacing: .06em; }
  .hero-bottom a { display: flex; gap: 1.5rem; }
  .flavor-strip { overflow: hidden; padding-block: .9rem; margin-top: 1.5rem; border-block: 1px solid var(--yellow); background: var(--yellow); color: var(--blue); }
  .flavor-track { display: flex; width: max-content; gap: 2rem; align-items: center; }
  .flavor-track span { font-family: var(--display); font-size: 2.2rem; line-height: 1.2; letter-spacing: .025em; }
  .flavor-track b { font-size: 2.3rem; font-weight: 400; }
  .menu-section { padding: 6rem 4.5% 3rem; max-width: 1600px; margin-inline: auto; }
  .section-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; margin-bottom: 3rem; }
  .section-heading h2, .delivery-copy h2 { font-size: clamp(3.5rem, 6vw, 6rem); margin-top: 1.2rem; }
  .section-heading h2 span { font-family: Georgia, serif; font-style: italic; font-weight: 400; font-size: .9em; letter-spacing: -.06em; }
  .section-heading > p { max-width: 22rem; padding-bottom: .25rem; color: var(--paper); }
  .burrito-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.2rem; }
  .burrito-card { display: flex; flex-direction: column; min-width: 0; padding: 1.5rem; color: var(--blue); border-radius: 3px; background: var(--yellow); border: 1px solid transparent; transition: transform .3s, box-shadow .3s; }
  .burrito-card.korean { background: var(--orange); }
  .burrito-card.philly { background: var(--paper); }
  .burrito-card:hover, .burrito-card:focus-within { transform: translateY(-9px) rotate(-1deg); box-shadow: 7px 9px 0 var(--navy); }
  .burrito-card.korean:hover, .burrito-card.korean:focus-within { transform: translateY(-9px) rotate(1deg); }
  .card-top { display: flex; align-items: center; justify-content: space-between; font-size: .75rem; font-weight: 700; letter-spacing: .08em; }
  .card-star { font-size: 2.5rem; font-weight: 400; line-height: 1; transition: transform .5s; }
  .burrito-card:hover .card-star { transform: rotate(90deg); }
  .burrito-card h3 { margin-top: 2.2rem; min-height: 6.3rem; font-size: clamp(2.5rem, 3.8vw, 4.25rem); }
  .burrito-card h3 span { display: block; font-size: .53em; margin-top: .25rem; letter-spacing: 0; }
  .card-subtitle { font-family: Georgia, serif; font-style: italic; font-size: 1.25rem; }
  .card-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-block: 1.4rem; }
  .card-tags span { border: 1px solid currentColor; border-radius: 30px; padding: .35rem .55rem; font-size: .75rem; font-weight: 800; letter-spacing: .01em; }
  .card-description { font-size: 1rem; line-height: 1.6; }
  .card-detail { margin-block: 1rem 1.5rem; font-size: .875rem; line-height: 1.5; }
  .card-order { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-top: 1px solid #1f407550; padding-top: 1rem; font-size: 1.7rem; font-weight: 800; }
  .card-order small { display: block; font-size: .75rem; font-weight: 500; letter-spacing: .04em; }
  .order-arrow { display: grid; place-items: center; width: 50px; height: 50px; border: 1px solid var(--blue); border-radius: 50%; transition: color .2s, background .2s, transform .2s; }
  .card-order:hover .order-arrow { background: var(--blue); color: var(--yellow); transform: rotate(45deg); }
  .menu-bottom { display: flex; justify-content: space-between; gap: 1rem; padding-top: 1.5rem; font-size: .75rem; letter-spacing: .04em; }
  .menu-bottom a { text-decoration: underline; text-underline-offset: .3rem; }
  .delivery-section { border-top: 1px solid #fff3a344; padding: 5rem 4.5% 6rem; margin: 2rem auto 0; max-width: 1600px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 5rem; align-items: center; }
  .delivery-copy h2 span { color: transparent; -webkit-text-stroke: 1px var(--yellow); }
  .delivery-copy > p:not(.eyebrow) { margin-top: 1.5rem; color: var(--paper); font-size: 1.05rem; line-height: 1.7; }
  .delivery-copy .button { margin-top: 2rem; }
  .delivery-ticket { max-width: 460px; width: 100%; justify-self: end; padding: 1.75rem 2rem; color: var(--blue); background: var(--yellow); transform: rotate(3deg); box-shadow: 10px 10px 0 var(--navy); }
  .ticket-heading { border-bottom: 2px dashed #1f407566; padding-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; font-size: .75rem; font-weight: 800; letter-spacing: .08em; }
  .ticket-heading span:last-child { font-size: 1.8rem; }
  .delivery-ticket dl > div { padding-block: 1.1rem; border-bottom: 1px solid #1f407533; display: grid; grid-template-columns: 1fr 1.6fr; gap: 1rem; }
  .delivery-ticket dt { font-size: .75rem; font-weight: 700; padding-top: .25rem; }
  .delivery-ticket dd { font-size: 1.25rem; font-weight: 800; line-height: 1.3; }
  .delivery-ticket > p { margin-block: 1.25rem; font-size: .875rem; line-height: 1.6; }
  .ticket-end { border-top: 2px dashed #1f407566; padding-top: 1rem; display: flex; align-items: center; justify-content: space-between; font-family: var(--display); font-size: 1.75rem; }
  .site-footer { padding: 3rem 4.5% 1.5rem; background: var(--yellow); color: var(--blue); overflow: hidden; }
  .footer-wordmark { display: block; width: fit-content; font-family: var(--display); font-size: clamp(5rem, 19vw, 19rem); font-weight: 900; line-height: 1; letter-spacing: -.045em; white-space: nowrap; }
  .footer-wordmark > span { display: inline-block; font-family: Arial, sans-serif; font-size: .13em; vertical-align: top; margin: .5em 0 0 .5em; }
  .footer-bottom { margin-top: 2rem; border-top: 1px solid #1f407550; padding-top: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: .75rem; font-weight: 700; letter-spacing: .04em; }
}

@layer responsive {
  @media (min-width: 1600px) { .hero-art { min-height: 770px; } }
  @media (max-width: 1100px) {
    .hero h1 { font-size: 7.8vw; }
    .hero-art { min-height: 570px; }
    .food-wrap-birria { top: 12%; }
    .food-wrap-korean { top: 44%; }
    .hero-sticker { width: 125px; height: 125px; bottom: 8%; }
    .hero-sticker strong { font-size: 1.4rem; }
    .hero-caption { font-size: 1.35rem; }
    .burrito-card { padding: 1.25rem; }
    .burrito-card h3 { min-height: 5rem; }
    .delivery-section { gap: 3rem; }
  }
  @media (max-width: 760px) {
    .announcement { justify-content: center; text-align: center; padding-inline: 1rem; }
    .announcement > span:first-child { display: none; }
    .site-header { padding: 1.2rem 6%; }
    .brand { width: 55px; }
    .brand span { font-size: .8rem; }
    .brand strong { font-size: 2.35rem; }
    .desktop-nav, .header-order { display: none; }
    .mobile-toggle { display: flex; min-height: 44px; align-items: center; gap: 1rem; color: var(--yellow); background: none; border: 0; padding: .5rem 0 .5rem 1rem; font-size: .875rem; font-weight: 800; letter-spacing: .06em; }
    .mobile-toggle span:last-child { font-size: 1.6rem; font-weight: 400; }
    .mobile-nav { display: flex; position: absolute; top: 100%; left: 0; right: 0; z-index: 10; flex-direction: column; gap: .5rem; padding: 1rem 6% 1.5rem; background: var(--navy); box-shadow: 0 6px 12px #142e5533; }
    .mobile-nav a { padding: .75rem 0; font-weight: 700; }
    .hero { padding: 2rem 6% 1.25rem; grid-template-columns: 1fr; }
    .hero h1 { margin-top: 1.2rem; font-size: clamp(3.5rem, 15.5vw, 7rem); }
    .hero-description { margin-top: 1.25rem; }
    .hero-actions { gap: 1.5rem; }
    .hero-art { margin-top: 2rem; min-height: 0; aspect-ratio: 1 / 1.13; }
    .hero-caption { top: 0; right: 1%; font-size: 1.35rem; }
    .food-wrap-birria { top: 7%; left: -5%; width: 90%; }
    .food-wrap-korean { top: 39%; right: -1%; width: 93%; }
    .hero-sticker { bottom: 2%; right: 1%; width: 120px; height: 120px; }
    .hero-sticker strong { font-size: 1.3rem; }
    .photo-footnote { left: 0; bottom: 0; }
    .hero-bottom { margin-top: 2rem; }
    .hero-bottom a { gap: .5rem; }
    .flavor-track span { font-size: 1.8rem; }
    .flavor-track { gap: 1.5rem; }
    .menu-section { padding: 3.5rem 6% 2rem; }
    .section-heading { align-items: flex-start; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; }
    .section-heading h2, .delivery-copy h2 { font-size: clamp(3rem, 12vw, 5rem); }
    .burrito-grid { grid-template-columns: 1fr; gap: 1rem; }
    .burrito-card { padding: 1.5rem; }
    .burrito-card h3 { min-height: 0; font-size: clamp(2.6rem, 12vw, 3.6rem); margin-top: 1.5rem; }
    .card-subtitle { margin-top: .8rem; }
    .menu-bottom { flex-direction: column; gap: 1rem; }
    .delivery-section { grid-template-columns: 1fr; gap: 3rem; margin-top: 1rem; padding: 3rem 6% 4rem; }
    .delivery-ticket { justify-self: center; width: 96%; max-width: 460px; padding: 1.5rem; transform: rotate(2deg); }
    .delivery-ticket dl > div { grid-template-columns: 1fr 1.7fr; }
    .site-footer { padding: 2rem 6% 1.5rem; }
    .footer-wordmark { font-size: 17.8vw; }
    .footer-bottom { align-items: flex-start; }
    .footer-bottom > span { width: 100%; }
  }
  @media (hover: none) {
    .food-wrap-birria:hover { transform: rotate(-13deg); }
    .food-wrap-korean:hover { transform: rotate(10deg); }
    .burrito-card:hover, .burrito-card.korean:hover { transform: none; box-shadow: none; }
    .button:hover { transform: none; box-shadow: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
}


</style>