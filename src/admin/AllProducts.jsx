import React from 'react';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function AllProducts() {
  const { data: productsData, loading } = useGetData('products');

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product: ', error);
      toast.error('Failed to delete product. Please try again later.');
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <div className="overflow-x-auto py-8">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <table className="table-auto w-full border-collapse mt-5">
          <thead>
            <tr className='border-b-2'>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading....</td>
              </tr>
            ) : (
              productsData.map((item) => (
                <tr key={item.id} className='text-center text-xl border-b-2'>
                  <td className="px-4 py-2 flex justify-center">
                    <img src={item.imgUrl} alt="" className="max-w-[200px]" />
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProducts;
