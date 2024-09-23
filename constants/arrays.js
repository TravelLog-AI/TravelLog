import { Entypo, FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const numberOfPeople = [
    '1 person',
    '2 people',
    '3 people',
    '4 people',
    '5 people',
    '6 people',
    '7 people',
    '8 people',
    '9 people',
    '10 people',
    'More than 10 people'
]

export const tripDetailTabs = [
    {
        id: 1,
        name: 'Overview',
        getIcon: (color) => <FontAwesome6 name="list-alt" size={24} color={color} />,
    },
    {
        id: 2,
        name: 'Itinerary',
        getIcon: (color) => <Entypo name="map" size={24} color={color} />,
    },
    {
        id: 3,
        name: 'Advisors',
        getIcon: (color) => <Ionicons name="people" size={24} color={color} />,
    },
];

export const profileTabs = [
  {
    id: 1,
    name: "Trips",
    getIcon: (color) => (
      <FontAwesome name="bus" size={20} color={color} />
    ),
  },
  {
    id: 2,
    name: "Blogs",
    getIcon: (color) => (
      <MaterialCommunityIcons name="post-outline" size={24} color={color} />
    ),
  },
];

export const overviewSubTabs = [
  {
    name: 'Flights',
    getIcon: (color) => <MaterialIcons name="flight" size={24} color={color} />
  },
  {
    name: 'Hotels',
    getIcon: (color) => <MaterialIcons name="hotel" size={24} color={color} />
  },
  {
    name: 'Landmarks',
    getIcon: (color) => <MaterialIcons name="location-on" size={24} color={color} />
  }
]