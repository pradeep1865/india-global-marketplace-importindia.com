export type ThemeId = "white" | "trade" | "midnight" | "saffron" | "harbor";

export type ThemeProfile = {
  id: ThemeId;
  name: string;
  description: string;
  swatch: string;
};

export const defaultThemeId: ThemeId = "trade";

export const themes: ThemeProfile[] = [
  {
    id: "trade",
    name: "Trade Lanes",
    description: "Global ports, cargo, and export energy.",
    swatch: "from-[#0b1f4d] via-[#126a8a] to-[#ff9f1c]"
  },
  {
    id: "midnight",
    name: "Midnight Grid",
    description: "Deep premium operations desk.",
    swatch: "from-[#070b1f] via-[#12335c] to-[#26c6da]"
  },
  {
    id: "saffron",
    name: "Saffron Circuit",
    description: "Bright India export-tech palette.",
    swatch: "from-[#fff4df] via-[#ffcc74] to-[#1b4d89]"
  },
  {
    id: "harbor",
    name: "Harbor Glass",
    description: "Cool blue supply-chain clarity.",
    swatch: "from-[#e8f7ff] via-[#9bd7e9] to-[#1f6f8b]"
  },
  {
    id: "white",
    name: "Classic White",
    description: "Clean neutral marketplace mode.",
    swatch: "from-white via-slate-100 to-slate-200"
  }
];

export function isThemeId(value: string | null): value is ThemeId {
  return Boolean(value && themes.some((theme) => theme.id === value));
}
