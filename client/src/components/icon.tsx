import { cn } from "@/lib/utils";

interface Props {
  paths: string[];
  className?: string;
}

function Icon({ paths, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={cn(className)}
      viewBox="0 0 16 16"
    >
      {paths.map((path, i) => (
        <path d={path} key={i} />
      ))}
    </svg>
  );
}
export default Icon;
