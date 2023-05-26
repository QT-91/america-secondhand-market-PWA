// "use client"
// import { useState, useEffect } from 'react';
// import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from 'next/link';

import ProductItemDiv from './productItem.module';
import { Product } from '@/shared/types/product';


interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  // const [docData, setDocData] = useState<any>(null);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const db = getFirestore();
  //     const docRef = doc(db, 'Product', id);
  //     const docSnap = await getDoc(docRef);
      
  //     if (docSnap.exists()) {
  //       setDocData(docSnap.data());
  //     } else {
  //       console.log('No such document!');
  //     }
  //   }

  //   fetchData();
  // }, [id]);

  return (
    <Link href={`/product/${product.id}`}>
      {product && (
        <ProductItemDiv className="container mt-3">
          <div className="product">
            <div className="thumbnail" style={{"backgroundImage": "url('https://via.placeholder.com/350')"}}></div>
            <div className="flex-grow-1 p-4">
              <h5 className="title">{product.title}</h5>
              <p className="date">{String(new Date(product.date))}</p>
              <p className="price">{product.price}</p>
              <p className="float-end">?0</p>
            </div>
          </div>
        </ProductItemDiv>
      )}
    </Link>
  );
}

export default ProductItem;
