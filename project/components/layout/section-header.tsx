import { type ReactNode } from 'react';

interface SectionHeaderProps {
  index?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  index,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      }`}
    >
      {index && (
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {index}
        </span>
      )}
      <h2 className="text-balance font-display text-headline font-medium tracking-tightest">
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-xl text-pretty text-base text-muted-foreground ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
