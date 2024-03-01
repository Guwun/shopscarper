import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/search.svg', alt:'search'},
  { src: '/assets/icons/black-heart.svg', alt:'heart'},
  { src: '/assets/icons/user.svg', alt:'user'},
]

const navbar = () => {
  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="nav-logo">
            price<span className='text-primary'></span>
          </p>
        </Link>  

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
             <Image
               key={icon.alt}
               src={icon.src}
               alt={icon.alt}
               width={28}
               height={28}
               className="object-contain"
              /> 
          ))}
        </div>
      </nav>
    </header>
  )
}

export default navbar