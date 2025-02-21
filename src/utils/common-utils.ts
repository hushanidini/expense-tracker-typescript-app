import moment from "moment";

export function formatDate(date: string | Date | undefined): {
    formatted1: string; // "MMM DD, YYYY" e.g., "Aug 04, 2024"
    formatted2: string; // "MM/DD/YYYY" e.g., "08/04/2024"
    formatted3: string; // "YYYY-MM-DD" e.g., "2024-08-04"
    formatted4: string; // "YYYY-MM-DD" e.g., "2024-08-04"
    formatted5: string; // "YYYY-MM-DD" e.g., "2024-08-04"
    formatted6: string;
    formatted7: string;
    formatted8: string;
    formatted9: string;
    formatted10: string;
    formatted11: string;
    formatted12: string;
    formatted13: string;
    formatted14: string;
  } {
    const parsedDate = moment(date);
    const formatted1 = parsedDate.format("MMM DD, YYYY");
    const formatted2 = parsedDate.format("MM/DD/YYYY");
    const formatted3 = parsedDate.format("YYYY-MM-DD"); 
    const formatted4 = parsedDate.format("MM/DD/YYYY hh:mm A"); 
    const formatted5 = parsedDate.format("dd"); 
    const formatted6 = parsedDate.format("hh:mm A");
    const formatted7 = parsedDate.format("MMMM Do, YYYY, dddd"); //October 14th, 2024, Monday
    const formatted8 = parsedDate.format("DD ddd, MMM YYYY | hh:mm A"); // 11 Mon, Aug 2024 | 12:00 AM
  
    const formatted9 = parsedDate.format("DD ddd, MMM YYYY"); //11 Mon, Aug 2024
    const formatted10 = parsedDate.format("MM/DD/YYYY | hh:mm:ss A");
    const formatted11 = parsedDate.format("DD MMM YYYY"); // 24 june 2024
    const formatted12 = parsedDate.format("dddd, DD MMM YYYY"); // Monday, 01 Jul 2024
    const formatted13 = parsedDate.format("YYYY-MM-DD hh:mm:ss"); // 2024-12-25 13:00:00
    const formatted14 = parsedDate.toString(); // "Thu Jan 09 2025 03:52:17 GMT-0500"
  
    return {
      formatted1,
      formatted2,
      formatted3,
      formatted4,
      formatted5,
      formatted6,
      formatted7,
      formatted8,
      formatted9,
      formatted10,
      formatted11,
      formatted12,
      formatted13,
      formatted14,
    };
  }