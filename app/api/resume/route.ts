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
    return (
      NextResponse.json({ success: false, message: '내부 서버 오류' }),
      { status: 500 }
    )
  }
}
