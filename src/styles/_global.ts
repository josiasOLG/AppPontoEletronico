import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Layouts
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLarge: {
    fontSize: 24,
  },
  textMedium: {
    fontSize: 18,
  },
  textSmall: {
    fontSize: 12,
  },
  textPrimary: {
    color: '#333',
  },
  textSecondary: {
    color: '#666',
  },
  buttonPrimary: {
    backgroundColor: '#6200EA',
    padding: 10,
    borderRadius: 5,
  },
  buttonSecondary: {
    backgroundColor: '#03DAC5',
    padding: 10,
    borderRadius: 5,
  },
  bgPrimary: {
    backgroundColor: '#6200EA',
  },
  bgSecondary: {
    backgroundColor: '#03DAC5',
  },
});
