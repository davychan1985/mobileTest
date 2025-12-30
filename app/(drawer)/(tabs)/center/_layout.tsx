import { useAuth } from '@/src/stores/AuthStore';
import { Redirect, Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function CenterLayout() {
  const { user, isLoading } = useAuth();
  // 如果还在加载认证状态，可以显示加载界面
  // if (isLoading) {
  //   return null; // 或者返回一个加载组件
  // }

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    return <Redirect href="../login" />;
  }

  //用户已登录，返回null以继续渲染子组件
  return <CenterStack />;
}

function CenterStack() {
  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}