import { useCallback, useEffect, useState } from "react";
import { TavernContext } from "./TavernContext";
import type { TavernContextProviderType, UserType } from "../types/types";
import { fetchMe } from "../api/fetchMe";

export const TavernContextProvider = ({
  children,
}: TavernContextProviderType) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refetchUser = useCallback(async (): Promise<UserType | null> => {
    setIsLoading(true);
    try {
      const user = await fetchMe();
      setUser(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetchUser();
  }, [refetchUser]);

  return (
    <TavernContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        refetchUser,
      }}
    >
      {children}
    </TavernContext.Provider>
  );
};
