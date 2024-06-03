import { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { collection, onSnapshot } from 'firebase/firestore'

function useGetData(collectionName) {
    const [data, setData] = useState([])
    const collectionRef = collection(db, collectionName)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        })

        // Cleanup function to unsubscribe from the snapshot listener when component unmounts
        return unsubscribe
    }, [collectionRef]) // Trigger effect when collectionRef changes

    return { data, loading }
}

export default useGetData
