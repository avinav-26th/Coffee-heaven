// components/MenuSkeleton.js
export default function MenuSkeleton() {
  return (
    <div id="menu" className="w-full max-w-6xl mx-auto py-10 space-y-10 animate-pulse">
      <div className="h-12 bg-gray-200 rounded-md w-1/3 mx-auto"></div>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="h-[33rem] w-full md:w-[38rem] bg-gray-200 rounded-3xl"></div>
        <div className="w-full md:w-[60%] h-[33rem] bg-gray-200 rounded-3xl"></div>
      </div>
    </div>
  );
}