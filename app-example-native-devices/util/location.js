import Constants from "expo-constants";

const apiKey = Constants.expoConfig.extra.GOOGLE_API_KEY;

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${lat},${lng}&zoom=14&size=400x200&markers=icon:small-red-cutout|${lat},${lng}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lon) {
  const url = `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.display_name;
}
