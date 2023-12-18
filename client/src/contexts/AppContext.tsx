"use client";

import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

type AppContextProviderProps = {
  children?: React.ReactNode;
};

type AppContext = {
  sidePanelOpen: boolean;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<AppContext>({
  sidePanelOpen: false,
  setSidePanelOpen: () => null,
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({ sidePanelOpen, setSidePanelOpen }),
    [sidePanelOpen]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAppContext = () => useContext(Context);
