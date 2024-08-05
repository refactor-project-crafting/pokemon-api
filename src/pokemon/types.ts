export interface Pokemon {
  id: number;
  name: string;
  type: string;
  gender: "F" | "M";
  skills: string[];
  isShiny: boolean;
}
