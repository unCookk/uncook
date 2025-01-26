import mongoose, { models, Schema, Document } from 'mongoose'

// Counter 문서 인터페이스
interface ICounter extends Document {
  _id: string
  seq: number
}

// CounterSchema 정의
export const CounterSchema = new Schema<ICounter>({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
})

// Counter 모델 정의
const Counter =
  models?.Counter || mongoose.model<ICounter>('Counter', CounterSchema)

// getNextSequenceValue 함수
export async function getNextSequenceValue(
  sequenceName: string,
): Promise<number> {
  const sequenceDocument = await Counter.findByIdAndUpdate<ICounter>(
    sequenceName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  )

  if (!sequenceDocument) {
    throw new Error('Failed to retrieve sequence document')
  }

  return sequenceDocument.seq
}

export default Counter
