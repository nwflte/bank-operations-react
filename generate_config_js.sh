#!/bin/sh -eu
if [ -z "${BACKEND:-}" ]; then
    BACKEND_JSON=undefined
else
    BACKEND_JSON=$(jq -n --arg backend $BACKEND '$backend')
fi
if [ -z "${KEYCLOAK:-}" ]; then
    KEYCLOAK_JSON=undefined
else
    KEYCLOAK_JSON=$(jq -n --arg keycloak $KEYCLOAK '$keycloak')
fi
 
cat <<EOF
window.REACT_APP_BACKEND_URL=$BACKEND_JSON;
window.REACT_APP_KEYCLOAK_URL=$KEYCLOAK_JSON;
EOF
