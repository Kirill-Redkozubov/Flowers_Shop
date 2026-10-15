import { User, Heart, ShoppingBag } from 'lucide-react';

interface HeaderProps {
    cartCount: number
}

const navLinks = [
    'Главная',
    'Каталог',
    'Букеты',
    'Доставка',
    'О нас',
    'Контакты'
]

function Header({ cartCount }: HeaderProps) {
    return (
        <header className='bg-white border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                <a href='/' className='font-serif text-3xl text-pink-600'>
                    Bloom & Petal
                </a>
                <nav className='flex gap-8'>
                    {navLinks.map((link) => (
                        <a key={link}
                           href='#'
                           className='text-gray-700 hover:text-pink-600 transition-colors'>
                            {link}
                        </a>
                    ))}
                </nav>
                <div className='flex items-center gap-6 text-gray-700'>
                    <button className='hover:text-pink-600 transition-colors'>
                        <User size={24} />
                    </button>
                    <button className='hover:text-pink-600 transition-colors'>
                        <Heart size={24} />
                    </button>
                    <button className='relative hover:text-pink-600 transition-colors'>
                        <ShoppingBag size={24} />
                        <span className='absolute -top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white'>
                            {cartCount}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;