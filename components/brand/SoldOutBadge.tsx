import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SoldOutBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "shrink-0 border-red-200 bg-red-50 text-[10px] font-bold uppercase tracking-[0.08em] text-red-700",
        className
      )}
    >
      Sold out
    </Badge>
  );
}
