import { useEffect, useState } from "react";
import PlacesList from "../components/Place/PlacesList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getPlaces } from "@/util/database";

function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  async function updatePlaces() {
    const data = await getPlaces();
    setLoadedPlaces(data);
  }
  useEffect(() => {
    async function loadPlaces() {
      const data = await getPlaces();
      setLoadedPlaces(data);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused, navigation]);

  return <PlacesList places={loadedPlaces} updatePlaces={updatePlaces} />;
}

export default AllPlaces;
