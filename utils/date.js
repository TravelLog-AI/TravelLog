export const YYYYMMDDFormat = (inputDate) => {
    const date = new Date(inputDate);
    console.log(date, 'date');

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
  
    const formattedDate = `${year.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
    return formattedDate;
  };