/* eslint-disable no-console */
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

import { db } from './firebase'

// 추가 (Create)
export async function addDocument(collectionName: string, data: object) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    console.log('Document written with ID:', docRef.id)
  } catch (e) {
    console.error('Error adding document:', e)
  }
}

// 조회 (Read)
export async function getAllDocuments(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName))
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data())
  })
}

// 수정 (Update)
export async function updateDocument(
  collectionName: string,
  docId: string,
  newData: object,
) {
  const docRef = doc(db, collectionName, docId)
  try {
    await updateDoc(docRef, newData)
    console.log('Document updated')
  } catch (e) {
    console.error('Error updating document:', e)
  }
}

// 삭제 (Delete)
export async function deleteDocument(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId)
  try {
    await deleteDoc(docRef)
    console.log('Document deleted')
  } catch (e) {
    console.error('Error deleting document:', e)
  }
}
