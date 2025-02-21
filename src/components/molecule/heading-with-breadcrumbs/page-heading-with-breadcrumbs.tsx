
type PageHeadingWithBreadcrumbsProps = {
    title: string;
    SubTitle?: string | null; 
    homeElement?: React.ReactNode;
    children?: React.ReactNode;
    hasRightSideContent?: boolean;
};

export default function PageHeadingWithBreadcrumbs({
    title,
    SubTitle = null,
    children,
    hasRightSideContent = false,
}: PageHeadingWithBreadcrumbsProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
                <h3>{title}</h3>
                <div className="flex flex-col gap-1 font-bold text-md text-neutral-500">
                    {SubTitle && <div>{SubTitle}</div>} 
                </div>
            </div>
            {hasRightSideContent && (
                <div className="flex gap-2 items-center">
                    {/* Right side content, if any */}
                    {children}
                </div>
            )}
        </div>
    )
}