# SEO & SEM Strategy

**Owner:** Marketing/Growth | **Versión:** 0.1

Estrategia de posicionamiento orgánico y paid para el MVP.

## 🎯 Objetivos

- ⬜ Top 10 en Google para "podólogo [ciudad]"
- ⬜ 1,000 visitas orgánicas/mes (mes 3)
- ⬜ CTR > 3% en anuncios
- ⬜ CPA < €10

## 🔍 SEO Strategy

### On-Page SEO

**Meta Tags:**
```html
<title>Podólogo en Madrid | Directory of Podiatrists</title>
<meta name="description" content="Encuentra los mejores podólogos en Madrid. Reseñas verificadas, precios y contacto directo.">
<meta name="keywords" content="podólogo madrid, podología, tratamiento pies">
```

**Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Dr. Juan Pérez",
  "address": {...},
  "aggregateRating": {...}
}
```

**URLs Amigables:**
```
✅ /profesionales/dr-juan-perez-madrid
❌ /professional?id=123
```

### Technical SEO

**Performance:**
- ⬜ Lighthouse score > 90
- ⬜ Core Web Vitals optimizados
- ⬜ Images optimizadas (WebP)
- ⬜ Lazy loading

**Indexación:**
```xml
<!-- sitemap.xml -->
<urlset>
  <url>
    <loc>https://example.com/profesionales/dr-juan-perez</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**robots.txt:**
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://example.com/sitemap.xml
```

### Content Strategy

**Palabras Clave Objetivo:**

| Keyword | Volumen | Dificultad | Prioridad |
|---------|---------|------------|-----------|
| podólogo [ciudad] | 1,000/mes | Media | 🔴 Alta |
| tratamiento uñas encarnadas | 500/mes | Baja | 🟡 Media |
| biomecánica pie | 300/mes | Baja | 🟡 Media |
| podólogo deportivo | 200/mes | Media | 🟢 Baja |

**Contenido:**
- ⬜ Landing pages por ciudad
- ⬜ Blog con artículos educativos
- ⬜ FAQs optimizadas
- ⬜ Guías de tratamientos

### Link Building

**Estrategias:**
- ⬜ Directorios médicos
- ⬜ Guest posts en blogs de salud
- ⬜ Partnerships con clínicas
- ⬜ Menciones en prensa local

## 💰 SEM Strategy (Google Ads)

### Campañas

**1. Search - Marca**
- Keywords: "directory of podiatrists", "directorio podólogos"
- Budget: €100/mes
- CPC objetivo: €0.50

**2. Search - Genérico**
- Keywords: "podólogo [ciudad]", "podólogo cerca de mí"
- Budget: €500/mes
- CPC objetivo: €2.00

**3. Display - Remarketing**
- Audiencia: Visitantes últimos 30 días
- Budget: €200/mes
- CPC objetivo: €0.30

### Estructura de Anuncios

```
Headline 1: Encuentra tu Podólogo en Madrid
Headline 2: Reseñas Verificadas | Contacto Directo
Description: Compara precios y servicios. Miles de pacientes satisfechos.
URL: example.com/madrid
```

### Landing Pages

**Estructura:**
```
/madrid
  - Hero con búsqueda
  - Top 10 podólogos
  - Testimonios
  - CTA: "Buscar ahora"
```

## 📊 Métricas y KPIs

### SEO
- ⬜ Posiciones en Google (Top 10)
- ⬜ Tráfico orgánico
- ⬜ CTR en SERPs
- ⬜ Bounce rate < 40%
- ⬜ Time on site > 2 min

### SEM
- ⬜ Impressions
- ⬜ Clicks
- ⬜ CTR > 3%
- ⬜ CPC < €2
- ⬜ Conversiones
- ⬜ CPA < €10

### Conversiones
- ⬜ Leads generados
- ⬜ Tasa de conversión > 5%
- ⬜ Llamadas telefónicas
- ⬜ Formularios completados

## 🛠️ Herramientas

**SEO:**
- Google Search Console
- Google Analytics 4
- Ahrefs / SEMrush
- Screaming Frog

**SEM:**
- Google Ads
- Google Tag Manager
- Hotjar (heatmaps)

## 📅 Roadmap

### Mes 1
- ⬜ Setup Google Search Console/Analytics
- ⬜ Optimización on-page básica
- ⬜ Sitemap y robots.txt
- ⬜ Primera campaña Google Ads

### Mes 2-3
- ⬜ Contenido SEO (10 artículos)
- ⬜ Link building (20 backlinks)
- ⬜ Optimización campañas SEM
- ⬜ A/B testing landing pages

### Mes 4-6
- ⬜ Expansión a más ciudades
- ⬜ Campañas display
- ⬜ Partnerships estratégicos
- ⬜ PR y menciones en prensa

## 📚 Referencias

- [Google Search Console](https://search.google.com/search-console)
- [Google Ads](https://ads.google.com/)
- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
