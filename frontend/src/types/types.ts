export type PostType = {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  nickname: string;
  gender: string;
  heroClass: string;
  avatar: string;
};

export type PaginationProps<T> = {
  itemsPerPage: number;
  values: T[];
  renderItem: (item: T) => React.ReactNode;
};

export type UserPageType = {
  user: UserType;
  posts: PostType[];
};

export type UpdateUserPayload = {
  nickname?: string | null;
  gender?: string | null;
  heroClass?: string | null;
};

// Context

export type TavernContextType = {
  user: UserType | null;
  setUser: (value: UserType | null) => void;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
};

export type TavernContextProviderType = {
  children: React.ReactNode;
};
