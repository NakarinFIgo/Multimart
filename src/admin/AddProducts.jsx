import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDesc, setEnterDesc] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const addProducts = async (data) => {
    setLoading(true);

    try {
      const storageRef = ref(storage, `productsImage/${Date.now()}_${enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          toast.error('Image not uploaded!');
          setLoading(true);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'products'), {
            title: data.productTitle,
            shortDesc: data.shortDesc,
            description: data.description,
            category: data.category,
            price: data.price,
            imgUrl: downloadUrl,
          });

          toast.success('Product successfully added!');
          navigate('/dashboard/all-products')
          reset();
          setEnterTitle('');
          setEnterShortDesc('');
          setEnterDesc('');
          setEnterCategory('');
          setEnterPrice('');
          setEnterProductImg(null);
          setLoading(false);
        }
      );
    } catch (error) {
      toast.error('Failed to add product!');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setEnterProductImg(e.target.files[0]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Products</h1>
      <form onSubmit={handleSubmit(addProducts)} className="space-y-4">
        <div>
          <label className="block mb-1">Product title</label>
          <input 
            type="text" 
            placeholder="Double sofa" 
            {...register('productTitle', { required: 'Product title is required' })}
            className="w-full p-2 border rounded"
            value={enterTitle}
            onChange={(e) => setEnterTitle(e.target.value)}
          />
          {errors.productTitle && <p className="text-red-500">{errors.productTitle.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Short Description</label>
          <input 
            type="text" 
            placeholder="lorem..." 
            {...register('shortDesc', { required: 'Short Description is required' })}
            className="w-full p-2 border rounded"
            value={enterShortDesc}
            onChange={(e) => setEnterShortDesc(e.target.value)}
          />
          {errors.shortDesc && <p className="text-red-500">{errors.shortDesc.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input 
            type="text" 
            placeholder="100" 
            {...register('price', { required: 'Price is required' })}
            className="w-full p-2 border rounded"
            value={enterPrice}
            onChange={(e) => setEnterPrice(e.target.value)}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <input 
            type="text" 
            placeholder="Double sofa" 
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 border rounded"
            value={enterDesc}
            onChange={(e) => setEnterDesc(e.target.value)}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select 
            {...register('category', { required: 'Category is required' })}
            className="w-full p-2 border rounded"
            value={enterCategory}
            onChange={(e) => setEnterCategory(e.target.value)}
          >
            <option value="chair">Chair</option>
            <option value="sofa">Sofa</option>
            <option value="mobile">Mobile</option>
            <option value="watch">Watch</option>
            <option value="wireless">Wireless</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Photo Image</label>
          <input 
            type="file" 
            {...register('photo', { required: 'Photo is required' })}
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
          />
          {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
        </div>
        <div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
