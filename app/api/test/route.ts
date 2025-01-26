import { NextResponse } from 'next/server'

import dbConnect from '#/database/connections/dbConnect'
import Test from '#/database/models/test.model'

// 요청 본문 타입 정의
interface PostRequestBody {
  title: string
  content: string
}

// GET 요청 처리
export async function GET() {
  try {
    await dbConnect()
    const allTests = await Test.find({})
    console.log('fetched data: ', allTests)
    console.log('Fetching from collection:', Test.collection.name)
    return NextResponse.json(allTests, { status: 200 })
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}

// POST 요청 처리
export async function POST(req: Request) {
  try {
    await dbConnect()
    // 요청 본문을 PostRequestBody로 타입 단언
    const body = (await req.json()) as PostRequestBody
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Invalid input data' },
        { status: 400 },
      )
    }

    const testId = Math.floor(Math.random() * 100000) // 임시 고유 ID 생성
    const newTest = new Test({ testId, title, content })
    await newTest.save()

    return NextResponse.json(
      { message: 'Test created successfully' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating test:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
