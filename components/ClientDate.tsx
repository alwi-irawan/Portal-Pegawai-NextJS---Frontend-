"use client";

import { useEffect, useState } from "react";

interface Props {
  iso?: string | null;
  locale?: string;
  fallback?: string;
}

export default function ClientDate({
  iso,
  locale = "id-ID",
  fallback = "-",
}: Props) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    if (!iso) {
      setFormatted(fallback);
      return;
    }

    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) {
        setFormatted(fallback);
      } else {
        setFormatted(d.toLocaleDateString(locale));
      }
    } catch (e) {
      setFormatted(fallback);
    }
  }, [iso, locale, fallback]);

  return <>{formatted}</>;
}
