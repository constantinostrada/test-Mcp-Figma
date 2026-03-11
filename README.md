# Figma-MCP-Test

A production-ready web application built with modern tooling and best practices.

## Tech Stack

- **HTML/CSS/JavaScript** - Core web technologies
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Getting Started

### Installation

Install the project dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Code Quality

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint:fix
```

### Formatting

Format code with Prettier:

```bash
npm run format
```

## Project Structure

```
.
├── public/          # Static assets
├── src/             # Source files
│   ├── js/          # JavaScript modules
│   ├── css/         # Stylesheets
│   ├── main.js      # Application entry point
│   └── style.css    # Main stylesheet
├── index.html       # HTML entry point
├── vite.config.js   # Vite configuration
├── eslint.config.js # ESLint configuration
├── .prettierrc      # Prettier configuration
└── package.json     # Project dependencies and scripts
```

## License

MIT
