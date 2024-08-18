const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a detailed travel plan to Calgary, AB, Canada for 1 travelers.\nThe trip starts on Tue Aug 20 2024 and ends on Fri Aug 23 2024, with a budget of Cheap.\nProvide a list of famous places to visit, including the place name, details, image URL, geo coordinates, ticket pricing, travel time to each location, and the best time to visit each place.\nPlease format the response in JSON.\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"trip\": {\n    \"destination\": \"Calgary, AB, Canada\",\n    \"traveler_count\": 1,\n    \"start_date\": \"Tue Aug 20 2024\",\n    \"end_date\": \"Fri Aug 23 2024\",\n    \"budget\": \"Cheap\",\n    \"itinerary\": [\n      {\n        \"day\": \"Tuesday\",\n        \"date\": \"Aug 20, 2024\",\n        \"activities\": [\n          {\n            \"name\": \"Calgary Tower\",\n            \"details\": \"Enjoy panoramic views of Calgary from the observation deck of this iconic tower.\",\n            \"image_url\": \"https://www.calgarytower.com/sites/default/files/styles/large/public/media/2017-08/Calgary-Tower-Observation-Deck.jpg?itok=p1N_97wI\",\n            \"geo_coordinates\": \"51.0485, -114.0712\",\n            \"ticket_pricing\": \"Adult: $27.50\",\n            \"travel_time\": \"30 minutes by public transport from downtown\",\n            \"best_time_to_visit\": \"During the day for clear views, evenings for city lights\"\n          },\n          {\n            \"name\": \"Stephen Avenue Walk\",\n            \"details\": \"Explore this pedestrian-friendly street lined with shops, restaurants, and historic architecture.\",\n            \"image_url\": \"https://www.calgarytourism.com/sites/default/files/styles/hero_image/public/2021-07/stephen-avenue-walk-hero.jpg?itok=5m6C7e9g\",\n            \"geo_coordinates\": \"51.0480, -114.0702\",\n            \"ticket_pricing\": \"Free\",\n            \"travel_time\": \"5 minutes walk from Calgary Tower\",\n            \"best_time_to_visit\": \"Any time of day, but evenings are more lively\"\n          },\n          {\n            \"name\": \"Prince's Island Park\",\n            \"details\": \"Enjoy a relaxing stroll in this urban oasis with beautiful gardens, walking trails, and art installations.\",\n            \"image_url\": \"https://www.calgarytourism.com/sites/default/files/styles/hero_image/public/2019-08/princes-island-hero.jpg?itok=L67z8B_g\",\n            \"geo_coordinates\": \"51.0555, -114.0656\",\n            \"ticket_pricing\": \"Free\",\n            \"travel_time\": \"15 minutes walk from Stephen Avenue Walk\",\n            \"best_time_to_visit\": \"Any time of day, but evenings offer a peaceful ambiance\"\n          }\n        ]\n      },\n      {\n        \"day\": \"Wednesday\",\n        \"date\": \"Aug 21, 2024\",\n        \"activities\": [\n          {\n            \"name\": \"Calgary Zoo\",\n            \"details\": \"Experience a wide variety of animals from around the world at this award-winning zoo.\",\n            \"image_url\": \"https://www.calgaryzoo.com/sites/default/files/styles/hero_image/public/2017-07/Calgary-Zoo-hero.jpg?itok=M7i99L6u\",\n            \"geo_coordinates\": \"51.0652, -114.1059\",\n            \"ticket_pricing\": \"Adult: $29.95\",\n            \"travel_time\": \"30 minutes by public transport from downtown\",\n            \"best_time_to_visit\": \"Morning or late afternoon to avoid crowds\"\n          },\n          {\n            \"name\": \"Heritage Park Historical Village\",\n            \"details\": \"Step back in time and explore this living history museum with over 180 historic buildings.\",\n            \"image_url\": \"https://www.heritagepark.ca/sites/default/files/styles/hero_image/public/2018-05/hp_homepage_hero_image.jpg?itok=b96nJ33W\",\n            \"geo_coordinates\": \"51.0031, -114.0593\",\n            \"ticket_pricing\": \"Adult: $29.95\",\n            \"travel_time\": \"45 minutes by public transport from downtown\",\n            \"best_time_to_visit\": \"During the day to experience all the attractions\"\n          }\n        ]\n      },\n      {\n        \"day\": \"Thursday\",\n        \"date\": \"Aug 22, 2024\",\n        \"activities\": [\n          {\n            \"name\": \"Calgary Stampede\",\n            \"details\": \"Experience the excitement of this world-famous rodeo and festival (runs from July 5 to July 14, 2024)\",\n            \"image_url\": \"https://www.calgarystampede.com/sites/default/files/styles/gallery_full/public/2023-12/gallery-images/Stampede_2023_Gallery_426.jpg?itok=Y17gJ90R\",\n            \"geo_coordinates\": \"51.0485, -114.0712\",\n            \"ticket_pricing\": \"Varies depending on the event and time\",\n            \"travel_time\": \"Located in downtown Calgary\",\n            \"best_time_to_visit\": \"During the festival, but book tickets in advance\"\n          },\n          {\n            \"name\": \"Fort Calgary\",\n            \"details\": \"Discover the history of Calgary and the North-West Mounted Police at this historical site.\",\n            \"image_url\": \"https://www.fortcalgary.com/sites/default/files/styles/hero_image/public/2020-09/fortcalgary_hero_image_2.jpg?itok=T6Z02Y7X\",\n            \"geo_coordinates\": \"51.0462, -114.0626\",\n            \"ticket_pricing\": \"Adult: $17.50\",\n            \"travel_time\": \"15 minutes walk from Calgary Tower\",\n            \"best_time_to_visit\": \"During the day to explore the exhibits\"\n          }\n        ]\n      },\n      {\n        \"day\": \"Friday\",\n        \"date\": \"Aug 23, 2024\",\n        \"activities\": [\n          {\n            \"name\": \"Fish Creek Provincial Park\",\n            \"details\": \"Escape the city and enjoy a day of hiking, biking, or picnicking in this scenic park.\",\n            \"image_url\": \"https://www.albertaparks.ca/media/images/Parks-and-Protected-Areas/fish-creek-provincial-park/fish-creek-provincial-park_03_2828.jpg?w=1920\",\n            \"geo_coordinates\": \"51.0035, -114.0977\",\n            \"ticket_pricing\": \"Free\",\n            \"travel_time\": \"30 minutes by public transport from downtown\",\n            \"best_time_to_visit\": \"Any time of day, but mornings are less crowded\"\n          },\n          {\n            \"name\": \"Calgary Farmers' Market\",\n            \"details\": \"Browse local produce, crafts, and food vendors at this popular market.\",\n            \"image_url\": \"https://www.calgaryfarmersmarket.com/sites/default/files/styles/hero_image/public/2023-12/CMM_2024-01-25_Market-Entrance_DSC1980_R.jpg?itok=2o_D3Z03\",\n            \"geo_coordinates\": \"51.0466, -114.0862\",\n            \"ticket_pricing\": \"Free entry\",\n            \"travel_time\": \"20 minutes by public transport from downtown\",\n            \"best_time_to_visit\": \"Weekends for the best selection\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```"},
        ],
      },
    ],
  });
  
  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());
  