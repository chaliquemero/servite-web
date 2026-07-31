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

Las fotos actuales están en `img/eventos/` y se muestran solas al existir (si un archivo falta, aparece el placeholder). Para reemplazar una, copiá la nueva foto con el mismo nombre:

| Archivo | Dónde se usa | Origen actual |
|---|---|---|
| `barra-01.jpg` | Sección "La barra" (tile grande) | Evento 2 (noche cálida) |
| `barra-02.jpg` | Sección "La barra" (tile chico) | Evento 1 (día) |
| `galeria-01.jpg` ... `galeria-04.jpg` | Galería "SERVITE en acción" | Eventos 1, 2 y 3 |

Las originales (sin optimizar) están en el Drive: `drive.google.com/drive/folders/1gr6FLVmubC44ICF4zq7lx12E-0c8R4Dc`.

## Video

`img/videos/noche.mp4` (H.264/AAC, compatible con todos los navegadores) se muestra en la galería con poster y botón de play; se reproduce bajo demanda (`preload="none"`, no se descarga hasta que el usuario lo abre).

## Pendientes

- [ ] Reemplazar datos de contacto por los reales: WhatsApp (`5491100000000`), email (`hola@servite.com.ar`), Instagram (`instagram.com/servite`) y LinkedIn (`linkedin.com/company/servite`) en `index.html` y `js/main.js`.
- [ ] Reemplazar `img/videos/noche.mp4` por una versión comprimida (< 5 MB) cuando haya una herramienta de encoding disponible.

## Personalizar

- Número de WhatsApp: buscar `5491100000000` en `index.html`
- Email de contacto: `hola@servite.com.ar` en `index.html` y `js/main.js`
- Redes sociales (Instagram/LinkedIn): enlaces placeholder en el footer de `index.html`
- Pantallas del mockup de la app: secciones `.screen` dentro de `#app` en `index.html`

## Cómo correrla

Solo abrir `index.html` en el navegador, o servirla con cualquier servidor estático (Python, Node, Netlify, GitHub Pages, etc.).
