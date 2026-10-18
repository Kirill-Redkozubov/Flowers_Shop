import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPageNumbers(page: number, totalPages: number): (number | "...")[] {
  const result: (number | "...")[] = [];
  let last = 0;

  for (let p = 1; p <= totalPages; p++) {
    const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
    if (!show) continue;
    if (p - last > 1) result.push("...");
    result.push(p);
    last = p;
  }

  return result;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);


  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Страницы каталога"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition-colors hover:border-rose hover:text-rose disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p, i) =>
              p === "..." ? (
                  <span key={`dots-${i}`} className="px-1 text-stone-400">
      …
    </span>
              ) : (
                  <button
                      key={p}
                      onClick={() => onChange(p)}
                      className={`h-10 w-10 rounded-md border transition-colors ${
                          p === page
                              ? "border-rose bg-rose text-white"
                              : "border-stone-200 text-stone-600 hover:border-rose hover:text-rose"
                      }`}
                  >
                    {p}
                  </button>
              )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Следующая страница"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition-colors hover:border-rose hover:text-rose disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}