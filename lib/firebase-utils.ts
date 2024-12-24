import { db } from './firebase'
import { doc, getDoc, setDoc, updateDoc, increment, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { SlangTerm, TopVisitedSlang } from '@/types/slang'

export async function incrementSlangVisits(slangId: string): Promise<void> {
  const slangRef = doc(db, 'slangTerms', slangId)
  await updateDoc(slangRef, {
    visits: increment(1)
  })
}

export async function getSlangTerm(slangId: string): Promise<SlangTerm | null> {
  const slangRef = doc(db, 'slangTerms', slangId)
  const slangSnap = await getDoc(slangRef)
  if (slangSnap.exists()) {
    return { id: slangSnap.id, ...slangSnap.data() } as SlangTerm
  } else {
    return null
  }
}

export async function getTopVisitedSlangs(numLimit: number = 3): Promise<TopVisitedSlang[]> {
  const slangsRef = collection(db, 'slangTerms')
  const q = query(slangsRef, orderBy('visits', 'desc'), limit(numLimit))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    term: doc.data().term,
    meaning: doc.data().meaning,
    visits: doc.data().visits
  }))
}

export async function updateLikes(slangId: string, numIncrement: number): Promise<void> {
  const slangRef = doc(db, 'slangTerms', slangId)
  await updateDoc(slangRef, {
    likes: increment(numIncrement)
  })
}

