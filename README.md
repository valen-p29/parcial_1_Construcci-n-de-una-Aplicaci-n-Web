# 🛍️ Fashion Store - Tienda de Ropa Online

Una aplicación web moderna de comercio electrónico para una tienda de ropa con diseño responsivo, tema oscuro y funcionalidades completas de e-commerce.

## ✨ Características

### 🎨 Diseño y UX
- **Animaciones Suaves**: Transiciones CSS y efectos hover interactivos
- **Tipografía Moderna**: Fuente Inter para una experiencia de lectura óptima

### 🛒 Funcionalidades de E-commerce
- **Catálogo de Productos**: Visualización de productos con imágenes, precios y descripciones
- **Filtrado por Categorías**: Hombre, Mujer, Accesorios
- **Búsqueda Avanzada**: Búsqueda en tiempo real con sugerencias
- **Carrito de Compras**: Gestión completa del carrito con persistencia
- **Vista Rápida**: Modal detallado de productos con selección de tallas y cantidad
- **Lista de Deseos**: Funcionalidad de favoritos

### 🔐 Autenticación
- **Sistema de Login**: Autenticación con credenciales predefinidas
- **Gestión de Sesión**: Estado de autenticación persistente
- **Interfaz Adaptativa**: UI que cambia según el estado de autenticación

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS personalizadas
  - Grid y Flexbox para layouts
  - Animaciones y transiciones
  - Media queries para responsividad
- **JavaScript (ES6+)**:
  - Programación orientada a eventos
  - Fetch API para carga de datos
  - Manipulación del DOM
  - Gestión de estado local

### Librerías y Recursos
- **Google Fonts (Inter)**: Tipografía profesional
- **Unsplash**: Imágenes de alta calidad para productos

### Herramientas de Desarrollo
- **JSON**: Base de datos local para productos
- **Modular Architecture**: Separación de componentes HTML

## 📁 Estructura del Proyecto

```
tienda_de_ropa___fashion_store/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales
├── scripts/
│   └── app.js             # Lógica de la aplicación
├── data/
│   └── product.json       # Base de datos de productos
├── pages/
│   ├── header.html        # Componente de encabezado
│   └── footer.html        # Componente de pie de página
└── README.md              # Documentación
```

### Descripción de Archivos

#### `index.html`
- **Propósito**: Página principal de la aplicación
- **Contenido**: 
  - Estructura HTML semántica
  - Sección hero con imagen de fondo
  - Grid de productos dinámico
  - Modales para login, vista rápida y colección
  - Sidebar del carrito de compras

#### `css/styles.css`
- **Propósito**: Estilos completos de la aplicación
- **Características**:
  - Variables CSS para consistencia de colores
  - Diseño responsive con media queries
  - Animaciones y efectos visuales
  - Componentes modulares y reutilizables

#### `scripts/app.js`
- **Propósito**: Lógica principal de la aplicación
- **Funcionalidades**:
  - Gestión del estado de la aplicación
  - Manipulación del DOM
  - Eventos de usuario
  - Carga y filtrado de productos

#### `data/product.json`
- **Propósito**: Base de datos local de productos
- **Estructura**: Array de objetos con información de productos
- **Campos**: id, name, category, price, image, description, features

#### `pages/header.html` y `pages/footer.html`
- **Propósito**: Componentes modulares reutilizables
- **Beneficios**: Separación de responsabilidades y mantenibilidad

## 🎯 Funcionalidades

### 1. Navegación y Filtrado

#### Filtros de Categoría
- **Todos**: Muestra todos los productos disponibles
- **Hombre**: Productos masculinos (camisetas, jeans, trajes, etc.)
- **Mujer**: Productos femeninos (vestidos, blusas, chaquetas, etc.)
- **Accesorios**: Complementos (relojes, gafas, bolsos, etc.)

