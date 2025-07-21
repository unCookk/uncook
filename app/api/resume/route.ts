import { NextResponse } from 'next/server'

import dbConnect from '#/database/connections/dbConnect'
import Resume from '#/database/models/resume.model'

// 모든 이력서 조회
export async function GET() {
  try {
    await dbConnect()
    const resume = await Resume.find({})
    return NextResponse.json({ success: true, data: resume }, { status: 200 })
  } catch (error) {
    console.error('resumes fetching 에러:', error)
    return NextResponse.json(
      { success: false, message: '내부 서버 오류' },
      { status: 500 }
    )
  }
}

// POST 요청: 새 이력서 생성
export async function POST(request: Request) {
  try {
    await dbConnect()
    const body: unknown = await request.json()

    const newResume = new Resume(body)
    await newResume.save()

    console.log('새 이력서가 성공적으로 생성되었습니다:', newResume)
    return NextResponse.json(
      { success: true, data: newResume },
      { status: 201 },
    )
  } catch (error) {
    console.error('이력서 생성 중 에러 발생:', error)
    return NextResponse.json(
      { success: false, message: '내부 서버 오류' },
      { status: 500 },
    )
  }
}
