import { Heart, ShoppingBag, User } from 'lucide-react';

const links = ['Home', 'Catalog',
    'Bouquets', 'Delivery', 'About', 'Contact'];

export default function Header() {
    return (
        <header className="bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <a href="/" className="font-serif text-3xl text-rose">
                    Bloom & Petal
                </a>

                <nav className='hidden gap-10 md:flex'>
                    {links.map((link) => (
                        <a key={link}
                        href='#'
                        className={`${link === 'Home' ? 'text-rose' : 'text-stone-700'} transition-colors hover:text-rose`}
                        >
                            {link}
                        </a>
                    ))}
                </nav>

                <div className='flex items-center gap-6 text-stone-800'>
                    <button aria-lable='Профиль'>
                        <User />
                    </button>
                    <button aria-lable='Избранное'>
                        <Heart />
                    </button>
                    <button aria-lable='Корзина' className='relative'>
                        <ShoppingBag />
                        <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose text-xs text-white'>
                            0
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}
