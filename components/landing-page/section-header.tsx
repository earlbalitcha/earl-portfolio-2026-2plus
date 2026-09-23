import {cn} from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 text-start md:mb-14", className)}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight text-foreground md:text-4xl lg:text-[2.65rem]">
        <span className="text-foreground">{title}</span>{" "}
        <span className="gradient-text">{titleAccent}</span>
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
      <div className="gradient-rule mt-6" aria-hidden />
    </div>
  );
}
