import { useCallback, useEffect, useState } from "react";
import { TavernContext } from "./TavernContext";
import type { TavernContextProviderType, UserType } from "../types/types";
import { API_URL } from "../config/api";

export const TavernContextProvider = ({
  children,
}: TavernContextProviderType) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refetchUser = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const res: Response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data: UserType = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Auth fetch failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchUser();
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
