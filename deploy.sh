#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# HomeSchool Adventures - Script de deploiement VPS
# ═══════════════════════════════════════════════════════════════════
#
# Pre-requis sur le VPS :
#   - Ubuntu 22.04+ ou Debian 12+
#   - Acces root ou sudo
#   - Un nom de domaine pointe vers l'IP du VPS
#
# Usage :
#   chmod +x deploy.sh
#   ./deploy.sh
#
# ═══════════════════════════════════════════════════════════════════

set -e

echo "🏫 HomeSchool Adventures - Deploiement"
echo "======================================="
echo ""

# ─── 1. Verifier Docker ──────────────────────────────────────────────
if ! command -v docker &> /dev/null; then
    echo "📦 Installation de Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker installe"
fi

if ! command -v docker compose &> /dev/null; then
    echo "📦 Installation de Docker Compose..."
    apt-get update && apt-get install -y docker-compose-plugin
    echo "✅ Docker Compose installe"
fi

echo "✅ Docker $(docker --version | cut -d' ' -f3)"

# ─── 2. Configurer les variables d'environnement ─────────────────────
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  Configuration initiale"
    echo ""

    read -p "Votre cle API Anthropic (sk-ant-...): " API_KEY
    read -p "Votre nom de domaine (ex: homeschool.mondomaine.fr): " DOMAIN

    cat > .env << EOF
ANTHROPIC_API_KEY=${API_KEY}
DOMAIN=${DOMAIN}
EOF

    echo "✅ Fichier .env cree"
else
    echo "✅ Fichier .env existant"
    source .env
fi

# ─── 3. Configurer nginx avec le bon domaine ─────────────────────────
if [ -n "$DOMAIN" ]; then
    sed -i "s/VOTRE_DOMAINE.fr/${DOMAIN}/g" nginx.conf
    echo "✅ Nginx configure pour ${DOMAIN}"
fi

# ─── 4. Obtenir le certificat SSL (Let's Encrypt) ────────────────────
if [ -n "$DOMAIN" ] && [ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
    echo ""
    echo "🔒 Obtention du certificat SSL..."
    echo "   (Le serveur nginx doit etre arrete pour cette etape)"

    # Lancer certbot standalone
    docker run --rm -p 80:80 \
        -v homeschool-certbot-etc:/etc/letsencrypt \
        -v homeschool-certbot-var:/var/lib/letsencrypt \
        certbot/certbot certonly \
        --standalone \
        --agree-tos \
        --no-eff-email \
        --email "admin@${DOMAIN}" \
        -d "${DOMAIN}"

    echo "✅ Certificat SSL obtenu"
fi

# ─── 5. Build & Start ────────────────────────────────────────────────
echo ""
echo "🚀 Construction et demarrage..."
docker compose up -d --build

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ HomeSchool Adventures est en ligne !"
echo ""
echo "   🌐 https://${DOMAIN:-localhost:3001}"
echo "   🔑 Code parent par defaut : 1234"
echo "   📚 Exercices partages entre toutes les familles"
echo ""
echo "   Commandes utiles :"
echo "   - Voir les logs    : docker compose logs -f"
echo "   - Redemarrer       : docker compose restart"
echo "   - Mettre a jour    : git pull && docker compose up -d --build"
echo "   - Sauvegarder data : docker cp homeschool-app:/app/data ./backup-data"
echo "═══════════════════════════════════════════════════════════════"
