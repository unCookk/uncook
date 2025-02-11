// models/Resume.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

// 연락처 인터페이스
export interface IContact extends Document {
  name: string
  email: string
  phone?: string
  role?: string
  social?: {
    linkedin?: string
    github?: string
  }
}

// 이력서 아이템 인터페이스
export interface IResumeItem extends Document {
  title: string
  summary: string
  blogId?: string // 블로그 포스트와 연동할 참조 ID
  order: number
  tags?: string[]
}

// 이력서 섹션 인터페이스
export interface IResumeSection extends Document {
  title: string
  order: number
  description?: string
  items: IResumeItem[]
}

// 전체 이력서 인터페이스
export interface IResume extends Document {
  title: string
  introduction: string
  contacts: IContact[]
  team?: string
  sections: IResumeSection[]
  createdAt: Date
  updatedAt: Date
}

// 연락처 스키마
const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  role: String,
  social: {
    linkedin: String,
    github: String,
  },
})

// 이력서 아이템 스키마
const ResumeItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  blogId: String,
  order: { type: Number, required: true },
  tags: [String],
})

// 이력서 섹션 스키마
const ResumeSectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  description: String,
  items: [ResumeItemSchema],
})

// 전체 이력서 스키마
const ResumeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    contacts: [ContactSchema],
    team: String,
    sections: [ResumeSectionSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    strict: 'throw', // 원치 않는 데이터가 스키마로 들어오면 에러 던짐
  },
)

const Resume: Model<IResume> =
  (mongoose.models.Resume as Model<IResume>) ||
  mongoose.model<IResume>('Resume', ResumeSchema)
// 모델 생성 (이미 생성되어 있다면 재사용)
export default Resume
