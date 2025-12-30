import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

const DrawerMenuButton = () => {
  const navigation = useNavigation();
  
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="menu" size={24} color="#000" />
    </Pressable>
  );
};

export default DrawerMenuButton;