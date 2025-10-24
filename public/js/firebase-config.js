// Firebase Configuration
// Este archivo inicializa Firebase en el cliente

// Import Firebase SDK (via CDN in HTML or via npm)
// Make sure to include Firebase scripts in your HTML:
// <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js"></script>

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // TODO: Obtener de Firebase Console
  authDomain: "fuenzalida-consulting.firebaseapp.com",
  projectId: "fuenzalida-consulting",
  storageBucket: "fuenzalida-consulting.appspot.com",
  messagingSenderId: "966319636555",
  appId: "YOUR_APP_ID", // TODO: Obtener de Firebase Console
  measurementId: "YOUR_MEASUREMENT_ID" // Optional: Para Analytics
};

// Initialize Firebase
let app, auth, db;

if (typeof firebase !== 'undefined') {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();

  console.log('Firebase initialized successfully');
} else {
  console.warn('Firebase SDK not loaded. Please include Firebase scripts in your HTML.');
}

// Authentication Helper Functions
const authHelpers = {
  // Sign up with email and password
  signUp: async (email, password, displayName) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName });
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await auth.signOut();
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback) => {
    return auth.onAuthStateChanged(callback);
  }
};

// Firestore Helper Functions
const firestoreHelpers = {
  // Add a document
  addDocument: async (collection, data) => {
    try {
      const docRef = await db.collection(collection).add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add document error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get a document
  getDocument: async (collection, docId) => {
    try {
      const doc = await db.collection(collection).doc(docId).get();
      if (doc.exists) {
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      console.error('Get document error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all documents from a collection
  getCollection: async (collection, orderBy = 'createdAt', limit = 100) => {
    try {
      const snapshot = await db.collection(collection)
        .orderBy(orderBy, 'desc')
        .limit(limit)
        .get();

      const documents = [];
      snapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, data: documents };
    } catch (error) {
      console.error('Get collection error:', error);
      return { success: false, error: error.message };
    }
  },

  // Update a document
  updateDocument: async (collection, docId, data) => {
    try {
      await db.collection(collection).doc(docId).update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Update document error:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete a document
  deleteDocument: async (collection, docId) => {
    try {
      await db.collection(collection).doc(docId).delete();
      return { success: true };
    } catch (error) {
      console.error('Delete document error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.firebaseApp = app;
  window.firebaseAuth = auth;
  window.firebaseDb = db;
  window.authHelpers = authHelpers;
  window.firestoreHelpers = firestoreHelpers;
}
