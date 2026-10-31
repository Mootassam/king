#!/usr/bin/env bash
# One command to set up (or update) any website domain on this VPS.
#
#   sudo bash nginx-site.sh DOMAIN [BACKEND_IP:PORT] [WEBSITE_FOLDER]
#
# Examples:
#   sudo bash nginx-site.sh indiaallvorafx.site
#   sudo bash nginx-site.sh pc.indiaallvorafx.site
#   sudo bash nginx-site.sh newsite.com 201.18.203.164:8082
#
# Defaults: backend 201.18.203.164:8082, folder /var/www/<domain without .site/.com>/html
#   indiaallvorafx.site    -> /var/www/indiaallvorafx/html
#   pc.indiaallvorafx.site -> /var/www/pc.indiaallvorafx/html
#
# What it does:
#   1. backs up the old nginx file to /root/nginx-backups/
#   2. writes the nginx file (website, APK, assets, TradingView, /api/, /socket.io/)
#   3. makes sure ws.<main domain> exists for live prices (Namecheap's HTTPS proxy blocks
#      WebSockets, ws.<main domain> reaches this VPS directly) and gets its HTTPS certificate
#   4. tests nginx; if the test fails, it puts the old file back. Then reloads.
set -euo pipefail

DOMAIN="${1:?Usage: sudo bash nginx-site.sh DOMAIN [BACKEND_IP:PORT] [WEBSITE_FOLDER]}"
BACKEND="${2:-201.18.203.164:8082}"
ROOT="${3:-/var/www/${DOMAIN%.*}/html}"
BASE="$(echo "$DOMAIN" | awk -F. '{print $(NF-1)"."$NF}')"   # pc.example.site -> example.site
WS="ws.$BASE"
EMAIL="${EMAIL:-}"                                             # optional: EMAIL=you@mail.com sudo -E bash ...

AVAIL=/etc/nginx/sites-available
ENABLED=/etc/nginx/sites-enabled
BACKUPS=/root/nginx-backups
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUPS" "$ROOT"

echo ">>> Domain:  $DOMAIN (+ www.$DOMAIN)"
echo ">>> Folder:  $ROOT"
echo ">>> Backend: $BACKEND"
echo ">>> Live prices via: $WS"

backup() { [ -f "$AVAIL/$1" ] && cp "$AVAIL/$1" "$BACKUPS/$1.$STAMP" && echo ">>> Backup: $BACKUPS/$1.$STAMP" || true; }

# --- the website ---
backup "$DOMAIN"
cat > "$AVAIL/$DOMAIN" <<'EOF'
# Made by nginx-site.sh: change it by running the script again, not by hand.
server {
    listen 80;
    server_name __DOMAIN__ www.__DOMAIN__;

    root __ROOT__;
    index index.html;

    client_max_body_size 100M;

    # APK download
    location ~* \.apk$ {
        add_header Content-Type application/vnd.android.package-archive;
        add_header Content-Disposition "attachment; filename=alvorafx.apk";
        add_header Access-Control-Allow-Origin "*";
        add_header Access-Control-Allow-Methods "GET, HEAD";
        add_header Cache-Control "public, max-age=3600";
        add_header X-Content-Type-Options "nosniff";
        try_files $uri =404;
    }

    # Vite hashed assets (^~ so it beats the regex blocks)
    location ^~ /assets/ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # TradingView static files
    location ^~ /tv-static/ {
        proxy_pass https://s3.tradingview.com/;
        proxy_ssl_server_name on;
        proxy_set_header Host s3.tradingview.com;
        add_header Access-Control-Allow-Origin "*";
        proxy_hide_header x-amz-id-2;
        proxy_hide_header x-amz-request-id;
    }

    # TradingView screener API
    location ^~ /api/tv/ {
        proxy_pass https://screener-facade.tradingview.com/;
        proxy_ssl_server_name on;
        proxy_set_header Host screener-facade.tradingview.com;
        proxy_set_header Origin "https://www.tradingview.com";
        proxy_set_header Referer "https://www.tradingview.com/";
        proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
        proxy_set_header Accept "application/json, text/plain, */*";
    }

    # TradingView scanner (live quotes fallback)
    location ^~ /api/tvscan/ {
        proxy_pass https://scanner.tradingview.com/;
        proxy_ssl_server_name on;
        proxy_set_header Host scanner.tradingview.com;
        proxy_set_header Origin "https://www.tradingview.com";
        proxy_set_header Referer "https://www.tradingview.com/";
        proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
        proxy_set_header Accept "application/json, text/plain, */*";
        proxy_set_header Content-Type "application/json";
    }

    # TradingView WebSocket (used when the site is reached directly, without a proxy)
    location ^~ /ws/ {
        proxy_pass https://widgetdata.tradingview.com/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host widgetdata.tradingview.com;
        proxy_set_header Origin "https://www.tradingview.com";
        proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
        proxy_ssl_server_name on;
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
        proxy_connect_timeout 86400;
    }

    # Socket.IO (backend)
    location ^~ /socket.io/ {
        proxy_pass http://__BACKEND__;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $fwd_proto;
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
        proxy_connect_timeout 86400;
    }

    # Backend API
    location ^~ /api/ {
        proxy_pass http://__BACKEND__/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $fwd_proto;
    }

    # index.html never cached: visitors always get the newest build
    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    # Other static files
    location ~* \.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|json|txt|xml|css|js)$ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=86400";
        access_log off;
    }

    # React / Vite SPA
    location / {
        try_files $uri /index.html;
    }
}
EOF
sed -i "s|__DOMAIN__|$DOMAIN|g; s|__ROOT__|$ROOT|g; s|__BACKEND__|$BACKEND|g" "$AVAIL/$DOMAIN"
ln -sf "$AVAIL/$DOMAIN" "$ENABLED/$DOMAIN"

