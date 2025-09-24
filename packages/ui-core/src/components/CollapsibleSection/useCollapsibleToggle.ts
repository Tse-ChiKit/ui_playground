import { useRef, useState, useEffect, RefObject } from "react";

export function useCollapsibleToggle<T extends HTMLElement>() {
  const [isVisible, setIsVisible] = useState(false);
  const [anchorRef, setAnchorRef] = useState<RefObject<T> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // for outside click

  const toggleWithAnchor = (newAnchorRef: RefObject<T>) => {
    if (anchorRef?.current === newAnchorRef.current) {
      setIsVisible((prev) => !prev); // toggle
    } else {
      setAnchorRef(newAnchorRef);
      setIsVisible(true);
    }
  };

  const hide = () => setIsVisible(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !anchorRef?.current?.contains(target)
      ) {
        setIsVisible(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, anchorRef]);

  return {
    isVisible,
    anchorRef,
    containerRef,
    toggleWithAnchor,
    hide,
  };
}
