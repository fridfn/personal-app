import * as english from "./english";
import * as indonesian from "./indonesian";

const languageMap = {
  english,
  indonesian
};

export function getTranslation({ lang, page }) {
  const selected = languageMap[lang?.toLowerCase()] || languageMap["english"];
  
  return selected?.[page] || {};
}
