import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { getPlaceById } from "@/util/database";

function PlaceDetails({ route, navigation }) {
  const selectedPlaceId = route.params.placeId;
  const [placeDetails, setPlaceDetails] = useState();

  useEffect(() => {
    async function loadPlaceDetails() {
      const data = await getPlaceById(selectedPlaceId);
      setPlaceDetails(data);
      navigation.setOptions({
        title: data.title
      })
    }
    loadPlaceDetails();
  }, [selectedPlaceId, navigation]);

  function showOnMapHandler() {
    navigation.navigate("Map", {
        initialLat: placeDetails.location.lat,
        initialLng: placeDetails.location.lng
    });
  }

  if (!placeDetails) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.loadingText}>Loading....</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeDetails.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutlinedButton onPress={showOnMapHandler}>View on Map</OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary100,
    textAlign: "center",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: Colors.primary100,
    textAlign: "center",
    fontSize: 24,
  },
});
