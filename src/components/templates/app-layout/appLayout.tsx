import { LayoutSidebarNav } from '../../organisam/main-navbar/navbar'

type ApplicantLayoutProps = {
    children: React.ReactNode;
};

export default function ApplicantLayout({ children }: ApplicantLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen text-gray-900 bg-gray-100">
            <LayoutSidebarNav />
            <div className="py-5 px-5 ">
                <>{children}</>
            </div>
        </div>
    )
}