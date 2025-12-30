import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '../configs/constants';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: THEME_COLORS.primary,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

// 为特定组件导出样式
export const buttonStyles = {
  primary: {
    backgroundColor: THEME_COLORS.primary,
  },
  secondary: {
    backgroundColor: THEME_COLORS.secondary,
  },
};