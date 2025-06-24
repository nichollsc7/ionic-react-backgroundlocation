# React Background Location Tracking

## 🇬🇧 English

A React + Ionic app for real-time location tracking, both in foreground and background, using Capacitor and Redux.

### 🚀 Features
- Real-time location tracking with Capacitor Geolocation
- Background tracking with Background Geolocation Community
- State management with Redux Toolkit
- Modern play/pause button UI
- Automatic coordinate sending to REST API
- Responsive design and smooth animations
- Multi-platform support (Web, iOS, Android)

### 📋 Prerequisites
- Node.js (v16+)
- npm or yarn
- Ionic CLI (optional, for mobile development)

### 🛠️ Installation
1. **Create Ionic React project**
   ```bash
   ionic start react-background tabs --type=react --capacitor
   cd react-background
   ```
2. **Install dependencies**
   ```bash
   npm install @capacitor/geolocation
   npm install @capacitor-community/background-geolocation
   npm install @reduxjs/toolkit react-redux
   npm install axios
   ```
3. **Add mobile platforms (optional)**
   ```bash
   npx cap add android
   npx cap add ios
   npx cap sync
   ```

### 🏗️ Project Structure
```
src/
├── components/           # UI components
├── hooks/                # Custom hooks (location tracking)
├── pages/                # Main pages
├── services/             # API services
├── store/                # Redux store & slices
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

### 🔧 Configuration
- **Redux**: Store, slices, and hooks for state management
- **Geolocation**:
  - Web: `@capacitor/geolocation`
  - Mobile: `@capacitor-community/background-geolocation`
- **API**: Send coordinates to `http://localhost:8000/api/locations`

### 🎯 Usage
1. Start dev server:
   ```bash
   npm run dev
   ```
2. Open the app in your browser or run on a device
3. Click the play button to start tracking
4. Allow location permissions
5. See real-time coordinates and status
6. Click pause to stop tracking

### 🔒 Permissions
- **Web**: Allow location in browser (use HTTPS or localhost)
- **Android**: Add location permissions in `AndroidManifest.xml`
- **iOS**: Add location usage descriptions in `Info.plist`

### 🐛 Troubleshooting
- Make sure permissions are granted
- Use HTTPS/localhost for web
- Check CORS if using a remote API
- For mobile, test on a real device for background tracking

### 👨‍💻 Author
**Julian** - [Your GitHub](https://github.com/tuusuario)

---

## 🇪🇸 Español

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
ionic start react-background tabs --type=react --capacitor
cd react-background
```

### 2. Instalar dependencias principales

```bash
npm install @capacitor/geolocation
npm install @capacitor-community/background-geolocation
npm install @reduxjs/toolkit react-redux
npm install axios
```

### 3. Configurar Capacitor (para desarrollo móvil)

```bash
npx cap add android
npx cap add ios
npx cap sync
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
├── hooks/
├── pages/
├── services/
├── store/
├── App.tsx
└── main.tsx
```

## 🔧 Configuración
- **Redux**: Store, slices y hooks personalizados
- **Geolocalización**: Web con `@capacitor/geolocation`, móvil con `@capacitor-community/background-geolocation`
- **API**: Envío de coordenadas a `http://localhost:8000/api/locations`

## 🎯 Uso
1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
2. Abre la app en el navegador o en un dispositivo
3. Haz clic en el botón play para iniciar el seguimiento
4. Permite los permisos de ubicación
5. Observa las coordenadas y el estado en tiempo real
6. Haz clic en pausa para detener el seguimiento

## 🔒 Permisos
- **Web**: Permite la ubicación en el navegador (usa HTTPS o localhost)
- **Android**: Agrega permisos de ubicación en `AndroidManifest.xml`
- **iOS**: Agrega descripciones de uso de ubicación en `Info.plist`

## 🐛 Solución de problemas
- Asegúrate de otorgar permisos
- Usa HTTPS/localhost en web
- Verifica CORS si usas una API remota
- En móvil, prueba en un dispositivo real para seguimiento en background

## 👨‍💻 Autor
**Julian** - [Tu GitHub](https://github.com/tuusuario)

---

⭐ If this project helped you, give it a star! / ¡Si este proyecto te ayudó, dale una estrella! 