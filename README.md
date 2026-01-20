# 💍 Boda Diter & Vivian - Frontend

Aplicación web de invitación digital para la boda de Diter y Vivian 2026. Permite a los invitados confirmar su asistencia y a los novios administrar las confirmaciones.

## 🌟 Características

- ✅ **Invitación digital elegante** con información de la boda
- ✅ **Formulario de confirmación** de asistencia
- ✅ **Panel de administración** para los novios (protegido con JWT)
- ✅ **Autenticación segura** con tokens JWT
- ✅ **Responsive design** - funciona en móviles, tablets y desktop
- ✅ **Múltiples ambientes** (desarrollo y producción)

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM 6** - Navegación y rutas
- **Axios** - Cliente HTTP para consumir la API
- **Context API** - Manejo de estado de autenticación
- **CSS3** - Estilos personalizados

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── ProtectedRoute.jsx
├── config/             # Configuración
│   └── api.config.js
├── context/            # React Context
│   └── AuthContext.jsx
├── pages/              # Páginas de la aplicación
│   ├── HomePage/       # Invitación y formulario
│   ├── LoginPage/      # Login para novios
│   └── DashboardPage/  # Panel de administración
├── services/           # Servicios de API
│   ├── api.js          # Cliente Axios configurado
│   ├── auth.service.js
│   └── confirmacion.service.js
├── App.jsx             # Componente raíz con rutas
└── main.jsx            # Punto de entrada
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd FRONTEND-FullStack-frameworkbase
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configuración de ambientes**

El proyecto ya incluye archivos `.env.development` y `.env.production` configurados:

- **Desarrollo**: Consumirá `https://boda-diter-vivian-dev.onrender.com`
- **Producción**: Consumirá `https://boda-diter-vivian-prod.onrender.com`

## 🏃‍♂️ Scripts Disponibles

### Modo Desarrollo (Rama `develop`)

```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:3000` y consumirá la API de desarrollo.

### Build de Producción (Rama `main`)

```bash
npm run build
```
Genera los archivos optimizados para producción en la carpeta `dist/`.

### Preview de Producción

```bash
npm run preview
```
Previsualiza el build de producción localmente.

## 🌿 Estrategia de Ramas

### Rama `develop`
- Para desarrollo y pruebas
- Consumirá la API de **desarrollo**
- Desplegar aquí para testing antes de producción

### Rama `main`
- Solo código estable y probado
- Consumirá la API de **producción**
- Esta es la rama que se despliega a usuarios finales

### Workflow

```bash
# Trabajar en develop
git checkout develop
git add .
git commit -m "Nueva característica"
git push origin develop

# Cuando esté listo para producción
git checkout main
git merge develop
git push origin main
```

## 🔐 Autenticación

### Login de Novios

- **Ruta**: `/login`
- **Credenciales**: Configuradas en el backend
- **Token**: Se almacena en `localStorage` con clave `boda_auth_token`
- **Expiración**: 24 horas

### Rutas Protegidas

- `/dashboard` - Solo accesible con autenticación válida
- Redirección automática a `/login` si no está autenticado

## 🎨 Personalización

### Colores

Edita las variables CSS en [src/index.css](src/index.css):

```css
:root {
  --primary: #d4af37;      /* Dorado principal */
  --primary-dark: #b8941f;
  --secondary: #f8f5f0;    /* Crema claro */
  --accent: #e8d5b7;       /* Beige */
}
```

### Fuentes

El proyecto usa Google Fonts configuradas en [index.html](index.html):
- **Great Vibes** - Títulos elegantes
- **Playfair Display** - Subtítulos
- **Poppins** - Texto general

## 📱 Rutas de la Aplicación

| Ruta | Descripción | Acceso |
|------|-------------|---------|
| `/` | Página principal con invitación y formulario | Público |
| `/login` | Login para administradores (novios) | Público |
| `/dashboard` | Panel de administración con lista de asistentes | Protegido |

## 🔌 Integración con API

### Endpoints Consumidos

1. **POST /boda/asistencia** - Crear confirmación
2. **GET /boda/asistencia** - Obtener todas las confirmaciones (requiere auth)
3. **POST /auth/login** - Autenticación de novios

Ver documentación completa de la API en el archivo YAML incluido.

## 📦 Build y Despliegue

### Build Local

```bash
npm run build
```

Los archivos generados en `dist/` pueden ser desplegados en:
- Vercel
- Netlify
- GitHub Pages
- Render
- Cualquier hosting de archivos estáticos

### Variables de Entorno en Producción

Asegúrate de configurar las variables de entorno en tu plataforma de hosting:

```
VITE_API_BASE_URL=https://boda-diter-vivian-prod.onrender.com
VITE_APP_ENV=production
```

## 🐛 Troubleshooting

### Error de CORS
- Verifica que el backend tenga CORS configurado correctamente
- La URL de la API debe ser exacta (sin `/` al final)

### Token expirado
- El token JWT expira después de 24 horas
- Cierra sesión y vuelve a iniciar sesión

### Formulario no envía
- Verifica la conexión a internet
- Revisa que todos los campos requeridos estén completos
- Abre la consola del navegador para ver errores

## 👨‍💻 Desarrollo

### Agregar una nueva página

1. Crear componente en `src/pages/NombrePage/`
2. Agregar ruta en `src/App.jsx`
3. Crear estilos en `NombrePage.css`

### Agregar un nuevo servicio de API

1. Crear archivo en `src/services/nombre.service.js`
2. Importar `apiClient` de `src/services/api.js`
3. Usar los métodos HTTP de axios

## 📄 Licencia

MIT

## 💝 Créditos

Desarrollado con ❤️ para la boda de Diter & Vivian 2026

---

**¡Felicidades a los novios! 🎉**
