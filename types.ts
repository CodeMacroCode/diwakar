export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  subtitle: string;
}

declare global {
  interface Window {
    confetti: any;
  }
}