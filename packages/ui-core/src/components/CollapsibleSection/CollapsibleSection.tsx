import React, { useEffect, useRef, useState } from "react";

type CollapsibleSectionProps = {
  show: boolean;
  anchorRef?: React.RefObject<HTMLElement> | null;
  children: React.ReactNode;
  className?: string; // optional styling
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  show,
  anchorRef,
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triangleLeft, setTriangleLeft] = useState(0);

  useEffect(() => {
    if (!show || !anchorRef?.current || !containerRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const offset =
      anchorRect.left - containerRect.left + anchorRect.width / 2 - 8; // 8 = half triangle
    setTriangleLeft(offset);
  }, [show, anchorRef?.current]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-white border border-gray-300 rounded-md p-4 mt-2 ${className}`}
    >
      {/* Triangle Pointer */}
      <div
        className="absolute -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"
        style={{ left: triangleLeft }}
      />
      {children}
    </div>
  );
};

export default CollapsibleSection;
