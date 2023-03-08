export interface FactAndFigure {
  id: string;
  count: number;
  descriptionAr: string;
  descriptionEn: string;
}

export interface UpdateFactAndFigure {
  id: string;
  change: Partial<FactAndFigure>;
}
