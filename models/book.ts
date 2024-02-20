export interface IBook {
  id: string;
  title?: string;
  authorId?: string;
  author?: {
    id: string;
    name?: string;
  };
}
