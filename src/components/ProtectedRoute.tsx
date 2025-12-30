import { useAuth } from '@/src/stores/AuthStore';
import { Redirect, type Href } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // 如果还在加载认证状态，可以显示加载界面
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>加载中...</Text>
      </View>
    );
  }

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    return <Redirect href={'/login' as Href} />;
  }

  // 用户已登录，渲染子组件
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProtectedRoute;