import { Stack } from "expo-router";


// 没必要在Tabs下嵌套Stack, 因为Tabs本身就有Stack导航功能.
export default function SettingsStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="notices"
        options={{
          title: "通知设置",
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          title: "密码修改",
        }}
      />
    </Stack>
  );
}
