type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Review = {
  id: string;
  user: User;
  rating: number;
  date: string;
  comment: string;
}
