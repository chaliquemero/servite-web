# SERVITE — Landing Page

Landing page oficial de **SERVITE (Self-Service Beverage System)**: sistema de autoservicio de bebidas con canillas inteligentes y plataforma digital.

## Modos de consumo

- **App + NFC · Saldo por mililitros**: cargás saldo, elegís canilla y la canilla despacha por ml hasta agotar el saldo. NFC = misma experiencia apoyando la tarjeta en la barra.
- **QR · Medida fija**: escaneás el QR, pagás y la canilla te libera una única medida (ej. 400 ml).

## Estructura

```
servite-web/
├── index.html          # Página principal (una sola página, secciones ancladas)
├── css/style.css       # Estilos (identidad: negro #0a0a0a + rojo #c0392b/#e74c3c, fuente Inter)
├── js/main.js          # Interacciones: slider de la app, animación de canilla, FAQ, formulario
└── img/
    ├── Logotipo_*.png  # Logos oficiales de la marca
    └── eventos/        # Fotos de eventos reales (se muestran solas al existir)
```

## Fotos de eventos

Copiá las fotos a `img/eventos/` con estos nombres (los placeholders se reemplazan solos):

| Archivo | Dónde se usa |
|---|---|
| `hero-evento-01.jpg` | Fondo del hero (opcional) |
| `barra-01.jpg`, `barra-02.jpg` | Sección "La barra" |
| `galeria-01.jpg` ... `galeria-04.jpg` | Galería "SERVITE en acción" |

## Personalizar

- Número de WhatsApp: buscar `5491100000000` en `index.html`
- Email de contacto: `hola@servite.com.ar` en `index.html` y `js/main.js`
- Redes sociales (Instagram/LinkedIn): enlaces placeholder en el footer de `index.html`
- Pantallas del mockup de la app: secciones `.screen` dentro de `#app` en `index.html`

## Cómo correrla

Solo abrir `index.html` en el navegador, o servirla con cualquier servidor estático (Python, Node, Netlify, GitHub Pages, etc.).
