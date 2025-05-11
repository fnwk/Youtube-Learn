import { useTranslation as useI18Translation } from "react-i18next";

/** Typing for using namespaces in translations */
export const useT = useI18Translation<"common" | "welcome" | "home">;
