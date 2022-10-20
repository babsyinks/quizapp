import type { GetServerSideProps, NextPage } from 'next'
import { CountDownTimer } from '../components/TimerCountdown'
import styles from '../styles/quiz.module.css'
const Quiz: NextPage<{name:string}> = ({name}) => {

  return (
    <div className={styles.quizWrapper}>
      {name === 'timed' && <CountDownTimer/>}
        {name}
    </div>
  )
}

export  const getServerSideProps:GetServerSideProps = async (context)=>{
  return {
    props:{
      name:context.query.name
  }
}
}

export default Quiz
