import { db, auth } from './firebase'
import { doc, getDoc, setDoc, updateDoc, increment, collection, query, orderBy, limit, getDocs, addDoc } from 'firebase/firestore'
import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth'
import { SlangTerm, TopVisitedSlang } from '@/types/slang'

export async function incrementSlangVisits(slangId: string): Promise<void> {
  try {
    const slangRef = doc(db, 'slangTerms', slangId)
    await updateDoc(slangRef, {
      visits: increment(1)
    })
  } catch (error) {
    console.error("Error incrementing slang visits:", error)
  }
}

export async function getSlangTerm(slangId: string): Promise<SlangTerm | null> {
  try {
    const slangRef = doc(db, 'slangTerms', slangId)
    const slangSnap = await getDoc(slangRef)
    if (slangSnap.exists()) {
      return { id: slangSnap.id, ...slangSnap.data() } as SlangTerm
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting slang term:", error)
    return null
  }
}

export async function getTopVisitedSlangs(numLimit: number = 3): Promise<TopVisitedSlang[]> {
  try {
    const slangsRef = collection(db, 'slangTerms')
    const q = query(slangsRef, orderBy('visits', 'desc'), limit(numLimit))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      term: doc.data().term,
      meaning: doc.data().meaning,
      visits: doc.data().visits
    }))
  } catch (error) {
    console.error("Error getting top visited slangs:", error)
    return []
  }
}

export async function updateLikes(slangId: string, numIncrement: number): Promise<void> {
  try {
    const slangRef = doc(db, 'slangTerms', slangId)
    await updateDoc(slangRef, {
      likes: increment(numIncrement)
    })
  } catch (error) {
    console.error("Error updating likes:", error)
  }
}

export async function signInWithGoogle(): Promise<User | null> {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error("Error signing in with Google:", error)
    return null
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
  }
}

export async function submitSlang(slangTerm: Omit<SlangTerm, 'id' | 'likes' | 'visits' | 'comments'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'slangTerms'), {
      ...slangTerm,
      likes: 0,
      visits: 0,
      comments: []
    })
    return docRef.id
  } catch (error) {
    console.error("Error submitting slang:", error)
    return null
  }
}

