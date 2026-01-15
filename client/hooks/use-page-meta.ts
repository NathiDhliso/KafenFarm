import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  keywords?: string;
}

export function usePageMeta({ title, description, keywords }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (el) {
        el.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    setMeta("description", description);

    if (keywords) {
      setMeta("keywords", keywords);
    }
  }, [title, description, keywords]);
}
