import { getMonthNames } from "@/utils/generateDateList"

export const formatKeyToDate = ({ key }) => {
  const localLanguage = localStorage.getItem("language") === "indonesian" ? "id-ID" : "en-US"
  const dateObj = new Date(key);
  return {
    formattedDate: dateObj.toLocaleDateString(localLanguage, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    formattedTime: dateObj.toLocaleTimeString(localLanguage, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
};
