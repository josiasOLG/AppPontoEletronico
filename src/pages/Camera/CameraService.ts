import { Camera } from 'expo-camera';
import { saveImageToPermanentStorage } from '../../services/imageService';

export const takePicture = async (cameraRef: React.RefObject<Camera>) => {
  if (!cameraRef.current) throw new Error("Camera reference is null");
  const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
  const newPhotoUri = await saveImageToPermanentStorage(photo.uri);
  return newPhotoUri;
};
