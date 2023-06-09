'use client'
import { useState, useEffect } from 'react'
import ProductItem from '../components/productItem'
import { getFirestore, getDocs, collection } from "firebase/firestore";

import { Flex } from "@chakra-ui/react";
import { Product } from '@/shared/types/product';


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "Product"));
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