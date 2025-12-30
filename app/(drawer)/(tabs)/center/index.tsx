import { useAuth } from "@/src/stores/AuthStore";
import { Redirect, router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function CenterScreen() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    router.push("../login");
  };

  //如果用户未登录，重定向到登录页面
  if (!user) {
    return <Redirect href="../login" />;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>个人中心</Text>
      <Text style={styles.welcome}>
        欢迎, {user?.name || user?.email || "用户"}!
      </Text>
      <Text style={styles.text}>您已成功登录到个人中心。</Text>
      <Text style={styles.title}>个人资料</Text>
      <Text style={styles.info}>用户名: @user123</Text>
      <Text style={styles.info}>邮箱: user@example.com</Text>

      <Button title="登出" onPress={handleLogout} color="#f44336" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
  },
});
