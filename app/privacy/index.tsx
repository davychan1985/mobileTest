import { StyleSheet, Text, View } from "react-native";

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.privacyLabel}>隐私说明</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  privacyLabel: {
    fontSize: 18,
  },
});
