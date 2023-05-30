'use client'
import { Button, Textarea, Input, VStack, Box } from '@chakra-ui/react';
import { useState, ChangeEvent, useRef } from 'react';
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageClear = () => {
    setImage(null);
    setPreviewUrl(null);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      <Input ref={fileInputRef} type="file" onChange={handleImageChange} />
      {previewUrl && (
        <>
          <Box w="md" h="md" bgImage={previewUrl ? `url('${previewUrl}')` : "url('https://via.placeholder.com/350')"} bgSize="cover" bgPosition="center" />
          <Button onClick={handleImageClear}>Remove Image</Button>
        </>
      )}
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
