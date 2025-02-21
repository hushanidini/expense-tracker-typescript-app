import React from "react";

type EmptyViewProps = {
  title: string;
  subtitle?: string;
  illustration?: React.ReactNode;
  children?: React.ReactNode;
};

const EmptyView: React.FC<EmptyViewProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <h3 className="text-2xl font-semibold">{title}</h3>
      {subtitle && <p className=" text-gray-500 mt-1">{subtitle}</p>}
      {children}
    </div>
  );
};

export default EmptyView;
