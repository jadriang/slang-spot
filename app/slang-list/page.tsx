'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSearchParams } from 'next/navigation'

// Mock data for demonstration purposes
const slangTerms = [
  { id: 1, term: "YOLO", meaning: "You Only Live Once", category: "chat", tags: ["lifestyle", "motivation", "acronym"] },
  { id: 2, term: "FOMO", meaning: "Fear Of Missing Out", category: "chat", tags: ["social", "anxiety", "acronym"] },
  { id: 3, term: "ROI", meaning: "Return On Investment", category: "real estate", tags: ["business", "finance"] },
  { id: 4, term: "API", meaning: "Application Programming Interface", category: "engineering", tags: ["technology", "programming"] },
  { id: 5, term: "TBH", meaning: "To Be Honest", category: "chat", tags: ["honesty", "acronym"] },
  { id: 6, term: "Sus", meaning: "Suspicious", category: "chat", tags: ["gaming", "among us"] },
]

const categories = ["All", "chat", "real estate", "engineering"]

export default function SlangList() {
  const searchParams = useSearchParams()
  const initialSearchTerm = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredSlang = slangTerms.filter(slang => 
    slang.term.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || slang.category === selectedCategory)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Slang List</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Search Slang Terms</h2>
        <Input
          type="text"
          placeholder="Search slang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlang.map(slang => (
          <Link href={`/slang/${slang.id}`} key={slang.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{slang.term}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{slang.meaning}</p>
                <p className="text-sm text-gray-500 mt-2">Category: {slang.category}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {slang.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

