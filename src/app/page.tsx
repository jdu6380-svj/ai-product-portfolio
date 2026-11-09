import { FiveScreenPortfolio } from "@/components/portfolio-variants";
import { ViewTransition } from "react";
import { ProjectTransitionFallback } from "@/components/project-transition-fallback";

export default function Home() {
  return <ViewTransition
    enter={{ "project-back": "project-content-return", default: "none" }}
    exit={{ "project-open": "project-content-out", default: "none" }}
    default="none"
  ><><ProjectTransitionFallback page="home" /><main id="main-content"><FiveScreenPortfolio /></main></></ViewTransition>;
}
