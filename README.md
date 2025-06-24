# React Background Location Tracking

Una aplicación React con Ionic que permite el seguimiento de ubicación en tiempo real, tanto en primer plano como en segundo plano, utilizando Capacitor y Redux.

## 🚀 Características

- **Seguimiento de ubicación en tiempo real** con Capacitor Geolocation
- **Funcionamiento en segundo plano** con Background Geolocation Community
- **Gestión de estado** con Redux Toolkit
- **Interfaz moderna** con botón play/pause dinámico
- **Envío automático** de coordenadas a API REST
- **Diseño responsivo** y animaciones fluidas
- **Soporte multiplataforma** (Web, iOS, Android)

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Ionic CLI (opcional, para desarrollo móvil)

## 🛠️ Instalación

### 1. Crear el proyecto Ionic React

```bash
# Crear nuevo proyecto Ionic React con TypeScript
ionic start react-background tabs --type=react --capacitor

# Navegar al directorio del proyecto
cd react-background
```

### 2. Instalar dependencias principales

```bash
# Instalar Capacitor Geolocation para geolocalización básica
npm install @capacitor/geolocation

# Instalar Background Geolocation Community para seguimiento en segundo plano
npm install @capacitor-community/background-geolocation

# Instalar Redux Toolkit y React Redux para gestión de estado
npm install @reduxjs/toolkit react-redux

# Instalar Axios para peticiones HTTP
npm install axios
```

### 3. Configurar Capacitor (para desarrollo móvil)

```bash
# Agregar plataformas móviles
npx cap add android
npx cap add ios

# Sincronizar cambios
npx cap sync
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── PlayPauseButton.tsx      # Botón principal de control
│   └── PlayPauseButton.css      # Estilos del botón
├── hooks/
│   └── useLocationTracking.ts   # Hook personalizado para geolocalización
├── pages/
│   ├── Home.tsx                 # Página principal
│   └── Home.css                 # Estilos de la página
├── services/
│   └── locationService.ts       # Servicio para API REST
├── store/
│   ├── hooks.ts                 # Hooks de Redux
│   ├── locationSlice.ts         # Slice de Redux para ubicación
│   └── store.ts                 # Configuración del store
├── App.tsx                      # Componente principal
└── main.tsx                     # Punto de entrada
```

## 🔧 Configuración

### Configuración de Redux

El proyecto utiliza Redux Toolkit para la gestión del estado. La configuración incluye:

- **Store principal** con middleware optimizado
- **Slice de ubicación** con acciones asíncronas
- **Hooks personalizados** para TypeScript

### Configuración de Geolocalización

#### Para Web (Capacitor Geolocation)

```typescript
// Configuración básica para web
const watchOptions = {
  enableHighAccuracy: true,
  timeout: 50000,
  maximumAge: 10000,
};

// Observar posición
const watchId = await CapacitorGeolocation.watchPosition(
  watchOptions,
  (position, error) => {
    // Manejar nueva posición
  }
);
```

#### Para Móvil (Background Geolocation)

```typescript
// Configuración para seguimiento en segundo plano
const backgroundOptions = {
  requestPermissions: true,
  stale: true,
  distanceFilter: 10,
  backgroundMessage: "Location tracking is enabled",
  backgroundTitle: "Location Tracking",
};

// Agregar observador
const watcherId = await BackgroundGeolocation.addWatcher(
  backgroundOptions,
  (location, error) => {
    // Manejar ubicación en segundo plano
  }
);
```

### Configuración de API

El servicio de ubicación está configurado para enviar datos a:

```typescript
const API_BASE_URL = 'http://localhost:8000/api';

// Endpoints disponibles:
// POST /api/locations - Enviar coordenadas
// GET /api/locations  - Obtener historial
// DELETE /api/locations - Eliminar historial
```

## 🎯 Uso

### 1. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 2. Usar la aplicación

1. **Abrir la aplicación** en el navegador
2. **Hacer clic en el botón play** para iniciar el seguimiento
3. **Permitir acceso a la ubicación** cuando el navegador lo solicite
4. **Ver las coordenadas actuales** en tiempo real
5. **Hacer clic en el botón pause** para detener el seguimiento

### 3. Funcionalidades

- **Botón dinámico**: Cambia entre iconos play/pause
- **Seguimiento automático**: Envía coordenadas al servidor
- **Estado visual**: Muestra información de carga y ubicación actual
- **Persistencia**: Mantiene el estado entre sesiones

## 🔒 Permisos

### Web

El navegador solicitará permisos de ubicación automáticamente. Para desarrollo local:

1. Asegúrate de usar HTTPS o localhost
2. Permite el acceso a la ubicación cuando se solicite
3. Verifica que el navegador tenga permisos de ubicación habilitados

### Móvil

Para Android e iOS, se requieren permisos adicionales:

#### Android (android/app/src/main/AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

#### iOS (ios/App/App/Info.plist)

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to location to track your position.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>This app needs access to location to track your position in background.</string>
```

## 🚀 Despliegue

### Build para producción

```bash
# Construir para web
npm run build

# Construir para móvil
npx cap build android
npx cap build ios
```

### Variables de entorno

Crea un archivo `.env` para configurar la API:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🐛 Solución de problemas

### Problemas comunes

1. **Permisos denegados**
   - Verifica que el navegador tenga permisos de ubicación
   - En móvil, verifica los permisos en configuración

2. **Error de CORS**
   - Asegúrate de que el servidor API permita peticiones desde tu dominio
   - Configura los headers CORS apropiados

3. **Geolocalización no funciona en web**
   - Verifica que uses HTTPS o localhost
   - Asegúrate de que el navegador soporte la API de geolocalización

4. **Background tracking no funciona**
   - En iOS, verifica que la app tenga permisos de "Always"
   - En Android, verifica los permisos de ubicación en segundo plano

### Debug

```bash
# Ver logs de Capacitor
npx cap run android --livereload --external
npx cap run ios --livereload --external

# Ver logs de Redux (en desarrollo)
// Abrir DevTools del navegador y usar Redux DevTools
```

## 📚 Recursos adicionales

- [Capacitor Geolocation Documentation](https://capacitorjs.com/docs/apis/geolocation)
- [Background Geolocation Community](https://github.com/capacitor-community/background-geolocation)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Ionic React Documentation](https://ionicframework.com/docs/react)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Julian** - [Tu GitHub](https://github.com/tuusuario)

---

⭐ Si este proyecto te ayudó, ¡dale una estrella! 