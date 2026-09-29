<template>
  <section id="resenas" class="reviews-section" aria-labelledby="reviews-title">
    <div class="reviews-heading">
      <div>
        <p class="eyebrow">LO DE PAC / LA VOZ DEL BARRIO</p>
        <h2 id="reviews-title">EL BOCA A BOCA.<br /><span>AHORA EN GOOGLE.</span></h2>
      </div>
      <a class="reviews-source" :href="siteInfo.googleReviews" target="_blank" rel="noopener noreferrer">
        <SocialIcon name="google" /> Leé las reseñas <span aria-hidden="true">↗</span>
      </a>
    </div>
    <div v-if="customerReviews.length" id="reviews-track" ref="track" class="reviews-grid" tabindex="0" role="region" aria-label="Reseñas de clientes, deslizá para ver más" @scroll.passive="updateNavigation" @keydown.left.prevent="slide(-1)" @keydown.right.prevent="slide(1)">
      <figure v-for="review in customerReviews" :key="review.author + review.url" class="review-card">
        <div class="review-top"><span>DEL BARRIO, CON GANAS.</span><SocialIcon name="google" /></div>
        <blockquote>{{ review.text }}</blockquote>
        <figcaption><strong>{{ review.author }}</strong><a :href="review.url" target="_blank" rel="noopener noreferrer">Reseña en Google ↗</a></figcaption>
      </figure>
    </div>
    <div v-if="customerReviews.length > 1" class="reviews-navigation">
      <span>BUENOS BURRITOS. BUENAS PALABRAS.</span>
      <div class="reviews-arrows">
        <button type="button" aria-label="Ver reseñas anteriores" aria-controls="reviews-track" :disabled="atStart" @click="slide(-1)"><span aria-hidden="true">←</span></button>
        <button type="button" aria-label="Ver más reseñas" aria-controls="reviews-track" :disabled="atEnd" @click="slide(1)"><span aria-hidden="true">→</span></button>
      </div>
    </div>
    <div class="review-invitation">
      <span class="review-flower" aria-hidden="true">✳︎</span>
      <div class="invitation-copy"><p>¿YA PROBASTE NUESTROS BURRITOS?</p><span>Contá cómo estuvo. Tu reseña nos ayuda a llegar más lejos.</span></div>
      <a class="button review-button" :href="siteInfo.googleWriteReview" target="_blank" rel="noopener noreferrer">Dejá tu reseña <span aria-hidden="true">↗</span></a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteInfo } from '#shared/utils/seo';
import { customerReviews } from '../data/reviews';

const track = ref<HTMLElement | null>(null);
const atStart = ref(true);
const atEnd = ref(false);
let resizeObserver: ResizeObserver | undefined;

function updateNavigation() {
  const element = track.value;
  if (!element) return;
  atStart.value = element.scrollLeft <= 2;
  atEnd.value = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
}

function slide(direction: number) {
  const element = track.value;
  const card = element?.querySelector<HTMLElement>('.review-card');
  if (!element || !card) return;
  const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap);
  element.scrollBy({
    left: direction * step,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}

onMounted(() => {
  updateNavigation();
  resizeObserver = new ResizeObserver(updateNavigation);
  if (track.value) resizeObserver.observe(track.value);
});
onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<style scoped>
.reviews-section { max-width: 1600px; margin: 0 auto; padding: 5rem 4.5%; border-top: 1px solid #fff3a344; }
.reviews-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; }
h2 { margin-top: 1rem; font-size: clamp(2.7rem, 5.5vw, 5.5rem); }
h2 span { color: var(--orange); text-shadow: .025em .025em 0 var(--navy), .055em .055em 0 var(--yellow); }
.reviews-source { display: inline-flex; align-items: center; gap: .8rem; padding: .75rem 0; border-bottom: 1px solid currentColor; font-weight: 700; flex-shrink: 0; transition: color .2s; }
.reviews-source:hover { color: var(--orange); }
.reviews-grid { display: grid; grid-auto-flow: column; grid-auto-columns: calc((100% - 3rem) / 3); gap: 1.5rem; margin-top: 3rem; padding-bottom: 12px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; scrollbar-width: none; }
.reviews-grid::-webkit-scrollbar { display: none; }
.review-card { min-width: 0; scroll-snap-align: start; display: flex; flex-direction: column; margin: 0; padding: 1.75rem; color: var(--blue); background: var(--yellow); box-shadow: 6px 6px 0 var(--navy); }
.reviews-navigation { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 1rem; }
.reviews-navigation > span { font-size: .7rem; font-weight: 800; letter-spacing: .06em; }
.reviews-arrows { display: flex; gap: .75rem; flex-shrink: 0; }
.reviews-arrows button { display: grid; place-items: center; width: 48px; height: 48px; padding: 0; border: 2px solid var(--yellow); border-radius: 50%; background: transparent; color: var(--yellow); font-size: 1.6rem; transition: background .2s, color .2s, transform .2s, box-shadow .2s; }
.reviews-arrows button:hover:not(:disabled) { background: var(--yellow); color: var(--blue); transform: translateY(-2px); box-shadow: 3px 3px 0 var(--navy); }
.reviews-arrows button:disabled { opacity: .35; cursor: default; }
.review-card:nth-child(2n) { background: var(--paper); }
.review-top { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.review-top > span { font-size: .7rem; font-weight: 800; letter-spacing: .08em; }
blockquote { margin: 1.5rem 0 2rem; font-size: 1.05rem; line-height: 1.7; white-space: pre-line; overflow-wrap: anywhere; }
blockquote::before { content: '“'; display: block; font-family: var(--display); font-size: 4rem; line-height: .7; }
figcaption { display: grid; gap: .3rem; margin-top: auto; padding-top: 1rem; border-top: 1px dashed #1f407566; }
figcaption a { width: fit-content; font-size: .8rem; text-decoration: underline; text-underline-offset: .2em; }
.review-invitation { display: flex; align-items: center; gap: 2rem; margin-top: 3rem; padding: 2rem; border: 2px dashed var(--orange); border-radius: 4px; }
.review-flower { font-size: 4.5rem; line-height: 1; color: var(--orange); }
.invitation-copy { flex: 1; }
.invitation-copy p { font-family: var(--display); font-weight: 900; font-size: 2.3rem; line-height: 1.1; }
.invitation-copy > span { display: block; margin-top: .5rem; color: var(--paper); }
.review-button { flex-shrink: 0; background: var(--orange); border-color: var(--orange); }
.review-button:hover { background: var(--yellow); border-color: var(--yellow); }
@media (max-width: 1100px) { .reviews-grid { grid-auto-columns: calc((100% - 1.5rem) / 2); } }
@media (max-width: 900px) { .reviews-heading { align-items: start; flex-direction: column; } .review-invitation { flex-wrap: wrap; } .review-button { margin-left: auto; } }
@media (max-width: 600px) { .reviews-grid { grid-auto-columns: 90%; gap: 1rem; margin-top: 2rem; } .review-card { padding: 1.5rem; } }
@media (max-width: 760px) { .reviews-section { padding: 3.5rem 6%; } .review-invitation { gap: 1rem; padding: 1.5rem; } .review-flower { font-size: 3rem; } .invitation-copy { flex-basis: 100%; } .review-button { width: 100%; margin-top: .75rem; } }
</style>
