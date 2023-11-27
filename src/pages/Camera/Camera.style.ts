import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  texto: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'Karla_700Bold',
  },
  camera: {
    flex: 1,
  },
  frame: {
    flex: 0.5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  guidelines: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 150,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  backAzul:{
    backgroundColor: '#2B3155',
  },
  buttonImagem: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
    textButton: {
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '800',
      color: '#000',
      fontFamily: 'Karla_700Bold',
    },
    colorWhite: {
      color: '#fff',
    },
  },
  centerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageCenter:{
    alignContent: 'center',
    justifyContent: 'center',
  },
  loading:{
    position: 'absolute',
    width: '100%',
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});