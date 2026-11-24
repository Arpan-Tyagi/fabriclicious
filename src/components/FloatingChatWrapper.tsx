"use client";

import dynamic from "next/dynamic";

const DynamicFloatingChat = dynamic(
  () => import("@/components/FloatingChat").then((mod) => mod.FloatingChat),
  { ssr: false }
);

export function FloatingChatWrapper() {
  return <DynamicFloatingChat />;
}
