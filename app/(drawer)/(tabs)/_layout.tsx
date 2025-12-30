import MenuButton from "@/src/components/DrawerMenuButton";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1e88e5",
        tabBarInactiveTintColor: "#757575",
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerLeft: () => <MenuButton />,

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="center"
        options={{
          title: "个人中心",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          // tabBarItemStyle: { display: 'none' } // 添加这行来隐藏菜单项
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "设置",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),

        }}
      />
    </Tabs>
  );
}
