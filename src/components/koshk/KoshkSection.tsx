import { type ReactNode } from "react";

interface KoshkSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  color?: string;
  delay?: number;
}

export default function KoshkSection({
  title,
  icon,
  children,
  color = "var(--color-koshk-orange)",
  delay = 0,
}: KoshkSectionProps) {
  return (
    <div
      className="koshk-paper koshk-wood-border rounded-xl overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Section header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: color }}
      >
        <span className="text-xl">{icon}</span>
        <h2
          className="text-lg sm:text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-amiri)" }}
        >
          {title}
        </h2>
      </div>

      {/* Section content */}
      <div className="p-4 sm:p-5 relative z-10">{children}</div>
    </div>
  );
}
