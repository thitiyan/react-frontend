import Button from '@mui/material/Button';
import AWS from 'aws-sdk';
import React, {  useState } from "react";
AWS.config.update({
	endpoint: '192.168.10.19:9000',
	accessKeyId: 'q0yzZ4iRaa97DLAEaEYz',
	secretAccessKey: 'Iy82jPimyHQ2VBmb0YAu6IhVJLqWZRLyAcC2n5N4',
	s3ForcePathStyle: true,
	signatureVersion: 'v4',
	sslEnabled: false, // Change to true if your Minio server uses SSL
  });
  
  const s3 = new AWS.S3();
  const ImageUploader = () => {const [selectedImage, setSelectedImage] = useState(null);
	const handleImageUpload = (event) => {const file = event.target.files[0];
		setSelectedImage(file);
		
		console.log(event)
	};
	const gallerypic = id => {
		window.location = './'
	  }
					
	const handleSaveToMinio = () => {
		
		if (selectedImage) {
		  const bucketName = 'kenkub';
		  const objectKey = selectedImage.name;
		  //alert(file.name)
		  const params = {
			Bucket: bucketName,
			Key: objectKey,
			Body: selectedImage,
			ACL: 'public-read',
			
		  };
		 
				
		  
		s3.upload(params, function (error, data) {
		  if (error) {
			console.error('Error uploading image: ', error);
		  } else {
			console.log('Image uploaded successfully. Location: ', data.Location);
		  }
		});
	  }
	};
  
	return (
	  <div>
		<h1>insert images to minio server</h1>
		<input type="file" onChange={handleImageUpload} />
		{selectedImage && (
		 <div>
		 <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
		 <button variant="contained" onClick={handleSaveToMinio}>Save to Minio</button>
		 <Button variant="contained" onClick={() => gallerypic()}>Home</Button>
		
	   </div>
		)}
	  </div>
	  
	);
	
  };
  function App() {
	return (
	  <div>
		<ImageUploader />
	  </div>
	);
  }
  
  export default App;
  