import { redirect } from 'next/navigation'

function HomePage() {
  redirect('/persona')
  return <div>준비중입니다.</div>
}

export default HomePage
