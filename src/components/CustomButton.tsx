import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  content?: ReactNode;  // 用于接收图标和文本的整体元素
}

export function CustomButton({ title, onPress, variant = 'primary', content }: ButtonProps) {
  const buttonStyle = variant === 'primary' 
    ? styles.primaryButton 
    : styles.secondaryButton;
    
  const textStyle = variant === 'primary' 
    ? styles.primaryText 
    : styles.secondaryText;

  return (
    <TouchableOpacity 
      style={buttonStyle}
      onPress={onPress}
    >
      {content ? content : <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#1e88e5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#1e88e5',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryText: {
    color: '#1e88e5',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});