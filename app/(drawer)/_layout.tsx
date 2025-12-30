import MenuButton from "@/src/components/DrawerMenuButton";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";

function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="首页"
        icon={({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        onPress={() => {
          // 自定义跳转逻辑
          router.push("/(drawer)/(tabs)");
          // 关闭抽屉
          props.navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label="登录"
        icon={({ color, size }) => (
          <Ionicons name="log-in" size={size} color={color} />
        )}
        onPress={() => {
          router.push("/(drawer)/login");
          props.navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#1e88e5",
        drawerInactiveTintColor: "#757575",
        headerShown: true,
        headerLeft: () => <MenuButton />,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' } // 添加这行来隐藏菜单项
        }}
      />
      <Drawer.Screen name="login" options={{ title: '登录' }} />
    </Drawer>
  );
}
