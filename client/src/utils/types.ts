export interface IForm {
  name: string;
  description: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  duration: number;
  price: number;
  video: string;
}
