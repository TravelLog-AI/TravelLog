export const GetPhotoRef = async (placeName) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
    const res = await fetch(url);
    
    const result = await res.json();
    
    return result.results[0].photos[0].photo_reference;
};

export const fetchPlaceDetails = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
    const res = await fetch(url);
    
    const result = await res.json();
    
    return result.result;
}