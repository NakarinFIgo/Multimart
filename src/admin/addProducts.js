import { data } from '../assets/data/products';

data.forEach(async (item) => {
  const docRef = doc(collection(db, 'products'), item.id.toString());
  await setDoc(docRef, item);
  console.log(`Document ${item.id} added successfully`);
});


