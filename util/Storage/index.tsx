import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import serviceAccount from '../../firebase.json';

export const storage = getStorage(initializeApp({
  apiKey: serviceAccount.private_key,
  storageBucket: 'tamuhack-s22.appspot.com'
}));