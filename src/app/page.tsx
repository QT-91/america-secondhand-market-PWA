'use client'
import { useState, useEffect } from 'react'
import ProductItem from '../components/productItem'
import { getFirestore, getDocs, collection, query, orderBy } from "firebase/firestore";
import { COLLECTION_PATH_PRODUCT } from '@/firebase/constants';

import { Flex } from "@chakra-ui/react";
import { Product } from '@/shared/types/product';


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const ProductRef = collection(db, COLLECTION_PATH_PRODUCT);
      const querySnapshot = await getDocs(query(ProductRef, orderBy('date', 'desc')));
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        } as Product);
      });
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <Flex direction="column">
      {products.map((product, i) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Flex>
  )
}