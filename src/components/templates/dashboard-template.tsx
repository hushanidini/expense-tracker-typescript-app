import React, { Suspense } from "react";
import PageHeadingWithBreadcrumbs from "@/components/molecule/heading-with-breadcrumbs/page-heading-with-breadcrumbs";

type DashboardPageTemplateProps = {
    title: string;
    subTitle?: string;
    children: React.ReactNode;
    rightSideContent?: React.ReactNode;
    hasRightSideContent?: boolean;
    className?: string;
};

export default function DashboardPageTemplate({
    title,
    subTitle,
    children,
    className,
    rightSideContent,
    hasRightSideContent = false }: DashboardPageTemplateProps) {
    return (
        <div className={`p-6 max-w-[1800px] mx-auto ${className}`}>
            <Suspense>
                <PageHeadingWithBreadcrumbs
                    title={title}
                    SubTitle={subTitle}
                    hasRightSideContent={hasRightSideContent}
                >
                    {rightSideContent && rightSideContent}
                </PageHeadingWithBreadcrumbs>
            </Suspense>
            <main className="py-8">{children}</main>
        </div>
    )
}

