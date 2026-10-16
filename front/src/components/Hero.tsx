import { ArrowRight, Leaf } from "lucide-react";

const taglines = ["Свежие цветы", "С заботой", "С доставкой"];

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-blush">
            <img
                src="/hero.jpeg"
                alt="Букет свежих цветов"
                className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-linear-to-r from-blush via-blush/60 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-28">
                <div className="max-w-xl">
                    <p className="text-sm uppercase tracking-widest text-gold">
                        {taglines.join(" • ")}
                    </p>
                    <div className="mt-3 h-px w-94 bg-gold" />

                    <h1 className="mt-8 font-serif text-5xl leading-tight text-moss md:text-6xl">
                        Свежие цветы
                        <br />с доставкой
                    </h1>

                    <p className="mt-6 flex items-center gap-2 text-stone-700">
                        <Leaf size={20} className="text-gold" />
                        Доставка в день заказа
                    </p>

                    <a
                        href="#catalog"
                        className="mt-8 inline-flex items-center gap-3 rounded-md bg-rose px-6 py-3 text-white transition-colors hover:bg-rose/90"
                    >
                        Заказать букет
                        <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
}