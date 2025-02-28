import React, { useState } from "react";

declare global {
  interface Navigator {
    camera: any;
    notification: any;
  }
}

interface BatteryStatus {
  level: number;
  isPlugged: boolean;
}

const MenuSushi: React.FC = () => {
  const [batery, setBatery] = useState<BatteryStatus>({
    level: 0,
    isPlugged: false,
  });
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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

    navigator.camera.getPicture(onSuccess, onFail, {
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

  const triggerVibration = () => {
    if (navigator.vibrate) {
      // Vibra por 1 segundo
      navigator.vibrate(1000);
    } else {
      console.error("Vibração não suportada neste dispositivo.");
    }
  };

  function onBatteryStatus(status: BatteryStatus) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
    setBatery(status);
  }

  const batteryStatus = () => {
    window.addEventListener(
      "batterystatus",
      (event: any) => onBatteryStatus(event as BatteryStatus),
      false
    );
  };

  function alertDismissed() {
    // do something
  }

  const notification = () => {
    if (navigator.notification) {
      navigator.notification.alert(
        "You are the winner!", // message
        alertDismissed, // callback
        "Game Over", // title
        "Done" // buttonName
      );
    }
  };

  return (
    <div>
      {imageSrc && (
        <div className="mt-4">
          <img
            src={imageSrc}
            alt="Capturada pela câmera"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button onClick={openCamera}>Abrir Câmera</button>

        <button onClick={getLocation}>Obter Localização</button>

        <button disabled onClick={triggerVibration}>Ativar Vibração (Não funciona)</button>

        <button onClick={batteryStatus}>Verificar Bateria</button>

        <button onClick={notification}>Notificação</button>
      </div>

      {position && (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
        </div>
      )}

      {batery.isPlugged && (
        <div>
          <p>Level: {batery.level}</p>
          <p>isPlugged: {batery.isPlugged}</p>
        </div>
      )}

      {errorMsg && <p>Erro: {errorMsg}</p>}
    </div>
  );
};

export default MenuSushi;
