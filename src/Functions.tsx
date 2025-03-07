import React, { useState } from "react";

declare global {
  interface Navigator {
    camera: any;
    notification: any;
    connection: any;
  }
  
  const cordova: any;
}

interface BatteryStatus {
  level: number;
  isPlugged: boolean;
}

const Functions: React.FC = () => {
  const [networkStatus, setNetworkStatus] = useState<string>("");

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

  const onOnline = () => {
    // Handle the online event
    var networkState = navigator.connection.type;

    console.log("Connection type: " + networkState);
    setNetworkStatus(networkState);
  };

  const scanQRCode = () => {
    if (cordova && cordova.plugins && cordova.plugins.barcodeScanner) {
      cordova.plugins.barcodeScanner.scan(
        (result: { text: string; format: string; cancelled: boolean }) => {
          // Exemplo de retorno:
          // result.text - contém o conteúdo do QR Code
          // result.format - formato do código (ex: "QR_CODE")
          // result.cancelled - flag indicando se a leitura foi cancelada
          if (!result.cancelled) {
        alert(`Conteúdo: ${result.text}\nFormato: ${result.format}`);
          } else {
        console.log("Leitura cancelada");
          }
        },
        (error: any) => {
          console.error("Erro ao escanear o QR Code:", error);
        },
        {
          preferFrontCamera: false,
          showFlipCameraButton: true,
          showTorchButton: true,
          torchOn: false,
          prompt: "Posicione o QR Code dentro da área de leitura",
          resultDisplayDuration: 1500,
          formats: "QR_CODE", // ou deixe em branco para ler vários formatos
          orientation: "portrait",
        }
      );
    } else {
      console.error("Plugin de scanner não disponível.");
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

        <button disabled onClick={triggerVibration}>
          Ativar Vibração (Não funciona)
        </button>

        <button onClick={batteryStatus}>Verificar Bateria</button>

        <button onClick={notification}>Notificação</button>

        <button onClick={onOnline}>Network</button>

        <button onClick={scanQRCode}>QRCode</button>
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

      {networkStatus && <p>Network: {networkStatus}</p>}
    </div>
  );
};

export default Functions;
