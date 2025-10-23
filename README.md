# 🍼 Birth Calculator

**Birth Calculator** es una aplicación web desarrollada con **Next.js + TypeScript**, diseñada para calcular y gestionar fechas de ovulación, inseminación y parto de manera interactiva.
Incluye un sistema de modales dinámicos, validaciones básicas, y una arquitectura escalable que sigue las buenas prácticas de React moderno.

---

## 🚀 Tecnologías principales

| Categoría            | Tecnologías                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Framework            | [Next.js 16](https://nextjs.org/)                                                          |
| Lenguaje             | [TypeScript 5](https://www.typescriptlang.org/)                                            |
| Estilos              | [Bootstrap 5.3](https://getbootstrap.com/) + [Reactstrap 9](https://reactstrap.github.io/) |
| Testing              | [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)               |
| UI / UX              | Componentes modales reutilizables y tabla dinámica                                         |
| Linter / Formato     | ESLint + Prettier                                                                          |
| Control de versiones | Git + GitHub                                                                               |

---

## 📂 Estructura del proyecto

```bash
birth-calculator/
├── app/
│   ├── globals.css          # Estilos globales del proyecto
│   ├── layout.tsx           # Layout raíz de Next.js
│   └── page.tsx             # Página principal que monta el componente BirthCalculator
│
├── components/
│   ├── BirthCalculator.tsx  # Componente principal con toda la lógica
│   ├── UserTable.tsx        # Tabla de registros
│   ├── UserModal.tsx        # Modal para crear/editar usuarios
│   ├── types.ts             # Tipos e interfaces de TypeScript
│   └── utils.ts             # Funciones auxiliares (addDays, formatDate, etc.)
│
├── __tests__/               # Carpeta de pruebas unitarias
│   └── BirthCalculator.test.tsx  # Tests principales del componente
│
├── jest.config.js           # Configuración de Jest + TypeScript
├── jest.setup.ts            # Setup global para Jest DOM
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts
└── README.md                # Este archivo 🙂
```

---

## ⚙️ Instalación y ejecución

### 🔧 Prerrequisitos

Asegúrate de tener instalado:

* [Node.js](https://nodejs.org/en/) **v18 o superior**
* [Yarn](https://yarnpkg.com/) o [npm](https://www.npmjs.com/)

---

### 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jeissonmoncada001/birth-calculator.git

# Entrar al proyecto
cd birth-calculator

# Instalar dependencias
yarn install
```

---

### ▶️ Ejecución en desarrollo

```bash
yarn dev
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

### 🏗️ Construcción para producción

```bash
yarn build
yarn start
```

Esto genera la carpeta `.next/` lista para desplegar en **Vercel** o cualquier servidor Node.

---

## 🧩 Funcionalidades principales

* **Gestión de registros**
  Agrega, edita o elimina usuarios con sus respectivas fechas.
* **Cálculo automático**
  Calcula los partos probables con base en los días de inseminación y ovulación.
* **UX dinámica**
  Modal automático cuando no existen registros.
* **Arquitectura modular**
  Componentes desacoplados (`UserTable`, `UserModal`, `BirthCalculator`) y tipado fuerte con TypeScript.
* **Estilos consistentes**
  Usando Bootstrap 5 + Reactstrap.
* **Pruebas automatizadas**
  Con Jest y Testing Library.

---

## 🧪 Testing con Jest + Testing Library

El proyecto incluye configuración completa de pruebas unitarias.

### ▶️ Ejecutar los tests

```bash
yarn test
```

Resultado esperado:

```
 PASS  __tests__/BirthCalculator.test.tsx
  BirthCalculator Component
    ✓ renderiza el título principal (XX ms)
    ✓ muestra el botón Insertar (XX ms)
    ✓ abre el modal de inserción al hacer clic en Insertar (XX ms)
```

### 📁 Configuración clave

**jest.config.js**

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
```

**jest.setup.ts**

```ts
import "@testing-library/jest-dom";
```

---

## 🧠 Scripts disponibles

| Script       | Descripción                              |
| ------------ | ---------------------------------------- |
| `yarn dev`   | Ejecuta el servidor en modo desarrollo   |
| `yarn build` | Compila la app para producción           |
| `yarn start` | Inicia el servidor con el build generado |
| `yarn lint`  | Analiza el código con ESLint             |
| `yarn test`  | Ejecuta los tests con Jest               |

---

## 🧰 Dependencias principales

```json
"dependencies": {
  "bootstrap": "^5.3.8",
  "next": "16.0.0",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "reactstrap": "^9.2.3"
},
"devDependencies": {
  "@testing-library/jest-dom": "^6.4.1",
  "@testing-library/react": "^15.0.0",
  "@testing-library/user-event": "^14.5.2",
  "@types/jest": "^29.5.12",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "ts-jest": "^29.2.3",
  "typescript": "^5.4.0"
}
```

---

## 🧮 Ejemplo de test incluido

**`__tests__/BirthCalculator.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BirthCalculator from "../../components/BirthCalculator";

describe("BirthCalculator Component", () => {
  test("renderiza el título principal", () => {
    render(<BirthCalculator />);
    expect(screen.getByText(/Birth Calculator/i)).toBeInTheDocument();
  });

  test("muestra el botón Insertar", () => {
    render(<BirthCalculator />);
    expect(
      screen.getByRole("button", { name: /Insertar/i })
    ).toBeInTheDocument();
  });

  test("abre el modal de inserción al hacer clic en Insertar", async () => {
    render(<BirthCalculator />);
    const insertButton = screen.getByRole("button", { name: /Insertar/i });
    await userEvent.click(insertButton);
    expect(screen.getByText(/Insertar Usuario/i)).toBeInTheDocument();
  });
});
```

---

## 🌍 Despliegue en Vercel

El proyecto es totalmente compatible con **Vercel**:

1. Conecta el repositorio desde GitHub.
2. Vercel detectará automáticamente que es un proyecto Next.js.
3. En cada `push` a `main`, se realizará un despliegue automático.

---

## 📸 Capturas

| Vista principal                                                              | Modal activo                                                      |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![Tabla principal](https://via.placeholder.com/400x250?text=Vista+Principal) | ![Modal](https://via.placeholder.com/400x250?text=Modal+Insertar) |

---

## 🧭 Convenciones de desarrollo

* Estilo de código formateado con **Prettier**.
* Variables y funciones en **camelCase**.
* Componentes con prefijo **PascalCase**.
* Una función por responsabilidad.
* Carpeta `__tests__` para cada componente que lo requiera.

---

## 📜 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.
Puedes usarlo, modificarlo y distribuirlo libremente.

---

## ✨ Autor

**👤 Jeisson Moncada**
Front-End Developer especializado en React / TypeScript / Next.js
📩 [GitHub](https://github.com/jeissonmoncada001)
💼 [LinkedIn](https://linkedin.com/in/jeissonmoncada001)

---
