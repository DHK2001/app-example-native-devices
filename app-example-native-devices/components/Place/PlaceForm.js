import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/Place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  function imageIsEmpty(uri) {
    if (uri.length === 0) {
      return true;
    }
    return false;
  }

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function imageTakenHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation({
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    });
    if (location.titleImage || location.titleImage > 0) {
      setEnteredTitle(location.titleImage);
    }
    if (location.selectedImage || location.selectedImage > 0) {
      setSelectedImage(location.selectedImage);
    }
  }, []);

  async function savePlaceHandler() {
    if (!pickedLocation || enteredTitle.length === 0) {
      Alert.alert(
        "Missing Data!",
        "Please fill in all the required fields before continuing."
      );

      return;
    }

    const placeData = new Place(
      enteredTitle,
      imageIsEmpty(selectedImage)
        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAACUCAMAAADcWPdGAAAAVFBMVEXl5eXY2Njb29vo6OhoaGiampp/f3/r6+uNjY2Tk5N2dna0tLRiYmLAwMDU1NTf39/Nzc1WVlZbW1tRUVFwcHDGxsarq6uGhoaioqJKSkq6urpAQEBjqG2RAAAFGklEQVR4nO2bi3KlKBBAFRAUkTf4mP//z230mmiSqd2qW7vqbJ9Kot5IlcfuBiSxqhAEQRAEQRAEQRAEQRAEQRAEQRAEQRCEvs3VBt+gunmX/mqHb4glKPYWnl/t8A3Rq2Tqd+jk1Q7fAKnhLSlyUynyJ0YKpVDqIlCqJgb4cvrTpUxqOO/sWevpUtPMOGeu08cWD5eaXGMJsY1v/phIkcRaAqeSujk1eZoUOf1mUolsdrE5zKyeJUXI0NenkOjt83rkT5UiuvGuteZw9U+XImThvpmUHPYcJPkj/dj0SCkDYYoLJGBU+ZWCUErcgIypO5ae2FGYFP06GhE9uvY1LJHsearrNLr8wHGK6MnJxewqDAKz5V3PHIOv/LwZBakX6Rv9UTVm4H7agmVsbpq89h3ko198glQZW2V/HKGI7vZecB18yRo0mFw8RYqYJOfz3K54Zs+OKxnENC7I2jxDCsYmF39YiDGWz82ecIQkGaaBqS1WN5eCsUmqxv60uFRG4vE1TNU9i70xA5PrB+2tpYyefDxNjM4pWFRK/9BteiSpWJYMbx0p6OXC12o6WpHEXWMgEV2j94ltqbQbS0GnV8am3yltwZocn9ghXZP06b6LmTAfku7najpamZ4FflilJqmzt40UPM2q2JPfpt4HJuVTghJoc1MpM0jf/V2Ydotvn9xVirPlH4TpN9xVyuo3/vBxU6n/+QotSl0HSqHUhbwtddPBNxnyDreUCrx9C3Y/KWpH/ibT1Q4/YN7laoF/g/v9ExmCIAiCIAhyRohtzkaFeB0XTifsP46nfe6c2gjxrf0F0CXrYkVtTmVD7TS2k/2cnJq+N9T0eZuDU7Nks/7S5v2FAUpT046NLa9FLLkvLNdObgWbOYFLENOvtrwbMYbgXJhb87osqr3TVLO5W+8+zW62Zc+M87YDZ/A5eB/m0VIT5zAD8dpQCeldebgTOXQVJTLEru87Fsb6ZaWZAqnoXRIlntH7EkZqmXfdFmJo0/TLFNVCDXdteesjXy7l/SI2KdGEOFRQZIn512Ms3aX8GtDWvaQmJ1WExKWmdbCFykwDHPBgb/BYJaRSnhlRpGjN/HaPRZ7lWmqfUs5nKnpwWqUq6Qbpe1HRpELa0hC+i5TYu57rgEjl0ck1UrR38pV1RvnhJMWmoJLxvpMOpMQwc9PPo6F0mse1QXmcL+nX25QSudCoKlJuscpPRUpkt78tRGNYzpEibRhHN1q+SnGXhVEs0aqZGzheZIyxKVIuhPBrubqm3AJCLJ2lqui+SNWaea8SgUgJShz4iC5MFW3CKsWUCi2knyvrbGO6uEsvUtUYeAed2eDjq5JquP6zlKZZhUnURQrsleQ8OklEH8pyn9E6z23pKIbq+nWlIkUpXKryXWWin9Y3CyEIvP4qZVpW0VXKcL8BN8Sy0JfOXiybVLrB24mrVEUHyK2u9BYqQ5GT7FX/mj19SMGIZOkmNahoAT2FUVSTdz30EdUeqXXt+g5SFVwaSFVVFxyfGu5KtWwnfEYK5kNbpEodrTM8y5wWpHNunKaWQfdppJNlrXa8vKZKTKgZXVc2OcI8J8T8sTR5kKpKscmgdZy3I9PNjYA2rMyNVGeLlHfQAaqL80/btawpsXo9JkPfJ3K4KGtLP2AP5xu7H0GjckdKm0GX+6Dtiv7vrv9HPop634ovU4L1hM/SL3uHo9dmf9q47WvMCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIKc+QsriGC91uMeNgAAAABJRU5ErkJggg=="
        : selectedImage,
      pickedLocation
    );
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker selectedImage={selectedImage} onTakeImage={imageTakenHandler} />
      <LocationPicker
        onTakeLocation={pickLocationHandler}
        titleImage={enteredTitle}
        selectedImage={selectedImage}
      />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderColorBottom: Colors.primary700,
    borderBottomColor: 2,
    backgroundColor: Colors.primary100,
  },
});
