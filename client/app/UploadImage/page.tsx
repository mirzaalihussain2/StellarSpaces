'use client'
import React, { useState } from 'react';
import './page.css';

const CloudinaryUpload: React.FC = () => {
  const [data, setData] = useState('');
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleUploadBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
    const files = (e.currentTarget.querySelector('[type=file]') as HTMLInputElement)?.files;

    if (files) {
      const formData = new FormData();
      formData.append('upload_preset', 'docs_upload_example_us_preset');

      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        const responseData = await response.text();
        setData(prevData => prevData + responseData);
        console.log('responseData ', responseData);
        console.log('data ', data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadImage = () => {
    if (itemImage) {
      const data = new FormData();
      data.append('file', itemImage);
      data.append('upload_preset', 'reactHanger');
      data.append('cloud_name', 'dgwarr7v8');

      fetch('https://api.cloudinary.com/v1_1/dgwarr7v8/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setImageUrl(data.url);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleUploadBtn}>
          <input type="file" name="file" multiple />
          <button type="submit">Upload Multi</button>
        </form>
        <div id="data">
          {data && (
            <div>
              <h3>Upload Response:</h3>
              <pre>{data}</pre>
            </div>
          )}
        </div>
      </div>
      <div className="upload">
        <input type="file" onChange={(e) => setItemImage(e.target.files?.[0] || null)} />
        <button
          className="bg-orange-700 p-2 rounded-xl font-semibold text-white"
          onClick={uploadImage}
        >
          Upload Image
        </button>
      </div>
      <div className="imgDisplay">
        <h1>Uploaded image will be displayed below</h1>
        <img src={imageUrl} alt="uploaded" />
      </div>
    </>
  );
};

export default CloudinaryUpload;
