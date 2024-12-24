import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SearchBar from './components/search-bar'
import { getTopVisitedSlangs } from '@/lib/firebase-utils'
import { TopVisitedSlang } from '@/types/slang'

// Mock data for demonstration purposes
const slangOfTheDay = {
  term: "YOLO",
  meaning: "You Only Live Once",
  example: "I'm going to quit my job and travel the world. YOLO!"
}

const trendingSlang = [
  { term: "TBH", meaning: "To Be Honest" },
  { term: "FOMO", meaning: "Fear Of Missing Out" },
  { term: "Sus", meaning: "Suspicious" },
]

export default async function Home() {
  const topVisitedSlang: TopVisitedSlang[] = await getTopVisitedSlangs(3)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 bg-gradient-to-r from-purple-400 to-pink-500 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">Explore the World of Slang</h1>
          <p className="text-xl text-white mb-8 text-center">Discover and learn modern slang terms and acronyms.</p>
          <SearchBar />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Slang of the Day</h2>
        <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">{slangOfTheDay.term}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">{slangOfTheDay.meaning}</p>
            <p className="italic">"{slangOfTheDay.example}"</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Top Visited Slang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topVisitedSlang.map((slang: TopVisitedSlang) => (
            <Link href={`/slang/${slang.id}`} key={slang.id}>
              <Card className="bg-secondary text-secondary-foreground hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{slang.term}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{slang.meaning}</p>
                  <p className="text-sm text-gray-500 mt-2">{slang.visits.toLocaleString()} visits</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Trending Slang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingSlang.map((slang, index) => (
            <Card key={index} className="bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>{slang.term}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{slang.meaning}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

