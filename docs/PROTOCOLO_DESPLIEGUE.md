# Protocolo de Despliegue — Sidema (`retia-online/sidemaca`)

Este repositorio sigue el mismo protocolo de ramas y autoría oficial de **RETIA** para despliegues automáticos en **Vercel**.

## 1. Flujo de Ramas e Identidad
- **Ramas de trabajo (`feature/*`, `fix/*`):** Commits con la identidad del desarrollador (`hannsksa <hannssa@gmail.com>`).
- **Rama `preview`:** Entorno de pruebas en Vercel Preview. El commit `HEAD` enviado a `origin/preview` **debe** llevar autoría oficial `retia-online <info@retia.online>`.
- **Rama `main`:** Entorno de Producción (`sidemaca.com`). El commit `HEAD` y el tag `vX.Y.Z` enviados a `origin/main` **deben** llevar autoría oficial `retia-online <info@retia.online>`.

## 2. Scripts Oficiales

### Publicar en Preview
Desde tu rama de trabajo (o desde `preview`):
```bash
./scripts/env/preview/publish.sh
```
Opciones:
- `-m "mensaje"`: confirma cambios locales pendientes antes de integrar en `preview`.
- `--dry-run`: valida el flujo sin hacer `push`.

### Publicar en Producción
Una vez validado en `preview`:
```bash
./scripts/env/production/deploy.sh
```
Opciones:
- `--tag v1.0.1`: especifica manualmente el tag de release (si se omite, incrementa automáticamente el último tag `v*`).
- `--from <rama>`: integra desde otra rama en lugar de `preview`.
- `--dry-run`: valida sin crear tag ni hacer `push`.

## 3. Variables de Entorno en Vercel
Configurar en **Vercel → Project Settings → Environment Variables** (`Production` y `Preview`):
- `SMTP_HOST`
- `SMTP_PORT` (`587` o `465`)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `CONTACT_TO_EMAIL=ventas@sidemaca.com`
