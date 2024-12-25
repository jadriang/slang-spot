'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signInWithGoogle, signOutUser } from '@/lib/firebase-utils'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })
        return () => unsubscribe()
    }, [])

    const handleSignIn = async () => {
        const user = await signInWithGoogle()
        if (user) {
            router.push('/submit')
        }
    }

    const handleSignOut = async () => {
        await signOutUser()
        router.push('/')
    }

    return (
        <>
            {user ? (
                <Button onClick={handleSignOut}>Sign Out</Button>
            ) : (
                <Button onClick={handleSignIn}>Sign In with Google</Button>
            )}
        </>
    )
}

