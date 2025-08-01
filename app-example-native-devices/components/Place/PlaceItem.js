import { Colors } from "@/constants/Colors";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function PlaceItem({ place, onSelect, onDelete }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
      <Pressable
        onPress={onDelete.bind(this, place.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.pressedDelete,
        ]}
      >
        <Ionicons name="trash" size={20} color={Colors.MediumDarkRed} />
      </Pressable>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
  deleteButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  pressedDelete: {
    opacity: 0.6,
  },
});
