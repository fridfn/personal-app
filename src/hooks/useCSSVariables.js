import { useMemo } from "react";

export function useCSSVariables(vars = []) {
  return useMemo(() => {
   const toCamelCase = (str) =>
    str
      .replace(/^--/, "")
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const root = document?.documentElement;
    if (!root || !vars.length) return {};

    const styles = getComputedStyle(root);
    const result = {};

    vars.forEach((variable) => {
      const value = styles.getPropertyValue(variable)?.trim();
      result[toCamelCase(variable)] = value || ""
    });
    return result;
  }, [vars]);
}
