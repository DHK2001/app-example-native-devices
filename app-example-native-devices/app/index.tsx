import { Colors } from "@/constants/Colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "../components/UI/IconButton";
import AddPlace from "../screens/AddPlace";
import AllPlaces from "../screens/AllPlaces";
import Map from "../screens/Map";
import { useEffect, useState } from "react";
import { init } from "../util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "../screens/PlaceDetails";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await init();
        await Font.loadAsync(Ionicons.font);
        setDbInitialized(true);
      } catch (e) {
        console.log("Error initializing database", e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!dbInitialized) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: "Your Favorite Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("AddPlace")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: "Add a new Place",
        }}
      />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        options={{
          title: "Loading Place....",
        }}
      />
    </Stack.Navigator>
  );
}
