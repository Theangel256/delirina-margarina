export const personalInfo = {
  name: "Delirina Margarina",
  location: "Hermosillo, Sonora",
  email: "delirinaventashmo@gmail.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/",
};
export type ImageItem = {
  title: string;
  url: string | ImageMetadata;
};
import ad1 from "../assets/images/ad1.jpg";
import ad2 from "../assets/images/ad2.jpg";
import ad3 from "../assets/images/ad3.jpg";
import ad4 from "../assets/images/ad4.jpg";

export const images: ImageItem[] = [
  { title: "Mantequilla", url: ad1 },
  { title: "Presentaciones", url: ad2 },
  { title: "Pay de Fresa", url: ad3 },
  { title: "Pancakes", url: ad4 },
  // ...
];