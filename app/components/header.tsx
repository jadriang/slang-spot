import Link from 'next/link'
import AuthButton from './auth-button'

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Slang Explorer</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/slang-list" className="hover:underline">Slang List</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/submit" className="hover:underline">Submit Slang</Link></li>
            <li><AuthButton /></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

