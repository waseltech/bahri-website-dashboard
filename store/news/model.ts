export interface News {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  images?: string[];
}

export interface UpdateNews {
  id: string;
  news: Partial<News>;
}
