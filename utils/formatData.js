export const addActivityInItinerary = (
  updatedActivityData,
  itineraryData,
  currentItineraryDayIndex
) => {
  const updatedItineraryDay = {
    ...itineraryData[currentItineraryDayIndex],
    activities: [
        ...itineraryData[currentItineraryDayIndex].activities,
        updatedActivityData
    ]
  };

  const newItinerary = itineraryData.map((itineraryDay, index) => {
      if (index === currentItineraryDayIndex) {
        return updatedItineraryDay;
      }

      return itineraryDay;
  });

  return newItinerary;
};

export const updateActivityInItinerary = (
  updatedActivityData,
  activityIndex,
  itineraryData,
  currentItineraryDayIndex
) => {
    const updatedAcitivitiesDay = itineraryData[
      currentItineraryDayIndex
    ].activities.map((activity, index) => {
      if (index === activityIndex) {
        return updatedActivityData;
      }

      return activity;
    });

    const newItinerary = itineraryData.map((itineraryDay, index) => {
        if (index === currentItineraryDayIndex) {
            return {...itineraryDay, activities: updatedAcitivitiesDay};
        } 

        return itineraryDay;
    });

    return newItinerary;
};