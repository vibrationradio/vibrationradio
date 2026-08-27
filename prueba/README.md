# MargaExpress

Sitio web estático para **MargaExpress**, una mini empresa de reparto y distribución de paquetes. El sitio está diseñado para ser fácilmente editable (HTML/CSS/JS plano, sin frameworks de build) y presenta a la empresa, sus servicios, una galería con carrusel automático, acceso a la plataforma de rastreo de envíos (vaenvio.com) y los datos de contacto.

## 🎯 Objetivo del proyecto
Dar presencia web a MargaExpress, permitiendo a los clientes:
- Conocer la empresa y sus servicios.
- Ver fotos de la operación de reparto (carrusel automático).
- Acceder a la plataforma de rastreo de paquetes (vaenvio.com).
- Contactar por teléfono, WhatsApp o Instagram fácilmente.

## ✅ Funcionalidades completadas
- **Header fijo** con logo, menú de navegación (con versión móvil tipo hamburguesa) y botón directo a WhatsApp.
- **Sección Hero** con mensaje principal, llamados a la acción y estadísticas destacadas.
- **Carrusel automático de fotos** (sección "Galería"): cambia de imagen cada 4 segundos, con flechas de navegación, indicadores (dots) y pausa al pasar el mouse.
- **Sección "Nosotros"** con la descripción oficial de la empresa y una lista de puntos fuertes.
- **Sección "Servicios"** con 4 tarjetas: entrega de paquetes, distribución, rastreo y atención cercana.
- **Sección "Rastrear Envío"**: intenta embeber la plataforma **https://www.vaenvio.com** dentro de un iframe. Como esa plataforma bloquea ser mostrada dentro de otros sitios (protección de seguridad `X-Frame-Options`/CSP definida por el propio vaenvio.com, fuera de nuestro control), el sitio detecta automáticamente ese bloqueo con JavaScript y muestra en su lugar una tarjeta con un botón que abre **www.vaenvio.com** en una pestaña nueva. Si en algún momento vaenvio.com permite ser embebido, el iframe se mostrará normalmente sin cambios adicionales.
- **Sección "Contacto"** con:
  - Teléfono: **099 894 035** (enlace `tel:` y WhatsApp).
  - Instagram: **@danieldamirez** (enlace directo al perfil).
  - Enlace a la plataforma de rastreo vaenvio.com.
  - Tarjeta destacada con botones de WhatsApp y llamada directa.
- **Botón flotante de WhatsApp** visible en todas las páginas/secciones.
- **Footer** con marca, redes sociales y año dinámico.
- **Diseño responsive** (adaptado a escritorio y móvil), fondo blanco/blanco cálido y paleta de colores naranja + azul marino como identidad de marca.
- **Logo**: se utiliza el logo/wordmark oficial de MargaExpress en formato PNG con fondo transparente (`images/logo.png`), ubicado en la esquina superior izquierda del header, en el footer y como favicon.
- **Paleta de colores**: el sitio usa **celeste, azul y blanco** (colores tomados del logo oficial) en botones, íconos, acentos de texto y footer. El fondo general del sitio se mantiene en **blanco**, tal como estaba.
- **Botón flotante "Subir arriba"**: aparece en la esquina inferior izquierda (ícono de flecha hacia arriba) cuando el usuario baja más de 400px en la página; al hacer clic, sube suavemente al inicio. El botón de WhatsApp se mantiene en la esquina inferior derecha, sin cambios.

## 🌐 Estructura del sitio (una sola página, con anclas)
| Sección | Ancla | Contenido |
|---|---|---|
| Inicio | `#inicio` | Header + Hero |
| Galería | `#galeria` | Carrusel automático de fotos |
| Nosotros | `#nosotros` | Descripción de la empresa |
| (sin ancla propia) | — | Servicios |
| Rastrear Envío | `#rastreo` | Iframe/acceso a vaenvio.com |
| Contacto | `#contacto` | Teléfono, WhatsApp, Instagram |

No hay parámetros de URL ni rutas adicionales: todo vive en `index.html`.

## 🗂️ Estructura de archivos
```
index.html          → Página principal (toda la web)
css/
  └── style.css      → Estilos (colores, layout, responsive, carrusel)
js/
  └── main.js        → Menú móvil, carrusel automático, detección de bloqueo del iframe
images/
  ├── logo.png             → Logo/wordmark oficial de MargaExpress, fondo transparente (reemplazable)
  ├── carousel-1.jpg …5.jpg → Fotos del carrusel/galería
README.md
```

