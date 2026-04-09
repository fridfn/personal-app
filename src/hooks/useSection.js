import { getTranslation } from "@/content/getTranslation"
import { getInitialLanguage } from "@/hooks/languageHelper"

export const useSection = ({ language, section, pagesActive }) => {
  const preferredLanguage = localStorage.getItem("language")
  
  if (!preferredLanguage) getInitialLanguage();
  const setLanguage = getTranslation({ lang: preferredLanguage, page: section })
  
  const pagination = setLanguage?.pagination;
  
   const ComponentPages = Object.fromEntries(
    pagination.map(({ routes, component }) => {
      const key = routes.split("/").pop();
      return [key, component];
    })
  );
  
  const SectionPages = ComponentPages[pagesActive];
  
  return {
   pagination,
   setLanguage,
   SectionPages,
   preferredLanguage
  }
}
