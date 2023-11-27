import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export const saveImageToPermanentStorage = async (photoUri: string) => {
  if (FileSystem.documentDirectory) {
    const newUri = FileSystem.documentDirectory + new Date().getTime() + '.jpg';
    await FileSystem.copyAsync({
      from: photoUri,
      to: newUri,
    });
    return newUri;
  } else {
    throw new Error("Could not access the document directory");
  }
};

export const reduzirImage = async (imageUri: string) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 500, height: 500 } }],
    { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8, base64: true },
  );
  return manipResult.base64;
};
