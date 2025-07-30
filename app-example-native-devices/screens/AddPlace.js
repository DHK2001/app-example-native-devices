import { insertPlace } from "@/util/database";
import PlaceForm from "../components/Place/PlaceForm";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.reset({
      index: 0,
      routes: [{ name: "AllPlaces" }],
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
