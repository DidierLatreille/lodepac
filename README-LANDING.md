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
