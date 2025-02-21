export function LayoutFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center py-4 text-sm border-t text-slate-600 border-t-slate-300">
      {`© ${currentYear} Expense Tracker. All rights reserved.`}
    </div>
  );
}