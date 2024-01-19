import React, { useState, useRef } from "react";
import { Text, View, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { styles } from "./Camera.style";
import { CameraPreview } from "../../organisms/CameraPreview/CameraPreview";
import { CameraInterface } from "../../organisms/CameraInterface/CameraInterface";
import useCameraPermissions from "../../hook/useCameraPermissions";
import {
  reduzirImage,
  saveImageToPermanentStorage,
} from "../../services/imageService";
import PointEletronic from "../../organisms/PointEletronic/PointEletronic";
import { RootStackParamList } from "../../routes/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

const CameraPoint: React.FC<DetailsScreenProps> = ({ route }) => {
  const { param } = route.params;
  const hasPermission = useCameraPermissions();
  const [type, setType] = useState(0);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [imagem, setimagem] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPhotoConfirmed, setIsPhotoConfirmed] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  const takePicture = async () => {
    setIsLoading(true);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      try {
        const newPhotoUri = await saveImageToPermanentStorage(photo.uri);
        const imageBase64 = await reduzirImage(newPhotoUri);
        // console.log('imageBase64>',imageBase64);
        setPhotoUri(newPhotoUri);
        setimagem(imageBase64);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const retakePicture = () => {
    setPhotoUri(null);
    setIsLoading(false);
  };

  const confirmPhoto = () => {
    setIsPhotoConfirmed(true);
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;
  if (photoUri && !isPhotoConfirmed)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CameraPreview
          photoUri={photoUri}
          onRetake={retakePicture}
          onConfirm={confirmPhoto}
        />
      </SafeAreaView>
    );
  if (isPhotoConfirmed)
    return <PointEletronic photoUri={photoUri} imagem={imagem} param={param} />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraInterface
        type={CameraType.front}
        isLoading={isLoading}
        onTakePicture={takePicture}
        cameraRef={cameraRef}
      />
    </SafeAreaView>
  );
};

export default CameraPoint;
