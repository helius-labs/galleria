import { twMerge } from "tailwind-merge";

const classNames = (...args: any[]) => twMerge(args.filter(Boolean).join(" "));

export { classNames };