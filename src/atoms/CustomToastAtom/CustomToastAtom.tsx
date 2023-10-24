import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import IconAtom from '../IconAtom/IconAtom';

interface ToastProps {
  text1: string;
  text2?: string;
}

const iconSize = 24;

const CustomToast: React.FC = () => {
  return (
    <Toast
      config={{
        success: (toast) => (
          <View style={[styles.toast, styles.success]}>
            <LinearGradient
              colors={["#006400", "#20B2AA"]}
              style={styles.iconContainer}
            >
              <IconAtom name="checkmark-circle" size={iconSize} color="white" library='Ionicons'/>
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.text1}>{toast.text1}</Text>
              {toast.text2 && <Text style={styles.text2}>{toast.text2}</Text>}
            </View>
          </View>
        ),
        error: (toast) => (
          <View style={[styles.toast, styles.error]}>
            <LinearGradient
              colors={["#F44336", "#D32F2F"]}
              style={styles.iconContainer}
            >
              <Ionicons name="close-circle" size={iconSize} color="#fff" />
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.text1}>{toast.text1}</Text>
              {toast.text2 && <Text style={styles.text2}>{toast.text2}</Text>}
            </View>
          </View>
        ),
        warning: (toast) => (
          <View style={[styles.toast, styles.warning]}>
            <LinearGradient
              colors={["#FFC107", "#FBC02D"]}
              style={styles.iconContainer}
            >
              <Ionicons name="warning" size={iconSize} color="#fff" />
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.text1}>{toast.text1}</Text>
              {toast.text2 && <Text style={styles.text2}>{toast.text2}</Text>}
            </View>
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  iconContainer: {
    borderRadius: iconSize / 2,
    width: iconSize,
    height: iconSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    color: '#333',
    fontWeight: 'bold',
  },
  text2: {
    color: '#333',
    fontWeight: '400',
  },
  success: {
    borderLeftWidth: 5,
    borderLeftColor: '#388E3C',
  },
  error: {
    borderLeftWidth: 5,
    borderLeftColor: '#D32F2F',
  },
  warning: {
    borderLeftWidth: 5,
    borderLeftColor: '#FBC02D',
  },
});

export default CustomToast;
