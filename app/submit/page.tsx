'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { addSlangTerm } from '@/lib/firebase-utils';
import { SlangTerm } from '@/types/slang';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

const SubmitSlang = () => {
    const [term, setTerm] = useState('');
    const [meaning, setMeaning] = useState('');
    const [category, setCategory] = useState('');
    const [example, setExample] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!auth.currentUser) {
            setError('You must be logged in to submit slang.');
            return;
        }

        const slangTags = tags.split(',').map(tag => tag.trim());

        try {
            const slangTerm: SlangTerm = {
                term,
                meaning,
                category,
                example,
                tags: slangTags,
                visits: 0,
                likes: 0,
                comments: [],
            };
            await addSlangTerm(slangTerm);
            router.push('/slang-list'); // Redirect to slang list after submission
        } catch (err) {
            setError('Failed to submit slang. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 shadow-md border border-gray-200 rounded-lg">
            {error && (
                <Alert variant="destructive">
                    <p>{error}</p>
                </Alert>
            )}
            <Input
                placeholder="Slang Term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
                className="w-full"
            />
            <Input
                placeholder="Meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                required
                className="w-full"
            />
            <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full"
            />
            <Input
                placeholder="Example"
                value={example}
                onChange={(e) => setExample(e.target.value)}
                required
                className="w-full"
            />
            <Input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full"
            />
            <Button type="submit" className="w-full">
                Submit Slang
            </Button>
        </form>
    );
};

export default SubmitSlang;
