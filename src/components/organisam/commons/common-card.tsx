import React from "react";

type CommonCardProps = {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  badgeContent?: string;
  cardTitleRightSideContent?: React.ReactNode;
  className?: string;
  smallHeading?: boolean;
  borderNone?: string;
  badgeColor?: string;
};

export const CommonCard = ({
  children,
  title,
  subTitle,
  badgeContent,
  cardTitleRightSideContent,
  className,
  smallHeading,
  borderNone,
  badgeColor
}: CommonCardProps) => {
    return (
        <div className={`card w-full md:w-auto card-xs shadow-sm ${className} ${borderNone ? 'border-none' : ''}`}>
            <div className="card-body">
                {smallHeading ? (
                    <h3 className="card-title font-bold">{title}</h3>
                ) : (
                    <h2 className="card-title font-bold uppercase">{title}</h2>
                )}
                {subTitle && <h4 className="card-subtitle">{subTitle}</h4>}
                {badgeContent && <span className={`badge ${badgeColor}`}>{badgeContent}</span>}
                {cardTitleRightSideContent && <div className="card-title-right">{cardTitleRightSideContent}</div>}
                {children}
            </div>
        </div>
    )
}