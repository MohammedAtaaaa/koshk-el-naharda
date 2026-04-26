"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KoshkHeader from "@/components/koshk/KoshkHeader";
import KoshkFooter from "@/components/koshk/KoshkFooter";
import KoshkSection from "@/components/koshk/KoshkSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { LogIn, UserPlus, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("اكتب الإيميل والباسورد");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("أهلاً بيك في الكشك!");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("تم التسجيل! ابعتنالك إيميل تأكيد");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "حصلت مشكلة... جرب تاني";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink() {
    if (!email) {
      toast.error("اكتب الإيميل الأول");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      toast.success("ابعتنالك لينك على الإيميل! افتحه وهتدخل على طول");
    } catch {
      toast.error("حصلت مشكلة... جرب تاني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <KoshkHeader />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8">
        <KoshkSection
          title={mode === "login" ? "دخول الكشك" : "حساب جديد"}
          icon="🔑"
          color="#8B6914"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="text-[var(--color-koshk-brown)] font-semibold mb-1 block"
              >
                الإيميل
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="bg-white/50 border-[var(--color-koshk-wood)]/30"
                dir="ltr"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-[var(--color-koshk-brown)] font-semibold mb-1 block"
              >
                الباسورد
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/50 border-[var(--color-koshk-wood)]/30"
                dir="ltr"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-koshk-orange)] hover:bg-[var(--color-koshk-red)] text-white font-bold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  مستني...
                </span>
              ) : mode === "login" ? (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  دخول
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  تسجيل
                </span>
              )}
            </Button>
          </form>

          <Separator className="my-4" />

          <Button
            type="button"
            variant="outline"
            onClick={handleMagicLink}
            disabled={loading}
            className="w-full border-[var(--color-koshk-wood)]/30 text-[var(--color-koshk-brown)]"
          >
            <Mail className="w-4 h-4 ml-2" />
            دخول بلينك على الإيميل (بدون باسورد)
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() =>
                setMode(mode === "login" ? "signup" : "login")
              }
              className="text-sm text-[var(--color-koshk-orange)] hover:underline"
            >
              {mode === "login"
                ? "معندكش حساب؟ سجل دلوقتي"
                : "عندك حساب؟ ادخل"}
            </button>
          </div>
        </KoshkSection>
      </main>

      <KoshkFooter />
    </div>
  );
}
