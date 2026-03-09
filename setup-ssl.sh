#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# HomeSchool Adventures - Configuration SSL (Let's Encrypt)
# ═══════════════════════════════════════════════════════════════════
# A lancer APRES que l'app fonctionne en HTTP sur le port 80
#
# Pre-requis :
#   - Un nom de domaine pointe vers l'IP de ce serveur (DNS A record)
#   - Le port 80 doit etre libre (arretez docker compose d'abord)
#
# Usage : ./setup-ssl.sh mondomaine.fr mon@email.fr
# ═══════════════════════════════════════════════════════════════════

set -e

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Usage: ./setup-ssl.sh <domaine> <email>"
    echo "Exemple: ./setup-ssl.sh homeschool.mondomaine.fr admin@mondomaine.fr"
    exit 1
fi

echo ""
echo "🔒 Configuration SSL pour ${DOMAIN}"
echo "====================================="
echo ""

# 1. Arreter les containers si en cours
echo "⏹️  Arret des containers..."
docker compose down 2>/dev/null || true
docker compose -f docker-compose.ssl.yml down 2>/dev/null || true

# 2. Remplacer le domaine dans nginx.conf
echo "📝 Configuration nginx pour ${DOMAIN}..."
sed -i "s/VOTRE_DOMAINE.fr/${DOMAIN}/g" nginx.conf

# 3. Obtenir le certificat SSL
echo "🔐 Obtention du certificat Let's Encrypt..."
docker run --rm -p 80:80 \
    -v letsencrypt:/etc/letsencrypt \
    -v certbot-var:/var/lib/letsencrypt \
    certbot/certbot certonly \
    --standalone \
    --agree-tos \
    --no-eff-email \
    --email "${EMAIL}" \
    -d "${DOMAIN}"

# 4. Lancer avec SSL
echo ""
echo "🚀 Demarrage avec HTTPS..."
docker compose -f docker-compose.ssl.yml up -d --build

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ HTTPS active !"
echo ""
echo "   🌐 https://${DOMAIN}"
echo "   🔑 Code parent : 1234"
echo ""
echo "   Le certificat se renouvellera automatiquement."
echo "═══════════════════════════════════════════════════════════════"
