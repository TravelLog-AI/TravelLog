export const GetPhotoRef = async (placeName) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
    const res = await fetch(url);
    
    const result = await res.json();
    
    return result.results[0].photos[0].photo_reference;
};

export const fetchPlaceDetails = async (placeId) => {
    if (!placeId) {
        return null;
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
    const res = await fetch(url);
    
    const result = await res.json();
    
    return result.result;
}

export const fetchPlaceId = async (placeName) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(placeName)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}
`;
    const res = await fetch(url);
    
    const result = await res.json();

    if (result.predictions.length === 0) {
        return null;
    }

    console.log(result, 'result fetching place id');
    return result.predictions[0].place_id;
}