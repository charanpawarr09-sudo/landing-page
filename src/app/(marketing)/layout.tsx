import { SmoothScroll } from "@/components/landing-page/SmoothScroll";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}<SmoothScroll /></>;
}
