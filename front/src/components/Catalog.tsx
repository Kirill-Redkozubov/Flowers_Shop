import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Bouquet, BouquetPage } from "../types";
import BouquetCard from "./BouquetCard";
import Pagination from "./Pagination";

const PER_PAGE = 60;

export default function Catalog() {
    const [bouquets, setBouquets] = useState<Bouquet[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadBouquets() {
            setIsLoading(true);
            setError(null);
            try {
                const offset = (page - 1) * PER_PAGE;
                const response = await fetch(
                    `http://127.0.0.1:8001/api/bouquets?offset=${offset}&limit=${PER_PAGE}`
                );
                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }
                const data: BouquetPage = await response.json();
                if (!ignore) {
                    setBouquets(data.items);
                    setTotal(data.total);
                }
            } catch (err) {
                console.error(err);
                if (!ignore) {
                    setError("Не удалось загрузить букеты. Попробуйте позже.");
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadBouquets();

        return () => {
            ignore = true;
        };
    }, [page]);

    const totalPages = Math.ceil(total / PER_PAGE);

    function changePage(newPage: number) {
        setPage(newPage);
        document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section id="catalog" className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-10 flex items-center justify-between">
                <h2 className="font-serif text-3xl text-stone-800">Популярные букеты</h2>
                <a
                    href="#"
                    className="flex items-center gap-2 text-stone-600 transition-colors hover:text-rose"
                >
                    Смотреть весь каталог
                    <ArrowRight size={18} />
                </a>
            </div>

            {error && <p className="text-rose">{error}</p>}

            <div
                className={`grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-4 ${
                    isLoading ? "opacity-50" : ""
                }`}
            >
                {bouquets.map((bouquet) => (
                    <BouquetCard key={bouquet.id} bouquet={bouquet} />
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={changePage} />
        </section>
    );
}