/* eslint-disable no-var */
import { Mongoose } from 'mongoose'

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null // 비동기 연결
    instance: Mongoose | null // 활성 연결
  }
}

export {}
