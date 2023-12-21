import { ReactNode } from "react";
import Link from "next/link";

import { classNames } from "@/app/utils";

interface ButtonInnerProps {
  arrow?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

interface ButtonArrowProps {
  size?: number;
  disabled?: boolean;
  className?: string;
}

type ButtonProps = {
  className?: string;
  arrow?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<"button">)
);

const ButtonArrow = ({ size = 18, disabled, className }: ButtonArrowProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("octicon arrow-symbol", className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
      ></path>
      <path
        stroke="currentColor"
        d="M1.75 8H11"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={disabled ? "opacity-0" : ""}
      ></path>
    </svg>
  );
};

const ButtonLoadingState = () => {
  return (
    <div className={classNames("absolute ")}>
      <svg
        className="pointer-events-none h-5 w-5 animate-spin"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fillOpacity="0"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

const ButtonInner = ({
  arrow = false,
  isLoading,
  disabled,
  children,
}: ButtonInnerProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center transition-all duration-200 ease-in-out">
      <span
        className={`absolute inset-0 h-9 rounded-full bg-gradient-to-b from-white/60 to-white opacity-20 transition-opacity ${
          disabled ? "to-primary" : "to-white group-hover:opacity-5"
        }`}
      />
      <span
        className={`opacity-7.5 absolute inset-0 rounded-full shadow-[inset_0_1px_1px_gray] transition-opacity ${
          disabled ? "to-primary" : "group-hover:opacity-10"
        }`}
      />
      <div className="mr-2 w-10 text-center transition duration-75 ease-in-out hover:mr-0">
        {isLoading ? (
          <div className="flex items-center pr-3">
            <ButtonLoadingState />
          </div>
        ) : (
          <p className={`flex items-center ${disabled && "opacity-50"}`}>
            {children}{" "}
            {arrow ? (
              <ButtonArrow disabled={disabled} className="-mr-1 ml-1" />
            ) : null}
          </p>
        )}
      </div>
    </div>
  );
};

const Button = ({
  className,
  arrow,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return typeof props.href === "undefined" ? (
    <button
      disabled={disabled || isLoading}
      className={classNames(
        "group link relative isolate flex h-9 w-9 flex-none items-center justify-center rounded-full py-1.5 text-[0.8125rem]/6 font-semibold text-white transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-opacity-50",
        arrow ? "pl-2.5 pr-[calc(9/16*1rem)]" : "px-2.5",
        className,
      )}
      {...props}
    >
      <ButtonInner isLoading={isLoading} arrow={arrow} disabled={disabled}>
        {children}
      </ButtonInner>
    </button>
  ) : (
    <Link className={className} {...props}>
      <ButtonInner isLoading={isLoading} arrow={arrow} disabled={disabled}>
        {children}
      </ButtonInner>
    </Link>
  );
};

export default Button;
