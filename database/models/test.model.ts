import mongoose, { models, Schema, Document, Model } from 'mongoose'

// TypeScript 인터페이스 정의
export interface ITest extends Document {
  testId: number
  title: string
  content: string
}

// 스키마 정의
export const TestSchema = new Schema<ITest>({
  testId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

// 모델 생성
const Test: Model<ITest> =
  (models?.Test as Model<ITest>) ||
  mongoose.model<ITest>('Test', TestSchema, 'tests')

export default Test
