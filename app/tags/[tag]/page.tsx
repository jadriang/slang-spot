import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for demonstration purposes
const slangTerms = [
  { 
    id: 1, 
    term: "YOLO", 
    meaning: "You Only Live Once", 
    category: "chat",
    tags: ["lifestyle", "motivation", "acronym"],
  },
  { 
    id: 2, 
    term: "FOMO", 
    meaning: "Fear Of Missing Out", 
    category: "chat",
    tags: ["social", "anxiety", "acronym"],
  },
  { 
    id: 3, 
    term: "TIL", 
    meaning: "Today I Learned", 
    category: "internet",
    tags: ["learning", "acronym", "reddit"],
  },
  // ... other slang terms ...
]

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const filteredSlangs = slangTerms.filter(slang => slang.tags.includes(tag))

  if (filteredSlangs.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Slang Terms Tagged with "{tag}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlangs.map(slang => (
          <Link href={`/slang/${slang.id}`} key={slang.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{slang.term}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{slang.meaning}</p>
                <p className="text-sm text-gray-500 mt-2">Category: {slang.category}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

