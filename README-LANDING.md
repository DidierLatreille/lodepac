# Lo de Pac

Landing en Nuxt 4.5.2, Vue 3.5.42 y Vue Router 5.3.1. Mantiene npm, el lockfile y las dependencias del proyecto original. No agrega librerías de UI ni de animación.

## Desarrollo

Usar una versión de Node compatible con Nuxt: 22.19 o posterior de la rama 22, 24.11 o posterior de la rama 24, o 26 o posterior.

- `npm run dev`: desarrollo local.
- `npm run build`: compila y prerenderiza la página de inicio.
- `npm run generate`: genera el sitio estático completo en `.output/public`.
- `npm run preview`: previsualiza la compilación.

## Edición

- `app/app.vue`: textos, variedades, enlaces, precios y horarios.
- `app/assets/css/main.css`: colores, tipografía, responsive y hover effects.
- `app/components/FoodPhoto.vue`: muestra los PNG de los burritos completos, respetando sus proporciones y transparencia.
- `app/assets/birria.png` y `app/assets/koreanBBC.png`: fotos utilizadas en la intro.
- `app/assets/menu.jpg`: menú original provisto.
- `public/favicon.svg`: favicon tipográfico.

## Contenido comercial

Los $14.000 por unidad, zonas, horarios y datos de Birria y Korean BBQ provienen del material proporcionado. Confirmarlos antes de abrir la página al público. La ficha de Philly no inventa ingredientes que no aparecían en las referencias.

Los enlaces de pedidos abren el perfil real `@lodepac` en Instagram. No se agregó un WhatsApp ficticio, ni se envían mensajes automáticamente. Para agregar WhatsApp, reemplazar el destino de pedidos cuando se confirme el número.

La página tiene navegación móvil, foco visible, enlace para saltar al contenido, textos alternativos y soporte para reducir movimiento. Los efectos de hover son decorativos: el menú, los precios y los pedidos también funcionan con pantalla táctil.

## SEO

El título principal para buscadores es **Burritos en Vicente López y Martínez | Lo de Pac**. La descripción y el contenido visible describen las variedades y las zonas de entrega. El HTML se genera antes de servir la página: los buscadores pueden leer el contenido y los metadatos sin esperar a JavaScript.

- `shared/utils/seo.ts`: datos de marca, normalización del dominio y datos estructurados.
- `app/composables/useLandingSeo.ts`: título, descripción, idioma, Open Graph, Twitter, canonical y JSON-LD.
- `server/routes/robots.txt.ts`: instrucciones de rastreo y referencia al sitemap.
- `server/routes/sitemap.xml.ts`: sitemap de la página de inicio, con URL absoluta.

Los datos estructurados incluyen `Organization`, `WebSite`, `WebPage` y `Menu`. Las descripciones y los precios se toman de los mismos datos usados en la página para evitar diferencias. No se incluyen reseñas, puntuaciones, dirección física ni disponibilidad que no estén confirmadas. No se agregó una imagen nueva para redes sociales.

### Activar el dominio definitivo

1. Copiar `.env.example` a `.env` y completar `NUXT_PUBLIC_SITE_URL` con el dominio público HTTPS, sin rutas ni parámetros. También se puede definir esa variable en el servicio de hosting.
2. Ejecutar `npm run generate` nuevamente y publicar **todo** `.output/public`.
3. Verificar que `/robots.txt` incluya la dirección de `/sitemap.xml` y que la portada tenga un único canonical apuntando al dominio definitivo.

Mientras la variable esté vacía, la página queda en `noindex, follow`, no declara un dominio canonical y no genera un sitemap ficticio. El entorno de desarrollo siempre usa `noindex`. Al configurar el dominio y generar producción, se activan `index, follow`, canonical, `og:url` y el sitemap. Cambiar una variable después de subir archivos estáticos no actualiza el HTML: hay que volver a generar y publicar.

`robots.txt` permite el rastreo para que Google pueda leer la etiqueta `noindex`; bloquear el rastreo no equivale a quitar una URL del índice. Esta configuración tampoco reemplaza el control de acceso de una vista privada.

### Cuando la web esté pública

Verificar la propiedad del dominio en Google Search Console, enviar `/sitemap.xml` e inspeccionar la portada. Estas acciones requieren acceso a la cuenta o al dominio y todavía no se realizaron. La indexación y la posición en Google no están garantizadas.

Para ampliar a datos `Restaurant`/`LocalBusiness`, primero se necesita la dirección física real y publicable del negocio. Las zonas de delivery no son una dirección. El código actual no presenta un marcado incompleto de restaurante como si fuera elegible para resultados enriquecidos.

Referencias: [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [datos de negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business).
