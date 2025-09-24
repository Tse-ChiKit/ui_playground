import React, { useEffect, useRef, useState } from "react";

type CollapsibleSectionProps = {
  show: boolean;
  anchorRef?: React.RefObject<HTMLElement> | null;
  children: React.ReactNode;
  className?: string;
  backgroundColorClass?: string; // Tailwind class like "bg-white", "bg-gray-50"
  triangleColorClass?: string;
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  show,
  anchorRef,
  children,
  className = "",
  backgroundColorClass = "bg-gray-200",
  triangleColorClass = "border-b-gray-200",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triangleLeft, setTriangleLeft] = useState(0);

  useEffect(() => {
    if (!show || !anchorRef?.current || !containerRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const offset =
      anchorRect.left - containerRect.left + anchorRect.width / 2 - 8;
    setTriangleLeft(offset);
  }, [show, anchorRef?.current]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full  rounded-md p-4 mt-2 ${backgroundColorClass} ${className}`}
    >
      {/* Seamless Triangle */}
      <div
        className={`absolute -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent ${triangleColorClass}`}
        style={{ left: triangleLeft }}
      />

      {children}
    </div>
  );
};

export default CollapsibleSection;
