import React from 'react';
import useGetData from '../custom-hooks/useGetData';
import { deleteDoc,doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function Users() {
    const { data: usersData, loading } = useGetData('users');

    const deleteUser = async(id)=>{
        await deleteDoc(doc(db,'users',id))
        toast.success('User Delete!')
    }

    return (
        <div className="container mx-auto">
            <div className="py-8">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className='border-b-2'>
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="text-center">Loading...</td>
                                </tr>
                            ) : (
                                usersData?.map(user => (
                                    <tr key={user.id} className='border-b-2'>
                                        <td className="px-4 py-2">{user.displayName}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">
                                            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                                            onClick={()=>{deleteUser(user.id)}}>
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
        </div>
    );
}

export default Users;
