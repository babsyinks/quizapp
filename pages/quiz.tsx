import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import { CountDownTimer } from '../components/TimerCountdown'
import styles from '../styles/quiz.module.css'

interface QuestionsSettings{
  name:string;
  difficulty:string;
  numQuestions:string
}

type QuizFormat = {
category:string;
correctAnswer:string;
difficulty:string;
id:string;
incorrectAnswers: string[];
question:string;
regions:string[];
tags:string[];
type:string;
}
const Quiz: NextPage<QuestionsSettings> = ({name,difficulty,numQuestions}) => {
const [options,setOptions] = useState<string [][]>([])
const [answers, setAnswers] = useState<string []>([])
const [question, setQuestion] = useState<string []>([])
const[currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
const [answerSubmitted,setAnswerSubmitted] = useState<string>('')
const [isDisabled, setIsDisabled] = useState<boolean>(false)
const [quizComplete,setQuizComplete] = useState<boolean>(false)
const [totalCorrect, setTotalCorrect] = useState<number>(0)

useEffect(()=>{
  const getQuiz = async ():Promise<QuizFormat[]>=>{
    try {
      const res = await (await fetch(`https://the-trivia-api.com/api/questions?limit=${numQuestions}&difficulty=${difficulty.toLowerCase()}`)).json()
      return res      
    } catch (error) {
      console.log((error as Error).message)
      throw(error)
    }

  }
  getQuiz().then(result=>{
    const setOptionsAndAnswers = (arr: QuizFormat [])=>{
      const ansArr = []
      const optionsArr = []
      const questArr = []
      const shuffleArr = (arr:string []):string[] =>{
        const shuffled = []
        while(arr.length>0){
          const rand = Math.floor(Math.random() * arr.length) 
          const val = arr.splice(rand,1)[0]
          shuffled.push(val)
        }
        return shuffled
      }
      for (let i = 0; i < arr.length; i++) {
        optionsArr.push(shuffleArr([...arr[i].incorrectAnswers,arr[i].correctAnswer]))
        ansArr.push(arr[i].correctAnswer)
        questArr.push(arr[i].question)
      }
      setAnswers(ansArr)
      setOptions(optionsArr) 
      setQuestion(questArr)
    }
    setOptionsAndAnswers(result)
  }).catch(e=>console.log(e))
},[])

const submitChoice = (e:React.MouseEvent<HTMLElement>)=>{
  if(!isDisabled){
    let ansSubmitted = e.currentTarget.innerText
    setAnswerSubmitted(ansSubmitted)
    setIsDisabled(true)
    if(ansSubmitted === answers[currentQuestionIndex]){
      setTotalCorrect(totalCorrect=>totalCorrect+1)
    }
    
  } 
}

const nextQuestion = ()=>{
  setIsDisabled(false)
  setCurrentQuestionIndex(currentQuestionIndex=>currentQuestionIndex+1)
  setAnswerSubmitted('')
  if(currentQuestionIndex >=question.length-1){
    setQuizComplete(true)
  }
}

  return (
    <div className={styles.quizWrapper}>
      {quizComplete?
      <div className={styles.scoreBox}>
        <div className={styles.midScoreBox}>
          <div className={styles.innerScoreBox}>
            Your score is <span className={styles.sp1}> {totalCorrect}</span> out of <span className={styles.sp2}>{answers.length}</span>
          </div>
        </div>   
      </div>
:
     <>
        {name === 'timed' && <CountDownTimer/>}
        <h1>Good Luck!</h1>
        {question.length>0 && (
          <div className={styles.questionStatus}>Question {currentQuestionIndex + 1} of {question.length}</div>
        )}
        
        <div className={styles.questionBox}>
          <div className={styles.midQuestionBox}>
            <div className={styles.innerQuestionBox}>
              <h3>
                {question[currentQuestionIndex]}
              </h3>
              <div> 
                {answerSubmitted?(
                  options[currentQuestionIndex]?.map(
                    option=><section key = {option} onClick={submitChoice} 
                    className={answers[currentQuestionIndex] === option?styles.correctOption:(answerSubmitted === option?styles.wrongOption:styles.otherOptions)}>
                      {option}
                      </section>)
                ):(
                  options[currentQuestionIndex]?.map(option=><section key = {option} onClick={submitChoice}>{option}</section>)
                )}
              </div>          
            </div>
          </div>
          
        </div>
          <button onClick={nextQuestion} className={styles.nextBtn} disabled = {!isDisabled}>{currentQuestionIndex>=question.length-1?'Submit':'Next'}</button>    
      </>
 
      }
      {quizComplete && 
            <Link href='/'>
              <button>OK</button>
            </Link> }
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