#### Búsqueda Inteligente
- **Búsqueda en Tiempo Real**: Filtrado instantáneo mientras escribes
- **Sugerencias Contextuales**: Categorías y términos populares
- **Búsqueda por Nombre**: Encuentra productos por su nombre
- **Búsqueda por Categoría**: Filtrado por tipo de producto

### 2. Gestión de Productos

#### Catálogo de Productos
- **Grid Responsivo**: Layout adaptativo según el dispositivo
- **Información Completa**: Nombre, categoría, precio, imagen
- **Efectos Visuales**: Hover effects y animaciones suaves
- **Carga Dinámica**: Productos cargados desde JSON

#### Vista Rápida (Quick View)
- **Modal Detallado**: Información completa del producto
- **Selección de Tallas**: XS, S, M, L, XL
- **Control de Cantidad**: Incrementar/decrementar cantidad
- **Características del Producto**: Lista detallada de features
- **Acciones Rápidas**: Añadir al carrito o comprar ahora

### 3. Carrito de Compras

#### Funcionalidades del Carrito
- **Sidebar Deslizable**: Panel lateral para gestión del carrito
- **Gestión de Productos**: Añadir, eliminar, modificar cantidad
- **Cálculo Automático**: Total actualizado en tiempo real
- **Persistencia**: Mantiene productos durante la sesión
- **Información Detallada**: Talla, cantidad, precio por producto

#### Proceso de Compra
- **Añadir al Carrito**: Desde grid de productos o vista rápida
- **Comprar Ahora**: Acceso directo al carrito
- **Gestión de Cantidades**: Control granular de cantidades
- **Resumen de Compra**: Total y detalles de productos

### 4. Sistema de Autenticación

#### Login de Usuario
- **Credenciales Predefinidas**: Sistema de prueba con credenciales fijas
- **Validación en Tiempo Real**: Verificación inmediata de credenciales
- **Feedback Visual**: Mensajes de error y éxito
- **Estado Persistente**: Mantiene sesión durante la navegación

#### Gestión de Sesión
- **Estado de Autenticación**: UI adaptativa según login status
- **Perfil de Usuario**: Acceso a funciones de usuario autenticado
- **Logout Implícito**: Cierre de sesión al recargar página

### 5. Lista de Deseos (Wishlist)

#### Funcionalidad de Favoritos
- **Añadir a Favoritos**: Desde grid de productos o vista rápida
- **Feedback Visual**: Confirmación de producto añadido
- **Gestión Futura**: Base para implementación completa

## 🏗️ Arquitectura

#### Componentes Modulares
```
Header (pages/header.html)
├── Navegación principal
├── Búsqueda
├── Carrito
└── Autenticación

Main Content (index.html)
├── Hero Section
├── Filtros de productos
├── Grid de productos
└── Modales

Footer (pages/footer.html)
├── Información de la empresa
├── Enlaces de navegación
├── Newsletter
└── Redes sociales
```
## 📊 API y Datos

### Estructura de Datos de Productos

```json
{
  "products": [
    {
      "id": 1,
      "name": "Nombre del Producto",
      "category": "hombre|mujer|accesorios",
      "price": 119900,
      "image": "URL_de_imagen",
      "description": "Descripción detallada del producto",
      "features": [
        "Característica 1",
        "Característica 2",
        "Característica 3"
      ]
    }
  ]
}
```

### Campos de Producto

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Number | Identificador único del producto |
| `name` | String | Nombre comercial del producto |
| `category` | String | Categoría: "hombre", "mujer", "accesorios" |
| `price` | Number | Precio en pesos colombianos (COP) |
| `image` | String | URL de la imagen del producto |
| `description` | String | Descripción detallada del producto |
| `features` | Array | Lista de características del producto |

## 🎨 Estilos y Diseño

### Sistema de Colores

