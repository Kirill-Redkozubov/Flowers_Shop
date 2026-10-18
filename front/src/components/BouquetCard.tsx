import { ShoppingCart } from "lucide-react";
import type { Bouquet } from "../types";

interface BouquetCardProps {
    bouquet: Bouquet;
}

function formatPrice(value: number) {
    return `${value.toLocaleString("ru-RU")} ₽`;
}

export default function BouquetCard({ bouquet }: BouquetCardProps) {
    return (
        <article className="overflow-hidden rounded-lg bg-white shadow-sm">
            {bouquet.photo ? (
                <img
                    src={bouquet.photo}
                    alt={bouquet.name}
                    loading='lazy'
                    className="aspect-4/3 w-full object-cover"
                />
            ) : (
                <div className="aspect-4/3 w-full bg-blush" />
            )}

            <div className="p-4">
                <h3 className="font-serif text-lg text-stone-800">{bouquet.name}</h3>

                <div className="mt-3 flex items-center justify-between">
                    <div>
            <span className="text-lg text-stone-800">
              {bouquet.price !== null ? formatPrice(bouquet.price) : "Цена по запросу"}
            </span>
                        {bouquet.oldPrice !== null && (
                            <span className="ml-2 text-sm text-stone-400 line-through">
                {formatPrice(bouquet.oldPrice)}
              </span>
                        )}
                    </div>

                    <button className="flex items-center gap-2 rounded-md bg-sage px-3 py-2 text-sm text-white transition-colors hover:bg-sage/90">
                        <ShoppingCart size={16} />В корзину
                    </button>
                </div>
            </div>
        </article>
    );
}