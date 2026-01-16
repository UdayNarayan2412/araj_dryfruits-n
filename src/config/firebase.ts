import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-SBKYsGgXmRBithZOUJetlHkF1dXsBmw",
  authDomain: "araj-dryfruits.firebaseapp.com",
  projectId: "araj-dryfruits",
  storageBucket: "araj-dryfruits.firebasestorage.app",
  messagingSenderId: "486868360527",
  appId: "1:486868360527:web:a172ebf593db19a2c5793a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);

// Get Firestore instance
export const db = getFirestore(app);

export default app; 