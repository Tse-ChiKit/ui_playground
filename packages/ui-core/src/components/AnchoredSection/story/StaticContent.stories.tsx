import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import AnchoredSection from "../AnchoredSection";

// --- Component Implementation ---
const StaticContent = () => {
  const [show, setShow] = useState(false);
  const [anchorRef, setAnchorRef] = useState<React.RefObject<HTMLElement>>();

  const buttonRefs = {
    A: useRef<HTMLButtonElement>(null),
    B: useRef<HTMLButtonElement>(null),
    C: useRef<HTMLButtonElement>(null),
  };

  const handleClick = (key: keyof typeof buttonRefs) => {
    setAnchorRef(buttonRefs[key] as React.RefObject<HTMLElement>);
    setShow(true);
  };

  const content = (
    <div>
      <p>This is static content inside the CollapsibleSection.</p>
      <ul className="mt-2 list-disc pl-5 space-y-1">
        <li>✅ Feature 1</li>
        <li>✅ Feature 2</li>
        <li>✅ Feature 3</li>
      </ul>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <div className="flex gap-2 justify-between">
        <button
          ref={buttonRefs.A}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleClick("A")}
        >
          A
        </button>
        <button
          ref={buttonRefs.B}
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => handleClick("B")}
        >
          B
        </button>
        <button
          ref={buttonRefs.C}
          className="px-4 py-2 bg-purple-500 text-white rounded"
          onClick={() => handleClick("C")}
        >
          C
        </button>
      </div>

      <AnchoredSection show={show} anchorRef={anchorRef}>
        {content}
      </AnchoredSection>
    </div>
  );
};

// --- Storybook Setup ---
export default {
  title: "Components/Collapsible/StaticContent",
  component: StaticContent,
} satisfies Meta<typeof StaticContent>;

type Story = StoryObj<typeof StaticContent>;

export const Default: Story = {
  render: () => <StaticContent />,
};
