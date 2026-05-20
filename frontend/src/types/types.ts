export type PostType = {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  likedBy: string[];
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

export type UpdateUserPayloadType = {
  nickname?: string | null;
  gender?: string | null;
  heroClass?: string | null;
};

// Context

export type TavernContextType = {
  user: UserType | null;
  setUser: (value: UserType | null) => void;
  isLoading: boolean;
  refetchUser: () => Promise<UserType | null>;
};

export type TavernContextProviderType = {
  children: React.ReactNode;
};

// Action Response Types
export type AuthActionResponseType = {
  ok?: boolean;
  message?: string;
  status?: number;
};
// specific login
export type LoginActionResponseType = AuthActionResponseType & {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};
// specific signup
export type SignUpActionResponseType = AuthActionResponseType & {
  fieldErrors?: {
    email?: string[];
    password?: string[];
    username?: string[];
  };
};
