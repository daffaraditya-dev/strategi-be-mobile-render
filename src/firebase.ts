import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

const serviceAccountPath = path.join(
  __dirname,
  '../strategihub-firebase.json'
);

let firebaseInitialized = false;

if (!admin.apps.length) {
  if (fs.existsSync(serviceAccountPath)) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
    firebaseInitialized = true;
  } else {
    console.warn(
      '[FIREBASE] Service account not found. Firebase disabled.'
    );
  }
}

export const firebaseAdmin = admin;
export const isFirebaseReady = () => firebaseInitialized;
