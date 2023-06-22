




import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
    endpoint: '192.168.10.19:9000',
	accessKeyId: 'lRcmK6xITpJZKVEeGyBm',
	secretAccessKey: 'SpljuxBJDoZ8ahvUeU7HBg3mdNZ8fQwEsiECtDTX',
	s3ForcePathStyle: true,
	signatureVersion: 'v4',
	sslEnabled: false, // Change to true if your Minio server uses SSL
  });

  const s3 = new AWS.S3();

  const Insertimages = id => {
    window.location = '/picture'
  }

  const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const params = {
            Bucket: 'kenkub', // Replace with your S3 bucket name
          };
          //1 list object from params -------------
          const data = await s3.listObjects(params).promise();



          //2 create url from object
          const urls = await Promise.all(
            data.Contents.map(async (object) => {
              console.log(object)  // example {Key: 'yung.png', LastModified: Wed Jun 14 2023 15:18:40 GMT+0700 (Indochina Time), ETag: '"819c860a6d2d690858871af6588fce51"', ChecksumAlgorithm: Array(0), Size: 309257, …}
              const getObjectParams = {
                Bucket: 'kenkub', // Replace with your S3 bucket name
                Key: object.Key,
              };

              // 
              const objectData = await s3.getObject(getObjectParams).promise();
              const imageBlob = new Blob([objectData.Body]);
              console.log(imageBlob)
              return URL.createObjectURL(imageBlob);
            
            })
          );
          

          setImageUrls(urls);
          // console.log(urls)
        } catch (error) {
          console.error('Error retrieving images:', error);
        }
      };
  
      fetchImages();
    }, []);
  
    return (
      <div>
        {imageUrls.map((url, index) => (
          //console.log(index),
          <img key={index} src={url} alt={` ${index }`} 
            //<Button variant="contained" onClick={() => gallerypic()}>gallerypic</Button>
          style={{ width: '200px', height: '200px' }}/>
        ))}
        <button variant="contained" onClick={Insertimages}>Add images </button>
      </div>
    );
     
  };
  const App = () => {
    return (
      <div>
        <h1>Get images from minio by aws-sdk

        </h1>
        <ImageGallery />
      </div>
    );
  };
  export default App;    