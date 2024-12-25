'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { submitSlang } from '@/lib/firebase-utils'
import { auth } from '@/lib/firebase'

export default function SubmitSlang() {
    const [term, setTerm] = useState('')
    const [meaning, setMeaning] = useState('')
    const [example, setExample] = useState('')
    const [category, setCategory] = useState('')
    const [tags, setTags] = useState('')
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/') // Redirect to home if not logged in
            }
        })
        return () => unsubscribe()
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const slangTerm = {
            term,
            meaning,
            example,
            category,
            tags: tags.split(',').map(tag => tag.trim()),
        }
        const id = await submitSlang(slangTerm)
        if (id) {
            router.push(`/slang/${id}`)
        } else {
            alert('Failed to submit slang term. Please try again.')
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Submit New Slang Term</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="term">Term</Label>
                    <Input id="term" value={term} onChange={(e) => setTerm(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="meaning">Meaning</Label>
                    <Textarea id="meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="example">Example Usage</Label>
                    <Textarea id="example" value={example} onChange={(e) => setExample(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
                </div>
                <Button type="submit">Submit Slang Term</Button>
            </form>
        </div>
    )
}

