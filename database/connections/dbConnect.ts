import mongoose from 'mongoose'

const DB_URL = process.env.MONGODB_URI

if (!DB_URL) {
  throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다.')
}

// 전역 mongoose 객체 초기화
if (!global.mongoose) {
  global.mongoose = { promise: null, instance: null }
}

/** 서버리스 환경에서 싱글톤 패턴을 이용하여 중복연결을 막는다. */
async function dbConnect() {
  // 기존 연결이 있으면 반환
  if (global.mongoose.instance) {
    console.log('이미 연결된 MongoDB 인스턴스가 있습니다.')
    return global.mongoose.instance
  }

  // 새 연결 생성
  if (!global.mongoose.promise && DB_URL) {
    mongoose.set({ debug: true, strictQuery: false })
    global.mongoose.promise = (async () => {
      try {
        const connection = await mongoose.connect(DB_URL)
        console.log(' MongoDB 연결 성공')
        return connection
      } catch (error) {
        console.error(
          ' MongoDB 연결 실패:',
          error instanceof Error ? error.message : error,
        )
        throw new Error('MongoDB 연결 실패')
      }
    })()
  }

  global.mongoose.instance = await global.mongoose.promise
  return global.mongoose.instance
}

export default dbConnect
