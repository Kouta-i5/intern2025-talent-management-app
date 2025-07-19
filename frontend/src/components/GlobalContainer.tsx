"use client";
// GlobalContainer.tsx
import { Container } from "@mui/material";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { GlobalHeader } from "../components/GlobalHeader";
import { GlobalFooter } from "../components/GlobalFooter";
import { useEffect, useState } from "react";

export function GlobalContainer({ children }: { children?: React.ReactNode }) {
  const [title, setTitle] = useState("Talenza");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setTitle(document.title);
    }
  }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header>
        <GlobalHeader title={title} />
      </header>

      <VerticalSpacer height={32} />

      <main>{children}</main>

      <footer>
        <GlobalFooter />
      </footer>
    </Container>
  );
}
