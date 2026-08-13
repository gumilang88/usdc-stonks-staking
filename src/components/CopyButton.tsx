"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="px-btn bg-[#3ddad8] text-[#20102e] px-4 py-2 text-[13px] hover:bg-[#60e7e5]"
    >
      {copied ? "COPIED!" : "COPY"}
    </button>
  );
}