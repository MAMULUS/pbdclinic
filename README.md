[README.md](https://github.com/user-attachments/files/29162311/README.md)
# pbdclinic

> Privacy by Design clinical management system / Sistema de gestión clínica con Privacidad desde el Diseño

---

## AMERICAN English

### What is this?

**pbdclinic** is a clinical/patient management system built as a practical implementation of a Privacy by Design (PbD) architecture model, originally developed as part of an undergraduate thesis on compliance with **Panama's Law 81 on Personal Data Protection**.

The goal: show that data protection principles (data minimization, explicit consent tracking, purpose limitation) can be embedded directly into a system's architecture, not bolted on afterward.

### Key features

- **Explicit consent tracking** — patient consent is a first-class field at the data layer, not an afterthought.
- **Minimal data model** — only the fields strictly necessary for clinical scheduling are stored.
- **Serverless edge architecture** — built on Cloudflare Workers for low latency and no server management.

### Tech stack

- **Runtime:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite at the edge)
- **Frontend:** Vanilla HTML/CSS/JS, served as static assets
- **Testing:** Vitest
- **Tooling:** Wrangler, ESLint/Prettier conventions

### Project structure

```
pbdclinic/
├── public/          # Static frontend (index.html)
├── src/              # Worker source code
│   └── index.js
├── test/             # Test suite
├── schema.sql        # D1 database schema
└── wrangler.jsonc    # Cloudflare Workers configuration
```

### Running locally

```bash
npm install
npx wrangler d1 execute pbdclinic-db --local --file=./schema.sql
npx wrangler dev
```

### Running tests

```bash
npm test
```

### Background

This project is the standalone, hands-on counterpart to the author's thesis: 
*"Privacy by Design Architecture Model for Clinical Management Systems Compliant with Law 81 OF PANAMA"*
(Universidad Tecnológica de Panamá, Centro Regional de Azuero), advised by Dr. Ramfis Miguelena.

---

## Español (México)

### ¿Qué es esto?

**pbdclinic** es un sistema de gestión clínica/de pacientes construido como implementación práctica de un modelo de arquitectura de
Privacidad desde el Diseño (Privacy by Design), desarrollado originalmente como parte de una tesis de licenciatura sobre cumplimiento con  
la **Ley 81 de Protección de Datos Personales de Panamá**.

El objetivo: demostrar que los principios de protección de datos (minimización de datos, registro explícito de consentimiento, limitación de propósito) pueden integrarse directamente en la arquitectura de un sistema, en lugar de agregarse después como parche.

### Características principales

- **Registro explícito de consentimiento** — el consentimiento del paciente es un campo de primer nivel en la capa de datos,
  no un agregado posterior.
- **Modelo de datos mínimo** — solo se almacenan los campos estrictamente necesarios para la programación clínica.
- **Arquitectura serverless en el edge** — construido sobre Cloudflare Workers para baja latencia y sin gestión de servidores.

### Stack tecnológico

- **Runtime:** Cloudflare Workers
- **Base de datos:** Cloudflare D1 (SQLite en el edge)
- **Frontend:** HTML/CSS/JS puro, servido como assets estáticos
- **Pruebas:** Vitest
- **Herramientas:** Wrangler, convenciones ESLint/Prettier

### Estructura del proyecto

```
pbdclinic/
├── public/          # Frontend estático (index.html)
├── src/              # Código fuente del Worker
│   └── index.js
├── test/             # Suite de pruebas
├── schema.sql        # Esquema de la base de datos D1
└── wrangler.jsonc    # Configuración de Cloudflare Workers
```

### Cómo correrlo localmente

```bash
npm install
npx wrangler d1 execute pbdclinic-db --local --file=./schema.sql
npx wrangler dev
```

### Cómo correr las pruebas

```bash
npm test
```

### Contexto

Este proyecto es la contraparte práctica e independiente de la tesis del autor:
*"Modelo de Arquitectura de Privacidad desde el Diseño para Sistemas de Gestión Clínica Conformes con la Ley 81"*
(Universidad Tecnológica de Panamá, Centro Regional de Azuero), asesorada por el Dr. Ramfis Miguelena.

---

## License / Licencia

MIT
