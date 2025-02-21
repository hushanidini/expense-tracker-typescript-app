import { LoaderIcon } from "lucide-react";

type LoaderProps = {
  background?: boolean;
  loadingText?: string | React.ReactNode;
};

export function Loader({
  background,
  loadingText = "Loading...",
}: LoaderProps) {
  if (background) {
    return (
      <div className="bg-slate-500 flex h-screen flex-col items-center justify-center">
        <LoaderIcon className="animate-spin" color="white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-sky-500 animate-bounce animate-infinite">
        <svg
          width="40"
          height="40"
          viewBox="0 0 37 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.0832 8.84036L22.0286 23.5486C20.9883 24.9328 21.1173 26.8699 22.3321 28.1039L25.226 31.0435C27.7236 33.7378 32.2149 32.5031 32.9901 28.9087L36.949 10.5575C37.2567 9.12621 36.0888 7.80845 34.6336 7.94834C34.0122 8.00713 33.4495 8.33353 33.0852 8.84036H33.0832Z"
            fill="#ffffff"
          />
          <path
            d="M6.0446 29.5453C5.91709 29.154 5.78755 28.7627 5.66004 28.3715C5.33417 27.3781 5.01033 26.3867 4.68446 25.3933C4.25132 24.0695 3.81616 22.7457 3.38302 21.4218L0.867178 13.7464C0.640489 13.0511 0.417847 12.3557 0.185086 11.6624C-0.102323 10.8048 -0.0881552 9.87428 0.482616 9.12621C0.85301 8.63965 1.40152 8.31325 1.97634 8.10647C2.73332 7.83481 3.56923 7.76183 4.3586 7.92807C5.2269 8.11052 5.85637 8.61127 6.4919 9.20324C7.03636 9.71007 7.4614 10.3142 7.98562 10.8352C8.65355 11.4982 9.4591 12.0151 10.3395 12.3415C12.0842 12.9923 14.0658 12.8808 15.7214 12.0273C16.2233 11.7678 16.6909 11.4454 17.1119 11.0684C17.1119 11.0684 21.1012 7.50436 21.1032 7.50436L28.1974 1.23186C28.7419 0.749359 29.432 0.5 30.1283 0.5C30.5979 0.5 31.0715 0.615557 31.5067 0.84667C33.0975 1.70422 33.5367 3.7883 32.4256 5.2135L12.5923 30.6887C10.7403 33.0687 6.98576 32.4139 6.04662 29.5453H6.0446Z"
            fill="#ffffff"
          />
          <path
            d="M12.8228 9.95537C14.712 9.95537 16.2434 8.42143 16.2434 6.52922C16.2434 4.63701 14.712 3.10307 12.8228 3.10307C10.9337 3.10307 9.40224 4.63701 9.40224 6.52922C9.40224 8.42143 10.9337 9.95537 12.8228 9.95537Z"
            fill="#ffffff"
          />
        </svg>
      </div>
      <h2 className="text-lg tracking-wider font-bold text-slate-600 animate-pulse animate-infinite animate-ease-in">
        {loadingText}
      </h2>
    </div>
  );
}
