

export interface Bouquet {
    id: number;
    name: string;
    price: number | null;
    oldPrice: number | null;
    discountSum: number | null;
    photo: string | null;
    link: string | null;
}

export interface BouquetPage {
    items: Bouquet[];
    total: number;
}