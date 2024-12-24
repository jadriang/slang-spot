'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/slang-list?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="flex items-stretch">
        <Input
          type="text"
          placeholder="Search for slang terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow text-lg py-5 px-4 rounded-l-full focus-visible:ring-primary"
        />
        <Button type="submit" size="lg" className="rounded-r-full px-6">
          <Search className="mr-2 h-5 w-5" /> Search
        </Button>
      </div>
    </form>
  )
}

