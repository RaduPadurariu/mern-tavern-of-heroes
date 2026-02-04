import { useCallback, useEffect, useState } from "react";
import { TavernContext } from "./TavernContext";
import type { TavernContextProviderType, UserType } from "../types/types";

export const TavernContextProvider = ({
  children,
}: TavernContextProviderType) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchUser = useCallback(async () => {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) {
      setUser(null);
      return;
    }

    const data = await res.json();
    setUser(data);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.status === 401) {
          // not logged in → normal case
          setUser(null);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data: UserType = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <TavernContext.Provider value={{ user, setUser, isLoading, refetchUser }}>
      {children}
    </TavernContext.Provider>
  );
};