## ✏️ Cómo editar lo más común

### Cambiar el logo
Reemplaza el archivo `images/logo.png` por la versión actualizada del logo de MargaExpress (idealmente PNG con fondo transparente). El nombre del archivo debe mantenerse igual, o si cambias el nombre/extensión, actualiza las referencias en `index.html` (aparece 3 veces: favicon, header y footer).

### Ajustar el botón "Subir arriba"
En `js/main.js`, la constante `SCROLL_THRESHOLD` (dentro de la sección "Botón flotante Subir arriba") controla a partir de cuántos píxeles de scroll aparece el botón (por defecto `400`). El estilo del botón está en `css/style.css` bajo `.back-to-top`.

### Cambiar la paleta de colores (celeste / azul / blanco)
Todos los colores del sitio están centralizados como variables CSS al inicio de `css/style.css`:
```css
--celeste: #29ABE2;
--celeste-oscuro: #0E86C9;
--azul: #0B2545;
--azul-claro: #13315C;
```
Cambia estos valores para ajustar el tono exacto de celeste/azul en todo el sitio (botones, íconos, acentos, footer, etc.) sin tocar el resto del código.

### Cambiar teléfono / WhatsApp
Buscar y reemplazar en `index.html`:
- Texto visible: `099 894 035`
- Enlaces: `tel:+593998940035` y `https://wa.me/593998940035`

### Cambiar Instagram
Buscar `https://www.instagram.com/danieldamirez` y `@danieldamirez` en `index.html`.

### Cambiar la descripción de la empresa
Buscar el párrafo que empieza con "En MargaExpress nos encargamos de la entrega..." (aparece en el Hero y en la sección Nosotros).

### Cambiar fotos del carrusel
Reemplaza `images/carousel-1.jpg` a `images/carousel-5.jpg` por tus propias fotos (mismo nombre) o agrega más `<div class="carousel-slide">` en `index.html` dentro de `#carouselTrack`.

### Cambiar velocidad del carrusel automático
En `js/main.js`, modifica la constante `AUTOPLAY_DELAY` (en milisegundos, por defecto `4000` = 4 segundos).

## ⚠️ Nota importante sobre el rastreo de envíos (vaenvio.com)
La integración con `https://www.vaenvio.com` se hizo mediante un `<iframe>`. Muchos sitios web (incluido, aparentemente, vaenvio.com) configuran su servidor para **impedir ser mostrados dentro de otro sitio** (cabecera `X-Frame-Options: DENY/SAMEORIGIN` o `Content-Security-Policy: frame-ancestors`), como medida de seguridad estándar contra "clickjacking". Esto **no se puede forzar ni desactivar desde MargaExpress**, ya que la restricción la impone el propio servidor de vaenvio.com.

Por eso, el sitio incluye una detección automática: si el iframe no logra mostrar contenido, aparece una tarjeta con un botón que abre vaenvio.com en una pestaña nueva, garantizando que el usuario siempre pueda acceder al rastreo sin encontrarse con un recuadro vacío.

## 🚧 No implementado / posibles mejoras futuras
- Formulario de contacto propio con envío de correo (requeriría un servicio backend o de terceros compatible con sitios estáticos, p. ej. Formspree).
- Sistema de cotización de envíos en línea.
- Panel de administración para gestionar pedidos (requeriría base de datos y backend).
- Multilenguaje.
- Blog o sección de noticias.

## 🛠️ Tecnologías usadas
- HTML5 semántico
- CSS3 (variables CSS, Grid, Flexbox, animaciones)
- JavaScript vanilla (sin frameworks)
- Font Awesome (iconos, vía CDN)
- Google Fonts: Poppins y Nunito (vía CDN)

## 📦 Datos y almacenamiento
Este sitio **no utiliza base de datos ni tablas**: es un sitio informativo/institucional sin necesidad de persistencia de datos. Toda la información (teléfono, redes, descripción, fotos) está directamente en el código, lista para edición manual.

## 🚀 Publicación
Para publicar el sitio y obtener una URL pública, usa la pestaña **Publish** del editor, que se encarga de todo el proceso de despliegue automáticamente.
