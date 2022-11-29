import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import React, { useState } from 'react';
import { CountDownTimer } from '../components/TimerCountdown'
import Quizmain from '../components/Quizmain';
import styles from '../styles/quiz.module.css'

interface QuestionsSettings{
  name:string;
  difficulty:string;
  numQuestions:string
}

const Quiz: NextPage<QuestionsSettings> = ({name,difficulty,numQuestions}) => {
const [quizComplete,setQuizComplete] = useState<boolean>(false)
const [totalCorrect, setTotalCorrect] = useState<number>(0)
const [answers,setAnswers] = useState<string []>([])
const [timerStopped,setTimerStopped] = useState<boolean>(false)

const handleQuizComplete = ()=>{
  setQuizComplete(true)
}

const handleQuizResults = (ans:string[],totCorr:number)=>{
  setAnswers(ans)
  setTotalCorrect(totCorr)
}

const handleTimerStopped = ()=>{
  setTimerStopped(true)
}

  return (
    <div className={styles.quizWrapper}>
      {quizComplete?
      <>
        <div className={styles.scoreBox}>
        <div className={styles.midScoreBox}>
          <div className={styles.innerScoreBox}>
            Your score is <span className={styles.sp1}> {totalCorrect}</span> out of <span className={styles.sp2}>{answers.length}</span>
          </div>
        </div>   
      </div>  
      <Link href='/'>
          <button>OK</button>
      </Link>   
      </>
:
     <>
        {name === 'timed' && <CountDownTimer removeTimer={handleTimerStopped} numQuestions={+numQuestions}/>}
        <Quizmain difficulty={difficulty} numQuestions={numQuestions} completeQuiz={handleQuizComplete} timerstatus={timerStopped} showResults={handleQuizResults}/>
      </>
      }

    </div>
  )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
  const{name,difficulty,numQuestions} = context.query
  return {
    props:{
      name,
      difficulty,
      numQuestions
  }
}
}

export default Quiz
