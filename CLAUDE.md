# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **uni-app** cross-platform application project named "CloudExhibition" (云展览 - Cloud Exhibition). The project uses Vue 3 with uni-app framework to build applications that can be deployed to multiple platforms including H5, WeChat mini-program, Alipay mini-program, Baidu mini-program, and other mini-program platforms.

## Project Structure

```
WinterVSP/
├── CloudExhibition/          # Main uni-app application
│   ├── src/
│   │   ├── pages/           # Application pages (organized by feature)
│   │   │   └── index/       # Home/index page
│   │   ├── static/          # Static assets (images, etc.)
│   │   ├── App.vue          # Application root component
│   │   ├── main.js          # Application entry point (creates SSR app)
│   │   ├── pages.json       # Page routing and navigation configuration
│   │   ├── manifest.json    # App configuration (appid, permissions, platform settings)
│   │   └── uni.scss         # Global SCSS style variables
│   ├── vite.config.js       # Vite build configuration
│   └── package.json         # Dependencies and build scripts
├── assets/                  # Generated design assets (PNG images from Gemini)
├── images/                  # UI design mockups/screenshots
└── attachment/              # Project documentation (university winter practice materials)
```

## Development Commands

### Development (with platform-specific builds)

- **H5 Web**: `cd CloudExhibition && npm run dev:h5`
- **H5 SSR**: `cd CloudExhibition && npm run dev:h5:ssr`
- **WeChat Mini-Program**: `cd CloudExhibition && npm run dev:mp-weixin`
- **Alipay Mini-Program**: `cd CloudExhibition && npm run dev:mp-alipay`
- **Baidu Mini-Program**: `cd CloudExhibition && npm run dev:mp-baidu`
- **Other platforms**: See `package.json` scripts for additional platform options (mp-qq, mp-toutiao, mp-kuaishou, mp-lark, mp-jd, mp-xhs, mp-harmony, quickapp-webview variants)

### Production Build

- **H5 Web**: `cd CloudExhibition && npm run build:h5`
- **H5 SSR**: `cd CloudExhibition && npm run build:h5:ssr`
- **WeChat Mini-Program**: `cd CloudExhibition && npm run build:mp-weixin`
- **Other platforms**: Use `npm run build:mp-{platform}` (same platforms as dev commands)

### Installation

```bash
cd CloudExhibition && npm install
```

## Architecture Notes

### uni-app Framework
- **Vue 3 with SSR**: Uses `createSSRApp` for server-side rendering compatibility across all platforms
- **Multi-platform compilation**: Single codebase compiles to different platform-specific outputs
- **Vite build system**: Uses Vite 5.2.8 with `@dcloudio/vite-plugin-uni` plugin

### Page Configuration
- **pages.json**: Central routing configuration where pages array defines all app pages. The first item is the app launch page.
- **manifest.json**: Platform-specific configurations including permissions (Android), mini-program appids, and feature flags.

### Styling System
- **uni.scss**: Global SCSS variables for colors, spacing, typography, and component styles. These variables are automatically available in all components without importing.
- **rpx units**: Responsive pixel units (750rpx = screen width) used for cross-device compatibility.

### Application Entry
- **main.js**: Exports `createApp()` function that creates and returns a Vue SSR app instance. This pattern supports uni-app's multi-platform compilation.
- **App.vue**: Root component with lifecycle hooks (`onLaunch`, `onShow`, `onHide`) that handle app-level events.

### File Organization
- Each page should be in its own directory under `src/pages/` with an `index.vue` file
- Static assets go in `src/static/` and are referenced with absolute paths (e.g., `/static/logo.png`)
- Page routes are defined in `src/pages.json`, not by file convention

## Platform-Specific Notes

- **WeChat Mini-Program**: Requires appid in manifest.json, urlCheck disabled in development
- **H5**: Can run with or without SSR, builds to standard web assets
- **Android Permissions**: Defined in manifest.json under `app-plus.distribute.android.permissions`
- All platforms share the same component code but compile differently based on platform capabilities

## Technology Stack

- **Framework**: uni-app 3.0 (DCloud)
- **UI Framework**: Vue 3.4.21
- **Build Tool**: Vite 5.2.8
- **Internationalization**: vue-i18n 9.1.9
- **Language**: JavaScript (with TypeScript definitions available via @dcloudio/types)
