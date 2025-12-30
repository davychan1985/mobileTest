import {
  confirmNavigate,
  prefetchAndNavigate,
  safeNavigate,
} from "@/src/utils/navigation";
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>接收通知</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>夜间模式</Text>
        <Switch
          value={false}
          onValueChange={() => console.log("夜间模式切换")}
        />
      </View>
      <Button onPress={() => safeNavigate("/privacy")}>查看隐私说明</Button>
      <Button
        onPress={() =>
          confirmNavigate("/other", "确认要离开设置页面吗？", "确认导航")
        }
      >
        查看其他
      </Button>
      {/* 预加载导航（提升性能） */}
      <Button onPress={() => prefetchAndNavigate("/settings/password")}>
        修改密码
      </Button>
      {/* /(drawer)/(tabs)/settings/password 可省略为 /settings/password */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingLabel: {
    fontSize: 18,
  },
});
