import React, { useState } from "react";

declare global {
  interface Navigator {
    camera: any;
  }
}

const MenuSushi: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  function onSuccess(imageData: string) {
    console.log(imageData);
    setImageSrc(imageData);
  }

  function onFail(message: string) {
    console.log(message);
  }

  const openCamera = () => {
    console.log("Abrindo câmera");
    
    navigator.camera.getPicture(onSuccess, onFail,
      {
          destinationType: navigator.camera.DestinationType.DATA_URL,
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          quality: 100,
      });
  };

  return (
    <div>
      
      {imageSrc && (
        <div className="mt-4">
          <img src={imageSrc} alt="Capturada pela câmera" style={{ maxWidth: '100%' }} />
        </div>
      )}

      <button onClick={openCamera}>Abrir Câmera</button>
    </div>
  );
};

export default MenuSushi;
