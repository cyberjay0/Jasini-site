import { notFound } from "next/navigation";
import { Opening } from "@/components/opening/opening";
import { parseTheme, type Variant } from "@/lib/opening-data";

const variants: Variant[] = ["a", "b", "c"];

export default async function OpeningPage({
  params,
  searchParams,
}: {
  params: Promise<{ variant: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { variant } = await params;
  const { theme } = await searchParams;
  if (!variants.includes(variant as Variant)) notFound();
  return <Opening variant={variant as Variant} theme={parseTheme(theme)} />;
}
