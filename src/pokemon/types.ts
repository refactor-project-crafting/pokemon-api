export interface Pokemon {
  id: string;
  name: string;
  type: string;
  gender: "F" | "M";
  skills: string[];
  isShiny: boolean;
}
