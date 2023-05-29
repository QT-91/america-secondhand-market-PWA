'use client'
import { Box, Button, Textarea, Input, VStack } from '@chakra-ui/react';
import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { COLLECTION_PATH_PRODUCT, STORAGE_PATH_IMAGE } from '@/firebase/constants';


interface Props {
  params: {
    id: string;
  }
}

const UpdatePage = ({ params }: Props) => {
  const id = params.id;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data when component mounts
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    const db = getFirestore();
    const docRef = doc(db, COLLECTION_PATH_PRODUCT, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setTitle(data.title);
      setContent(data.content);
      setPrice(data.price);
      setImageUrl(data.image);
    } else {
      console.log('No such document!');
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    let _imageUrl = null;

    if (title === '' || content === '' || price === '' || imageUrl === '') {
      alert('Please complete all fields.');
      return;
    }

    if (image) {
      // If a new image was selected, upload it to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `${STORAGE_PATH_IMAGE}/${image?.name}`);
      
      try {
        const snapshot = await uploadBytes(storageRef, image);
        _imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        alert("Error!")
        console.error("Error", error);
        return;
      }
    }

    const db = getFirestore();
    const docRef = doc(db, COLLECTION_PATH_PRODUCT, id);

    const updatedData = {
      title,
      content,
      price: Number(price),
      image: _imageUrl,
      date: new Date(),
    };

    try {
      await updateDoc(docRef, updatedData);
      alert("Update successful!");
      router.push('/')
    } catch (error) {
      alert("Error!")
      console.error("Error", error);
    }
  };

  return (
    <VStack spacing={3} mt={6}>
      <Input 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <Textarea 
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Input
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <Input type="file" onChange={handleImageChange} />
      <Button 
        colorScheme="blue" 
        onClick={handleUpdate}
      >
        Update
      </Button>
    </VStack>
  )
}

export default UpdatePage;