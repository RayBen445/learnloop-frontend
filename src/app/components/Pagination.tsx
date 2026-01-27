'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = '' }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${basePath}?${params.toString()}`);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-8 mt-12 pt-8 border-t border-gray-200">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="text-sm text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>
      
      <span className="text-xs text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="text-sm text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
}
