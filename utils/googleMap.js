export const GetPhotoRef = async (placeName) => {
    console.log('executed photo ref');
    
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
    const res = await fetch(url);
    
    console.log('photoRef', res);
    
    const result = await res.json();
    console.log(result, 'photo ref result');
    
    return result.results[0].photos[0].photo_reference;
};