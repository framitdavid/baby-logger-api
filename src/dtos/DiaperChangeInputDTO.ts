export interface DiaperChangeInputDTO {
  id?: number;
  disaperType: "poop" | "pee" | "poop and pee";
  amount: "little" | "medium" | "much";
  comment?: string;
}
