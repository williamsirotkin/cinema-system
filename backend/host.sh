source ../.env
gcloud run deploy --image gcr.io/$GCLOUD_ID/cinemasystem --platform managed --region us-east4 --allow-unauthenticated --set-env-vars DB_PASSWORD=$DB_PASSWORD,AUTHENTICATION_PRIVATE_KEY=$AUTHENTICATION_PRIVATE_KEY,AUTHENTICATION_TIMEOUT_IN_MINUTES=30