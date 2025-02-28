import React, { useState } from "react";

declare global {
  interface Navigator {
    camera: any;
  }
}

const MenuSushi: React.FC = () => {
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("Localização obtida:", latitude, longitude);
          setPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setErrorMsg(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setErrorMsg("Geolocalização não é suportada neste dispositivo.");
    }
  };

  return (
    <div>
      
      {imageSrc && (
        <div className="mt-4">
          <img src={imageSrc} alt="Capturada pela câmera" style={{ maxWidth: '100%' }} />
        </div>
      )}

      <button onClick={openCamera}>Abrir Câmera</button>


      <button onClick={getLocation}>
        Obter Localização
      </button>
      {position && (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
        </div>
      )}
      {errorMsg && <p>Erro: {errorMsg}</p>}
    </div>
  );
};

export default MenuSushi;
