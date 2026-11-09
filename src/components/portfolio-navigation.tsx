"use client";

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

const ProjectSelectionContext = createContext<[number, Dispatch<SetStateAction<number>>] | null>(null);

/* The layout survives route changes, so returning to the project browser keeps
   the matching title and image available for the reverse shared transition. */
export function PortfolioNavigation({ children }: { children: ReactNode }) {
  const selection = useState(0);
  return <ProjectSelectionContext.Provider value={selection}>{children}</ProjectSelectionContext.Provider>;
}

export function useProjectSelection() {
  const selection = useContext(ProjectSelectionContext);
  if (!selection) throw new Error("Project selection requires PortfolioNavigation");
  return selection;
}
