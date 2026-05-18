export type LanguageProfile = {
  language: string;
  languageCode: string;
  nativeName: string;
  searchPlaceholder: string;
  deliveryPrefix: string;
  direction: "ltr" | "rtl";
};

export const languageProfiles: LanguageProfile[] = [
  {
    language: "English",
    languageCode: "en",
    nativeName: "English",
    searchPlaceholder: "Search products, manufacturers, MOQ, tags, country...",
    deliveryPrefix: "Delivery",
    direction: "ltr"
  },
  {
    language: "Hindi",
    languageCode: "hi-IN",
    nativeName: "हिन्दी",
    searchPlaceholder: "उत्पाद, निर्माता, MOQ, टैग, देश खोजें...",
    deliveryPrefix: "डिलीवरी",
    direction: "ltr"
  },
  {
    language: "Arabic",
    languageCode: "ar",
    nativeName: "العربية",
    searchPlaceholder: "ابحث عن المنتجات والمصنعين والحد الأدنى والبلد...",
    deliveryPrefix: "التوصيل",
    direction: "rtl"
  },
  {
    language: "French",
    languageCode: "fr",
    nativeName: "Français",
    searchPlaceholder: "Rechercher produits, fabricants, MOQ, tags, pays...",
    deliveryPrefix: "Livraison",
    direction: "ltr"
  },
  {
    language: "German",
    languageCode: "de",
    nativeName: "Deutsch",
    searchPlaceholder: "Produkte, Hersteller, MOQ, Tags, Land suchen...",
    deliveryPrefix: "Lieferung",
    direction: "ltr"
  },
  {
    language: "Spanish",
    languageCode: "es",
    nativeName: "Español",
    searchPlaceholder: "Buscar productos, fabricantes, MOQ, etiquetas, país...",
    deliveryPrefix: "Entrega",
    direction: "ltr"
  }
];

export const defaultLanguageProfile = languageProfiles[0];

export function getLanguageProfile(languageCode?: string | null) {
  return languageProfiles.find((profile) => profile.languageCode === languageCode) ?? defaultLanguageProfile;
}
