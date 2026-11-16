#!/usr/bin/env bash

# ==============================================================================
# Script de Publicación para Preview (Vercel) - SIDEMACA
# Ubicación: scripts/env/preview/publish.sh
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Identidad oficial requerida por Vercel
GIT_NAME="retia-online"
GIT_EMAIL="info@retia.online"

export GIT_AUTHOR_NAME="$GIT_NAME"
export GIT_AUTHOR_EMAIL="$GIT_EMAIL"
export GIT_COMMITTER_NAME="$GIT_NAME"
export GIT_COMMITTER_EMAIL="$GIT_EMAIL"

DRY_RUN=0
COMMIT_MSG=""

usage() {
    cat <<'EOF'
Uso:
  ./scripts/env/preview/publish.sh [-m "mensaje"] [--dry-run]

Publica los cambios realizados en la rama actual hacia preview en origin forzando
la autoría de retia-online <info@retia.online> para que Vercel despliegue Preview.

Opciones:
  -m, --message   Mensaje de commit opcional para cambios locales pendientes.
  --dry-run       Valida y muestra la operación sin hacer push.
  -h, --help      Muestra esta ayuda.
EOF
}

die() {
    printf 'Error: %s\n' "$*" >&2
    exit 1
}

while [ "$#" -gt 0 ]; do
    case "$1" in
        -m|--message)
            COMMIT_MSG="$2"
            shift 2
            ;;
        --dry-run)
            DRY_RUN=1
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            die "Argumento desconocido: $1. Usa --help para ver las opciones."
            ;;
    esac
done

command -v git >/dev/null 2>&1 || die "Git no está instalado."
cd "$PROJECT_ROOT"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "No se encontró un repositorio Git."

ORIGIN_BRANCH="$(git branch --show-current 2>/dev/null || echo "")"
PREV_GIT_NAME="$(git config --local user.name 2>/dev/null || git config --global user.name 2>/dev/null || echo "")"
PREV_GIT_EMAIL="$(git config --local user.email 2>/dev/null || git config --global user.email 2>/dev/null || echo "")"

if [ -n "$(git status --porcelain)" ]; then
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="feat(${ORIGIN_BRANCH:-work}): update uncommitted changes before preview publish"
    fi
    printf 'Confirmando cambios locales pendientes en %s...\n' "${ORIGIN_BRANCH:-HEAD}"
    git add .
    git commit -m "$COMMIT_MSG" || true
fi

git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

if git show-ref --verify --quiet refs/heads/preview; then
    git checkout preview
else
    git checkout -b preview
fi

if git ls-remote --exit-code --heads origin preview >/dev/null 2>&1; then
    printf 'Sincronizando preview con origin/preview...\n'
    git pull --rebase origin preview || {
        git rebase --abort 2>/dev/null || true
        git pull origin preview
    }
fi

if [ "$ORIGIN_BRANCH" != "preview" ] && [ -n "$ORIGIN_BRANCH" ]; then
    printf 'Integrando cambios de %s en preview...\n' "$ORIGIN_BRANCH"
    git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" \
        merge "$ORIGIN_BRANCH" --no-ff -m "merge: integrate $ORIGIN_BRANCH into preview for vercel deploy"
fi

EXPECTED_AUTHOR="$GIT_NAME <$GIT_EMAIL>"
LATEST_AUTHOR="$(git show -s --format='%an <%ae>' HEAD)"
LATEST_COMMITTER="$(git show -s --format='%cn <%ce>' HEAD)"

if [ "$LATEST_AUTHOR" != "$EXPECTED_AUTHOR" ] || [ "$LATEST_COMMITTER" != "$EXPECTED_AUTHOR" ]; then
    printf 'Asegurando autoría oficial de Vercel (%s)...\n' "$EXPECTED_AUTHOR"
    GIT_AUTHOR_NAME="$GIT_NAME" \
    GIT_AUTHOR_EMAIL="$GIT_EMAIL" \
    GIT_COMMITTER_NAME="$GIT_NAME" \
    GIT_COMMITTER_EMAIL="$GIT_EMAIL" \
        git commit --amend --no-edit --reset-author
fi

if [ "$DRY_RUN" -eq 1 ]; then
    printf 'DRY-RUN: Simulando git push a origin/preview...\n'
    git push --dry-run origin preview || true
    if [ "$ORIGIN_BRANCH" != "preview" ] && [ -n "$ORIGIN_BRANCH" ]; then
        git checkout "$ORIGIN_BRANCH"
        if [ -n "$PREV_GIT_NAME" ]; then git config user.name "$PREV_GIT_NAME"; fi
        if [ -n "$PREV_GIT_EMAIL" ]; then git config user.email "$PREV_GIT_EMAIL"; fi
    fi
    exit 0
fi

printf 'Enviando cambios a origin/preview como %s...\n' "$GIT_NAME"
git push -u origin preview

if [ -x "$PROJECT_ROOT/scripts/env/sync-vercel-env.sh" ]; then
    "$PROJECT_ROOT/scripts/env/sync-vercel-env.sh" preview || true
fi

if [ "$ORIGIN_BRANCH" != "preview" ] && [ -n "$ORIGIN_BRANCH" ]; then
    git checkout "$ORIGIN_BRANCH"
    if [ -n "$PREV_GIT_NAME" ]; then git config user.name "$PREV_GIT_NAME"; fi
    if [ -n "$PREV_GIT_EMAIL" ]; then git config user.email "$PREV_GIT_EMAIL"; fi
fi

printf '🚀 Publicación exitosa de preview en GitHub (autor: %s).\n' "$EXPECTED_AUTHOR"
