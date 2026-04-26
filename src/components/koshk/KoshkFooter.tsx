export default function KoshkFooter() {
  return (
    <footer className="bg-gradient-to-t from-[var(--color-koshk-wood-dark)] to-[var(--color-koshk-wood)] py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="text-[var(--color-koshk-cream)] text-lg mb-1"
          style={{ fontFamily: "var(--font-amiri)" }}
        >
          كشك النهاردة
        </p>
        <p className="text-[var(--color-koshk-cream)]/60 text-xs">
          كشك رقمي مصري — بنفتح كل يوم الصبح بمحتوى جديد
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-[var(--color-koshk-cream)]/40 text-xs">
          <span>🇪🇬</span>
          <span>صنع في مصر بحب</span>
          <span>🇪🇬</span>
        </div>
      </div>
    </footer>
  );
}
