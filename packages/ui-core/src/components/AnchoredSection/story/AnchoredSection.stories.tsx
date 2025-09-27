import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import AnchoredSection from "../AnchoredSection";
import { useCollapsibleToggle } from "../useCollapsibleToggle"; // adjust path as needed

// --- Component Implementation ---
const WithToggleHook = () => {
  const buttonRefs = {
    A: useRef<HTMLButtonElement>(null),
    B: useRef<HTMLButtonElement>(null),
    C: useRef<HTMLButtonElement>(null),
  };

  const { isVisible, anchorRef, containerRef, toggleWithAnchor, hide } =
    useCollapsibleToggle<HTMLButtonElement>();

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <div className="flex gap-4 justify-between">
        {(["A", "B", "C"] as const).map((key) => (
          <button
            key={key}
            ref={buttonRefs[key]}
            onClick={() => toggleWithAnchor(buttonRefs[key])}
            className="px-4 py-2 rounded text-white bg-blue-500"
          >
            {key}
          </button>
        ))}
      </div>

      <div ref={containerRef}>
        <AnchoredSection
          show={isVisible}
          anchorRef={anchorRef}
          backgroundColorClass="bg-gray-200"
          triangleColorClass="border-b-gray-200"
        >
          <div>
            <p className="text-sm">
              This section is aligned with the selected button and can be
              toggled using the hook.
            </p>
            <button
              onClick={hide}
              className="mt-2 text-sm text-red-500 underline"
            >
              Close
            </button>
          </div>
        </AnchoredSection>
      </div>
      <p>pleceholder texts</p>
    </div>
  );
};

// --- Storybook Setup ---
export default {
  title: "Components/Collapsible/WithToggleHook",
  component: WithToggleHook,
} satisfies Meta<typeof WithToggleHook>;

type Story = StoryObj<typeof WithToggleHook>;

export const Default: Story = {
  render: () => <WithToggleHook />,
};
