'use client'
import { Button, Textarea, Input, VStack } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { COLLECTION_PATH_PRODUCT, STORAGE_PATH_IMAGE } from '@/firebase/constants';


const UploadPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (title === '') {
      alert('Please enter a title.');
      return;
    } else if (content === '') {
      alert('Please enter content.');
      return;
    } else if (price === '') {
      alert('Please enter a price.');
      return;
    } else if (image === null) {
      alert('Please select an image.');
      return;
    }

    const storage = getStorage();

    // Create a reference to the Firebase storage
    const storageRef = ref(storage, `${STORAGE_PATH_IMAGE}/${image?.name}`);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            fetchData(url)
          })
          .catch((error) => {
            alert("Error!")
            console.error("Error", error);
          });
      })
      .catch((error) => {
        alert("Error!")
        console.error("Error", error);
      });
  };

  const fetchData = async (url: string) => {
    const db = getFirestore();

    const newUpload = {
      title,
      content,
      price: Number(price),
      image: url,
      date: new Date(),
    };

    addDoc(collection(db, COLLECTION_PATH_PRODUCT), newUpload)
      .then(() => {
        alert("Success!");
        router.push('/')
      })
      .catch((error) => {
        alert("Error!")
        console.error("Error", error);
      });
  }

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
        onClick={handleUpload}
      >
        Upload
      </Button>
    </VStack>
  )
}

export default UploadPage;
