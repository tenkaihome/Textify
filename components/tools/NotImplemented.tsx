import React from "react";
import { Construction } from "lucide-react";

export default function NotImplemented() {
  return (
    <div className="flex flex-col items-center justify-center p-12 h-full min-h-[400px] text-gray-500 text-center">
      <Construction className="w-16 h-16 mb-6 text-yellow-600/50" />
      <h2 className="text-xl font-medium text-gray-300">Tool Under Construction</h2>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">
        We are working hard to build out this tool. Check back soon for updates!
      </p>
    </div>
  );
}
