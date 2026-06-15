# Siemens Project Configurator - Settings Console

An industrial-grade static configurations page built with **Angular** and the official **Siemens iX** design system components. It operates as a responsive web app to enter, validate, and export project setup data.

---

## 🏗️ System Architecture

This repository holds a lightweight, highly optimized Single Page Application (SPA):

```text
.
├── frontend/                 # Angular 22 Standalone Application
│   ├── src/app/
│   │   ├── core/             # Shared Types and Theme Management Service
│   │   ├── app.html          # Project settings form markup using Siemens iX components
│   │   ├── app.ts            # Component logic, forms validation, clipboard utility
│   │   └── app.scss          # Custom styling and fade-in transitions
│   ├── Dockerfile            # Multi-stage production build (build Angular -> host in Nginx)
│   ├── nginx.conf            # Nginx config with gzip compression and routing fallback
│   └── package.json
│
├── k8s/                      # Kubernetes Orchestration manifests
│   ├── namespace.yaml        # Isolates 'siemens-project-settings' namespaces
│   ├── deployment.yaml       # Defines replicas, resource limits, and health probes
│   ├── service.yaml          # Exposes the pods within the cluster
│   └── ingress.yaml          # Standard Ingress router for external host routing
│
└── docker-compose.yml        # Multi-stage container local orchestration
```

---

## 🚀 Running the Project

### Option A: Local Development (Angular CLI)

Ensure Node.js v20+ is installed on your local environment.

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the local server**:
   ```bash
   npm run start
   ```
   *The Angular application will serve on `http://localhost:4200/`.*

3. **Run Unit Tests**:
   ```bash
   npm run test
   ```
   *Executes Vitest specs to verify form defaults, structural rendering, and service bootstrapping.*

---

### Option B: Local Containerized Run (Docker Compose)

You can build and spin up the production Nginx bundle inside a container with a single command:

```bash
docker-compose up --build
```

- **Exposed Port**: Open `http://localhost:8080` in your web browser.
- **Log Outputs**: Review container logs using `docker logs -f siemens-settings-web`.

---

### Option C: Kubernetes Deployment

We provide standard orchestration manifests to deploy the application inside a dedicated namespace:

1. **Apply Namespace**:
   ```bash
   kubectl apply -f k8s/namespace.yaml
   ```

2. **Apply Deployments and Services**:
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

3. **Configure Ingress routing**:
   ```bash
   kubectl apply -f k8s/ingress.yaml
   ```
   *Exposes the application externally at `http://settings.siemens.local/`.*

---

## 📐 Design Patterns & Best Practices

- **Siemens iX Integration**: Fully integrates the Siemens Design System using standalone component imports (e.g., from `@siemens/ix-angular/standalone`) inside Angular standalone component architecture.
- **Form Validation & Interactive Feedback**: Utilizes template-driven form validation with visual cues (`is-invalid` borders and red text warnings) to ensure user data integrity.
- **Dark/Light Mode Sync**: Integrates a custom theme toggle in the header that seamlessly syncs with the DOM attributes to swap Siemens colors schemes.
- **On-Screen output panel**: Beyond printing the submitted JSON payload to the console, an on-screen visual console renders with custom animation transitions and a clipboard copy tool for easy developer interaction.
