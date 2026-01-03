# Design System

**Owner:** Frontend/Design | **Versión:** 0.1

Sistema de diseño basado en Tailwind CSS para consistencia visual.

## 🎨 Tokens de Diseño

### Colores

| Tipo | Color | Hex |
|------|-------|-----|
| Primary | Blue | #3B82F6 |
| Secondary | Green | #10B981 |
| Success | Green | #10B981 |
| Warning | Amber | #F59E0B |
| Error | Red | #EF4444 |

### Tipografía

**Familia:** Inter, system-ui, sans-serif

| Clase | Tamaño | Uso |
|-------|--------|-----|
| text-sm | 14px | Body small |
| text-base | 16px | Body |
| text-lg | 18px | Lead |
| text-xl | 20px | H4 |
| text-2xl | 24px | H3 |
| text-3xl | 30px | H2 |
| text-4xl | 36px | H1 |

### Espaciado & Bordes

**Espaciado:** 0, 1 (4px), 2 (8px), 4 (16px), 6 (24px), 8 (32px), 12 (48px)  
**Bordes:** rounded (4px), rounded-md (6px), rounded-lg (8px), rounded-xl (12px), rounded-full

## 🧩 Componentes

### Button

**Variantes:**
```tsx
// Primary
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Primary
</button>

// Secondary
<button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300">
  Secondary
</button>

// Outline
<button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
  Outline
</button>
```

### Card

```tsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
  <h3 className="text-xl font-bold mb-2">Title</h3>
  <p className="text-gray-600">Content</p>
</div>
```

### Input

```tsx
<input 
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Enter text..."
/>
```

### Badge

```tsx
// Success
<span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
  Verified
</span>

// Warning
<span className="px-2 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
  Pending
</span>
```

## 📱 Responsive

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Uso:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## 🎭 Estados

### Hover
```tsx
className="hover:bg-blue-700 hover:shadow-lg transition"
```

### Focus
```tsx
className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
```

### Active
```tsx
className="active:scale-95 transition"
```

### Disabled
```tsx
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

## 🌈 Utilidades

### Shadows
```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

### Transitions
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)
transition-colors: color, background-color 150ms
transition-transform: transform 150ms
```

## 📐 Layout

### Container
```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>
```

### Grid
```tsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-8">Main</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>
```

### Flex
```tsx
<div className="flex items-center justify-between gap-4">
  {/* Flex items */}
</div>
```

## 📚 Referencias

- [Tailwind CSS](https://tailwindcss.com/docs)
- [Componentes](../../client/components/)
- [Figma](https://figma.com/...) ⬜ Pendiente

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
