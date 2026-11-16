#!/usr/bin/env bash

# ==============================================================================
# Script de Despliegue Automatizado para Producción (Vercel) - SIDEMACA
# Ubicación: scripts/env/production/deploy.sh
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

# Identidad oficial requerida por Vercel
GIT_NAME="retia-online"
GIT_EMAIL="info@retia.online"

export GIT_AUTHOR_NAME="$GIT_NAME"
export GIT_AUTHOR_EMAIL="$GIT_EMAIL"
export GIT_COMMITTER_NAME="$GIT_NAME"
export GIT_COMMITTER_EMAIL="$GIT_EMAIL"

SOURCE_BRANCH="preview"
TARGET_BRANCH="main"
DRY_RUN=0
EXPLICIT_TAG=""
COMMIT_MSG=""

usage() {
    cat <<EOF
Uso: $0 [OPCIONES]

Integra los cambios de preview en main, publica la versión en producción con tag
y regresa automáticamente a la rama preview para continuar el ciclo de desarrollo.

Opciones:
  --tag <vX.Y.Z>          Especifica manualmente el tag de versión (ej: v1.0.1).
  --from <rama>           Rama origen a integrar en main (por defecto: preview).
  -m, --message           Mensaje para confirmar cambios locales pendientes.
  --dry-run               Ejecuta validaciones sin hacer push ni crear tags remotos.
  -h, --help              Muestra este mensaje de ayuda.
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --tag) EXPLICIT_TAG="$2"; shift 2 ;;
        --from) SOURCE_BRANCH="$2"; shift 2 ;;
        -m|--message) COMMIT_MSG="$2"; shift 2 ;;
        --dry-run) DRY_RUN=1; shift ;;
        -h|--help) usage; exit 0 ;;
        *) echo "Argumento desconocido: $1"; usage; exit 1 ;;
    esac
done

command -v git >/dev/null 2>&1 || { echo "Git no está instalado"; exit 1; }
cd "$PROJECT_ROOT"

git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

echo -e "${GREEN}🚀 Iniciando Despliegue a Producción (SIDEMACA - Vercel)${NC}"
echo "======================================================================"
echo -e "👤 Identidad oficial: ${CYAN}$GIT_NAME <$GIT_EMAIL>${NC}"

if [ -n "$(git status --porcelain)" ]; then
    CURRENT_WORKING_BRANCH=$(git branch --show-current)
    echo -e "📦 Hay cambios locales sin confirmar en $CURRENT_WORKING_BRANCH. Confirmando..."
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="feat: update changes before production release"
    fi
    git add .
    git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" commit -m "$COMMIT_MSG"
fi

if [ -n "$EXPLICIT_TAG" ]; then
    RELEASE_TAG="$EXPLICIT_TAG"
else
    LATEST_TAG=$(git tag -l "v*" 2>/dev/null | sort -V | tail -n 1 || echo "")
    if [[ "$LATEST_TAG" =~ ^v([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
        MAJOR="${BASH_REMATCH[1]}"
        MINOR="${BASH_REMATCH[2]}"
        PATCH="${BASH_REMATCH[3]}"
        RELEASE_TAG="v${MAJOR}.${MINOR}.$((PATCH + 1))"
    else
        RELEASE_TAG="v1.0.0"
    fi
fi

echo -e "🏷️  Versión a publicar: ${CYAN}${BOLD}$RELEASE_TAG${NC}"

if [ "$DRY_RUN" -eq 0 ]; then
    git push origin "$SOURCE_BRANCH" || true
fi

echo -e "🔀 Cambiando a rama $TARGET_BRANCH..."
git checkout "$TARGET_BRANCH"

if [ "$DRY_RUN" -eq 0 ]; then
    git pull origin "$TARGET_BRANCH" || true
fi

echo -e "Integrando cambios de $SOURCE_BRANCH en $TARGET_BRANCH..."
git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" \
    merge "$SOURCE_BRANCH" --no-ff -m "chore(release): merge $SOURCE_BRANCH into $TARGET_BRANCH for $RELEASE_TAG"

EXPECTED_AUTHOR="$GIT_NAME <$GIT_EMAIL>"
LATEST_AUTHOR="$(git show -s --format='%an <%ae>' HEAD)"
LATEST_COMMITTER="$(git show -s --format='%cn <%ce>' HEAD)"

if [ "$LATEST_AUTHOR" != "$EXPECTED_AUTHOR" ] || [ "$LATEST_COMMITTER" != "$EXPECTED_AUTHOR" ]; then
    GIT_AUTHOR_NAME="$GIT_NAME" \
    GIT_AUTHOR_EMAIL="$GIT_EMAIL" \
    GIT_COMMITTER_NAME="$GIT_NAME" \
    GIT_COMMITTER_EMAIL="$GIT_EMAIL" \
        git commit --amend --no-edit --reset-author
fi

if [ "$DRY_RUN" -eq 1 ]; then
    echo -e "${YELLOW}⚠️  MODO DRY-RUN ACTIVO: Regresando a $SOURCE_BRANCH sin push.${NC}"
    git reset --hard "origin/$TARGET_BRANCH" >/dev/null 2>&1 || true
    git checkout "$SOURCE_BRANCH"
    exit 0
fi

if git tag -l | grep -q "^${RELEASE_TAG}$"; then
    git tag -d "$RELEASE_TAG" >/dev/null 2>&1 || true
    git push origin ":refs/tags/$RELEASE_TAG" >/dev/null 2>&1 || true
fi

git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" \
    tag -a "$RELEASE_TAG" -m "Production Release $RELEASE_TAG — autor: $GIT_NAME <$GIT_EMAIL>"

echo -e "\n${BLUE}📤 Enviando $TARGET_BRANCH y tag $RELEASE_TAG a GitHub como $GIT_NAME...${NC}"
git push origin "$TARGET_BRANCH" "$RELEASE_TAG"

if [ -x "$PROJECT_ROOT/scripts/env/sync-vercel-env.sh" ]; then
    "$PROJECT_ROOT/scripts/env/sync-vercel-env.sh" production || true
fi

echo -e "\n${BLUE}🔄 Regresando automáticamente a la rama $SOURCE_BRANCH...${NC}"
git checkout "$SOURCE_BRANCH"
git merge "$TARGET_BRANCH" --ff-only || true

PROD_URL="https://sidemaca.com"
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$PROD_URL" --max-time 15 || echo "000")
echo -e "\n${GREEN}======================================================================${NC}"
echo -e "🏷️  Versión liberada:    ${CYAN}${BOLD}$RELEASE_TAG${NC}"
echo -e "👤 Publicado por:       ${CYAN}$GIT_NAME <$GIT_EMAIL>${NC}"
echo -e "🌐 URL Producción:      ${CYAN}$PROD_URL (HTTP $HTTP_STATUS)${NC}"
echo -e "🌿 Rama activa actual:  ${GREEN}${BOLD}$(git branch --show-current)${NC}"
echo -e "${GREEN}======================================================================${NC}"
