export interface Source {
  id: string;
  title: string;
  source: string;
  favicon: string;
}

export interface DataItem {
  id: string;
  category: string;
  content: string;
  sources: Source[];
}
