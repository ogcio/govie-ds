import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import { Slides } from "./slides";

import "./styles/globals.css";
import "reveal.js/dist/reveal.css";
// import "reveal.js/dist/theme/white.css";
import "@ogcio-ds/theme-govie/theme.css";

export function App() {
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Reveal.Api | null>(null);

  useEffect(() => {
    if (deckRef.current) {
      return;
    }

    // See https://revealjs.com/config/
    deckRef.current = new Reveal(deckDivRef.current!, {
      disableLayout: true,
      history: true,
      transition: "slide",
      slideNumber: "c/t",
    });

    deckRef.current.initialize().then(() => {});

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
        console.error(e);
      }
    };
  }, []);

  return (
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        <Slides />
      </div>
    </div>
  );
}
