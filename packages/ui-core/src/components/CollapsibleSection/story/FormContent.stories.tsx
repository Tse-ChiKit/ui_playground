import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CollapsibleSection from "../CollapsibleSection";

// --- Component Implementation ---
const FormContent = () => {
  const [show, setShow] = useState(false);
  const [formResult, setFormResult] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [anchorRef, setAnchorRef] = useState<React.RefObject<HTMLElement>>();

  const buttonRefs = {
    A: useRef<HTMLButtonElement>(null),
    B: useRef<HTMLButtonElement>(null),
    C: useRef<HTMLButtonElement>(null),
  };

  const handleClick = (key: keyof typeof buttonRefs) => {
    setAnchorRef(buttonRefs[key]);
    setShow(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
    };
    setFormResult(result);
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block font-medium">Name</label>
        <input name="name" className="border p-1 w-full rounded" required />
      </div>
      <div>
        <label className="block font-medium">Email</label>
        <input
          name="email"
          type="email"
          className="border p-1 w-full rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
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
      <CollapsibleSection show={show} anchorRef={anchorRef}>
        {form}
      </CollapsibleSection>
      {formResult && (
        <div className="bg-gray-100 p-4 rounded border border-gray-300">
          <h3 className="font-semibold mb-2">Form Result:</h3>
          <p>
            <strong>Name:</strong> {formResult.name}
          </p>
          <p>
            <strong>Email:</strong> {formResult.email}
          </p>
        </div>
      )}
    </div>
  );
};

// --- Storybook Setup ---

export default {
  title: "Components/Collapsible/FormContent",
  component: FormContent,
} satisfies Meta<typeof FormContent>;

type Story = StoryObj<typeof FormContent>;

export const Default: Story = {
  render: () => <FormContent />,
};
