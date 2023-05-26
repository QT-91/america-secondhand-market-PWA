"use client"
import { useState } from 'react';
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';


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
      alert('제목을 입력해주세요.');
      return;
    } else if (content === '') {
      alert('내용을 입력해주세요.');
      return;
    } else if (price === '') {
      alert('가격을 입력해주세요.');
      return;
    // } else if (image === null) {
    //   alert('이미지를 선택해주세요.');
    //   return;
    }

    if (image !== null) {
      const storage = getStorage();

      // Create a reference to the Firebase storage
      const storageRef = ref(storage, `image/${image?.name}`);

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
    } else {
      fetchData(null)
    }
  };

  const fetchData = async (url: string | null) => {
    // Create a reference to the Firebase database
    const db = getFirestore();

    // Create an object with the upload data
    const newUpload = {
      title,
      content,
      price: Number(price),
      image: url,
      date: new Date(),
    };

    // Upload the object to the Firebase database
    // Add a new document in collection "cities"
    addDoc(collection(db, "Product"), newUpload)
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
    <div className="container flex flex-col mx-auto mt-3 text-black">
      <input type="text" className="form-control mt-2 px-3 py-2 rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />
      <textarea className="form-control mt-2 px-3 py-2 rounded" value={content} onChange={e => setContent(e.target.value)} placeholder="content" />
      <input type="text" className="form-control mt-2 px-3 py-2 rounded" value={price} onChange={e => setPrice(e.target.value)} placeholder="price" />
      <input className="form-control mt-2 px-3 py-2 rounded text-white" type="file" onChange={handleImageChange} />
      <button className="btn btn-danger mt-3 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors" onClick={handleUpload}>올리기</button>
    </div>
  )
}

export default UploadPage;