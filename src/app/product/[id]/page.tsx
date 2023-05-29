'use client'
import { useRef, useState, useEffect } from 'react';
import { Container, Flex, Text, Box, Button, ButtonGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { COLLECTION_PATH_PRODUCT } from '@/firebase/constants';

import { Product } from '@/shared/types/product';


interface Props {
  params: {
    id: string;
  }
}

export default function ProductDetail({ params }: Props) {
  const router = useRouter();
  const isMountedRef = useRef(true);

  const [product, setProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <Container>
      <Text fontSize="2xl">{product.title}</Text>
      <Text>{product.content}</Text>
      <Text>${product.price}</Text>

      <Box>
        {!product.image ? (
          <></>
        ) : product.image.includes('svg') ? (
          <img src={product.image} alt={product.title} width={512} height={512} />
        ) : (
          <Image src={product.image} alt={product.title} width={512} height={512} />
        )}
      </Box>

      <Flex gap='2' mt={3} gridGap={3}>
        <ButtonGroup gap='2'>
          <Button
            colorScheme="blue"
            as={NextLink}
            href={`/product/${params.id}/update`}
          >
            Update
          </Button>
          <Button 
            colorScheme="red" 
            onClick={onOpen}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Flex>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete product?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete this product? This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Confirm delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
