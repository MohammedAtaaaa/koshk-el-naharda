const ARABIC_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const ARABIC_DAYS = [
  "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت",
];

function toArabicNumerals(num: number): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((d) => arabicDigits[parseInt(d)] || d)
    .join("");
}

export function getArabicDate(date: Date = new Date()): string {
  const day = ARABIC_DAYS[date.getDay()];
  const dayNum = toArabicNumerals(date.getDate());
  const month = ARABIC_MONTHS[date.getMonth()];
  const year = toArabicNumerals(date.getFullYear());
  return `${day}، ${dayNum} ${month} ${year}`;
}

export function getCairoDate(): string {
  const now = new Date();
  const cairoTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Cairo" })
  );
  return cairoTime.toISOString().split("T")[0];
}

export function getCairoDateFormatted(): string {
  const now = new Date();
  const cairoTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Cairo" })
  );
  return getArabicDate(cairoTime);
}