# --- ws.<main domain> for live prices (only if no file has it with the /wsr/ redirect route) ---
NEW_WS=0
if ! grep -Rls "server_name $WS;" "$ENABLED"/ | xargs -r grep -qs '/wsr/'; then
  NEW_WS=1
  backup "$WS"
  cat > "$AVAIL/$WS" <<'EOF'
# Made by nginx-site.sh. Live prices WebSocket only (skips the Namecheap HTTPS proxy).
server {
    listen 80;
    server_name __WS__;

    location ^~ /ws/ {
        proxy_pass https://widgetdata.tradingview.com/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host widgetdata.tradingview.com;
        proxy_set_header Origin "https://www.tradingview.com";
        proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
        proxy_ssl_server_name on;
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
        proxy_connect_timeout 86400;
    }

    # TradingView answers with {"redirect":"widgetdata-xxx.tradingview.com"} and closes.
    # The website then reconnects here. Only widgetdata-* hosts: this is not an open proxy.
    location ~ ^/wsr/(?<tvhost>widgetdata-[a-z0-9-]+)/socket\.io/websocket$ {
        resolver 1.1.1.1 8.8.8.8 valid=300s ipv6=off;
        proxy_pass https://$tvhost.tradingview.com/socket.io/websocket$is_args$args;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $tvhost.tradingview.com;
        proxy_set_header Origin "https://www.tradingview.com";
        proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
        proxy_ssl_server_name on;
        proxy_ssl_name $tvhost.tradingview.com;
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
        proxy_connect_timeout 15;
    }

    location / {
        return 404;
    }
}
EOF
  sed -i "s|__WS__|$WS|g" "$AVAIL/$WS"
  ln -sf "$AVAIL/$WS" "$ENABLED/$WS"
fi

# --- $fwd_proto: exactly one definition for all sites (checked after the files are written) ---
rm -f /etc/nginx/conf.d/fwd_proto.conf
if ! grep -rqs 'map $http_x_forwarded_proto $fwd_proto' /etc/nginx/; then
  cat > /etc/nginx/conf.d/fwd_proto.conf <<'EOF'
# Keep "https" when a proxy in front (Namecheap/APISIX) says the visitor used HTTPS.
map $http_x_forwarded_proto $fwd_proto {
    default $http_x_forwarded_proto;
    ""      $scheme;
}
EOF
fi

# --- test; on failure put the old files back ---
if ! nginx -t; then
  echo "!!! nginx test FAILED: restoring the old files"
  for f in "$DOMAIN" "$WS"; do
    last="$(ls -t "$BACKUPS/$f."* 2>/dev/null | head -1 || true)"
    if [ -n "$last" ]; then cp "$last" "$AVAIL/$f"; elif [ "$f" = "$WS" ] && [ "$NEW_WS" = 1 ]; then rm -f "$ENABLED/$WS"; fi
  done
  [ -z "$(ls -t "$BACKUPS/$DOMAIN."* 2>/dev/null | head -1)" ] && rm -f "$ENABLED/$DOMAIN"
  nginx -t && systemctl reload nginx
  exit 1
fi
systemctl reload nginx
echo ">>> nginx OK and reloaded"

# --- HTTPS certificate for ws.<main domain> (renews itself) ---
if [ "$NEW_WS" = 1 ]; then
  command -v certbot >/dev/null || apt-get install -y certbot python3-certbot-nginx
  if [ -n "$EMAIL" ]; then M=(-m "$EMAIL"); else M=(--register-unsafely-without-email); fi
  certbot --nginx -d "$WS" --non-interactive --agree-tos --keep-until-expiring --redirect "${M[@]}" \
    || echo "!!! certbot failed: check that $WS points to this VPS (DNS * record) and port 443 is open"
  systemctl reload nginx
fi

# --- re-running the script rewrites the file: put back an HTTPS certificate the domain already has ---
if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  D=(-d "$DOMAIN"); [ -d "/etc/letsencrypt/live/$DOMAIN" ] && grep -qs "www.$DOMAIN" "/etc/letsencrypt/renewal/$DOMAIN.conf" && D+=(-d "www.$DOMAIN")
  certbot --nginx "${D[@]}" --cert-name "$DOMAIN" --non-interactive --agree-tos --keep-until-expiring --redirect \
    || echo "!!! could not reinstall the HTTPS certificate for $DOMAIN"
  systemctl reload nginx
fi

echo
echo ">>> DONE. Now copy the website files (dist) into: $ROOT"
echo ">>> If $DOMAIN points straight to this VPS (no Namecheap HTTPS) and has no certificate yet, run once:"
echo ">>>   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ">>> Check live prices: curl -s -o /dev/null -w '%{http_code}\n' --http1.1 -H 'Connection: Upgrade' -H 'Upgrade: websocket' -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==' https://$WS/ws/socket.io/websocket   (101 = OK)"
