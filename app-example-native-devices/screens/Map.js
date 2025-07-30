import IconButton from "@/components/UI/IconButton";
import { useCallback, useLayoutEffect, useState, useMemo } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map({ navigation, route }) {
  const initialLocation = useMemo(() => {
    return route.params
      ? {
          lat: route.params.initialLat,
          lng: route.params.initialLng,
        }
      : null;
  }, [route.params]);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const isInitialLocationValid =
    initialLocation?.lat != null && initialLocation?.lng != null;

  let region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (isInitialLocationValid) {
    region = {
      latitude: initialLocation.lat,
      longitude: initialLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  function selectLocationHandler(event) {
    if (!isInitialLocationValid) {
      const lat = event.nativeEvent.coordinate.latitude;
      const lng = event.nativeEvent.coordinate.longitude;
      setSelectedLocation({ lat, lng });
    }
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
      titleImage: route.params.titleImage,
      selectedImage: route.params.selectedImage
    });
  }, [navigation, selectedLocation, route]);

  useLayoutEffect(() => {
    if (isInitialLocationValid) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon={"save"}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, isInitialLocationValid]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation?.lat != null && selectedLocation?.lng != null && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
