import Image from 'next/image'

function ResumeIntroduce() {
  return (
    <section className="w-full">
      <h1 className="">날로 먹는 이력서</h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-1 flex-col">
          <h2 className="">자기 소개</h2>
          <p className="font-semibold">
            이력서 검토자들을 위한 프로젝트를 진행하고 있습니다. 지원자의 역량을
            손쉽고 효율적으로 파악할 수 있는 이력서를 목표로 하고 있습니다. 보고
            계신 이력서는 저희 팀의 mvp입니다. 이력서 검토 경험을 향상
            시켜주는지 궁금합니다. 🧐🤭 피드백은 저희에게 큰 힘이 됩니다!
            <br />
          </p>
          <br />
          연락처
          <br />
          <address>
            채종민 email:{' '}
            <a href="mailto:cowhdals1111@gmail.com">cowhdals1111@gmail.com</a>
            <br />
            임진조 email:{' '}
            <a href="mailto:dlawlswh123@gmail.com">dlawlswh123@gmail.com</a>
          </address>
        </div>

        <div className="flex size-full flex-1 flex-col items-center">
          <Image
            className="block"
            src="/images/person.png"
            alt="uncook icon"
            width={220}
            height={220}
            priority
          />

          <h2 className="">Team Uncook</h2>
        </div>
      </div>
    </section>
  )
}

export default ResumeIntroduce
