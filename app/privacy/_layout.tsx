import { CustomButton } from "@/src/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function PrivacyStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1e88e5" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: true, //默认也是true
      }}
    >
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: "隐私说明",
          headerLeft: () => (
            <CustomButton
              onPress={() => navigation.goBack()}
              content={
                <>
                  <Ionicons name="arrow-back" size={16} color="#fff" />
                  <Text style={{ color: "#fff" }}>返回</Text>
                </>
              }
            />
          ),
          headerRight: () => (
            <CustomButton
              title="保存"
              onPress={() => alert("这是保存按钮!")}
              content={
                <>
                  <Text style={{ color: "#fff" }}>保存</Text>
                  <Ionicons name="save" size={14} color="#fff" />
                </>
              }
            />
          ),
        })}
      />
    </Stack>
  );
}
