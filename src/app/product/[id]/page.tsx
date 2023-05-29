'use client'
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import { COLLECTION_PATH_PRODUCT } from '@/firebase/constants';

import { Product } from '@/shared/types/product';


Modal.setAppElement('.__className_0ec1f4') // replace with the id of your root element, if different


interface Props {
  params: {
    id: string;
  }
}

export default function ProductDetail({ params }: Props) {
  const router = useRouter();
  const isMountedRef = useRef(true);

  const [product, setProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Simulated async data fetching
  useEffect(() => {
    // Simulated API call to fetch product data

    const fetchData = async () => {
      const db = getFirestore();
      const docRef = doc(db, COLLECTION_PATH_PRODUCT, params.id);
      const docSnap = await getDoc(docRef);
      
      if (isMountedRef.current && docSnap.exists()) {
          setProduct(docSnap.data() as Product);
      } else {
        console.log('No such document!');
      }
    }

    fetchData();

    // Cleanup function to avoid setting state on unmounted component
    return () => {
      isMountedRef.current = false;
    };
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  
  const handleDelete = async () => {
    const db = getFirestore();
    await deleteDoc(doc(db, COLLECTION_PATH_PRODUCT, params.id));
    router.push('/');
  };

  return (
    <div className="container mx-auto mt-3">
      <h1>{product.title}</h1>
      <p>{product.content}</p>
      <p>${product.price}</p>

      <div className="bg-white">
        {!product.image ? (
          <></>
        ) : product.image.includes('svg') ? (
          <img src={product.image} alt={product.title} width={512} height={512} />
        ) : (
          <Image src={product.image} alt={product.title} width={512} height={512} />
        )}
      </div>

      <button 
        className="btn btn-danger mt-3 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors" 
        onClick={() => setModalOpen(true)}
      >
        Delete
      </button>

      <Modal 
        isOpen={modalOpen} 
        onRequestClose={() => setModalOpen(false)}
        className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete product?
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" 
              onClick={handleDelete}
            >
              Confirm delete
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