```css
:root {
    /* Colores Principales */
    --primary-color: #ff4757;      /* Rojo vibrante */
    --secondary-color: #3742fa;    /* Azul eléctrico */
    
    /* Colores de Fondo */
    --bg-color: #0a0a0a;          /* Negro principal */
    --bg-secondary: #141414;       /* Gris oscuro */
    --bg-card: #1e1e1e;          /* Gris para tarjetas */
    
    /* Colores de Texto */
    --text-color: #ffffff;         /* Blanco principal */
    --text-light: #b8b8b8;       /* Gris claro */
    --text-muted: #8b8b8b;       /* Gris medio */
    
    /* Gradientes */
    --gradient: linear-gradient(135deg, #ff4757 0%, #3742fa 100%);
    --gradient-secondary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Tipografía

- **Fuente Principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Características**: Moderna, legible, optimizada para pantallas

### Componentes de UI

#### Botones
```css
.btn-primary {
    background: var(--gradient);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(255, 71, 87, 0.4);
}
```

#### Tarjetas de Producto
```css
.product-card {
    background: var(--bg-card);
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
}
```

#### Modales
```css
.modal-content {
    background: linear-gradient(135deg, var(--darker-color) 0%, var(--darkest-color) 100%);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
```

### Animaciones

#### Efectos de Hover
- **Elevación**: `translateY(-10px)` en tarjetas
- **Escala**: `scale(1.05)` en botones
- **Brillo**: Box-shadow con colores primarios

#### Transiciones
- **Duración**: 0.3s para la mayoría de efectos
- **Easing**: `ease` para transiciones naturales
- **Propiedades**: transform, box-shadow, color, background

#### Animaciones Keyframe
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

```

## 🔐 Credenciales de Prueba

### Acceso de Administrador

Para probar las funcionalidades de autenticación, utiliza las siguientes credenciales:

```
Email: admin@fashionstore.com
Contraseña: admin123
```

### Funcionalidades Post-Login

Una vez autenticado, el usuario puede:
- Acceder a funciones de perfil (en desarrollo)
- Ver estado de autenticación en el header
- Mantener sesión durante la navegación

### Implementación de Seguridad

```javascript
// Credenciales hardcodeadas para demo
const VALID_CREDENTIALS = {
    email: 'admin@fashionstore.com',
    password: 'admin123'
};

// Validación de login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email === VALID_CREDENTIALS.email && 
        password === VALID_CREDENTIALS.password) {
        isAuthenticated = true;
        updateAuthUI();
        showNotification('¡Bienvenido a Fashion Store!');
    } else {
        showNotification('Credenciales incorrectas');
    }
}
```

## 🚀 Funcionalidades Avanzadas

### Búsqueda Avanzada

#### Características de la Búsqueda
- **Búsqueda en Tiempo Real**: Filtrado instantáneo
- **Múltiples Campos**: Nombre y categoría de productos
- **Sugerencias Inteligentes**: Categorías y términos populares
- **Interfaz Intuitiva**: Overlay con sugerencias visuales

#### Implementación
```javascript
function toggleSearch() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        // Cerrar búsqueda
        searchBar.remove();
        searchTerm = '';
        renderProducts(currentFilter);
    } else {
        // Abrir búsqueda con sugerencias
        createSearchInterface();
    }
}
```

### Gestión Avanzada del Carrito

#### Características del Carrito
- **Productos Únicos por Talla**: Cada combinación producto-talla es un item único
- **Persistencia de Sesión**: Mantiene productos durante la navegación
- **Cálculos Automáticos**: Total y subtotales actualizados en tiempo real
- **Validación de Stock**: Control de cantidad máxima (10 unidades)

#### Estructura del Item de Carrito
```javascript
{
    id: 1,                    // ID del producto original
    cartId: "1-M",           // ID único para carrito (producto-talla)
    name: "Producto",        // Nombre del producto
    price: 119900,           // Precio unitario
    quantity: 2,             // Cantidad seleccionada
    selectedSize: "M",       // Talla seleccionada
    image: "url",            // Imagen del producto
    category: "hombre"       // Categoría del producto
}
```
