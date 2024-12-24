'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Facebook, Twitter, LinkedinIcon as LinkedIn } from 'lucide-react'
import { getSlangTerm, incrementSlangVisits, updateLikes } from '@/lib/firebase-utils'
import { SlangTerm } from '@/types/slang'

export default function SlangDetail({ params }: { params: { id: string } }) {
  const [slang, setSlang] = useState<SlangTerm | null>(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchSlang = async () => {
      const fetchedSlang = await getSlangTerm(params.id)
      if (fetchedSlang) {
        setSlang(fetchedSlang)
        incrementSlangVisits(params.id)
      } else {
        notFound()
      }
    }
    fetchSlang()
  }, [params.id])

  if (!slang) {
    return <div>Loading...</div>
  }

  const handleLike = async () => {
    const incrementValue = isLiked ? -1 : 1
    await updateLikes(params.id, incrementValue)
    setSlang(prev => prev ? { ...prev, likes: prev.likes + incrementValue } : null)
    setIsLiked(!isLiked)
  }

  const handleShare = (platform: string) => {
    const url = `https://slang-explorer.com/slang/${params.id}`
    const text = `Check out the meaning of "${slang.term}" on Slang Explorer!`
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(slang.term)}&summary=${encodeURIComponent(text)}`
        break
    }

    window.open(shareUrl, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{slang.term}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4">{slang.meaning}</p>
          <p className="italic mb-4">"{slang.example}"</p>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {slang.category}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {slang.tags.map((tag: string) => (
                <Link href={`/tags/${tag}`} key={tag}>
                  <Badge variant="secondary" className="hover:bg-secondary-foreground hover:text-secondary cursor-pointer transition-colors">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
            >
              <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              Like ({slang.likes})
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleShare('facebook')}>
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleShare('twitter')}>
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleShare('linkedin')}>
              <LinkedIn className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {slang.comments.map((comment, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <p className="font-semibold">{comment.user}</p>
              <p>{comment.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

