import React, { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styles from '../styles/quiz_setting.module.css'
const QuizSetting:NextPage<{name:string}> = ({name})=>{
    const [difficulty,setDifficulty] = useState<string>('')
    const [buttonEnabled,setButtonEnabled] = useState<boolean>(false)
    const [numQuestions, setNumQuestions] = useState<string>('5')
    const [currentSelected, setCurrentSelected] = useState<string>('')

    const handleSetDifficulty = (e: React.MouseEvent<HTMLButtonElement>)=>{
        setCurrentSelected(e.currentTarget.value)
        setDifficulty(e.currentTarget.value)
    }

    const handleSetQuestion = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNumQuestions(e.target.value)
    }

    useEffect(()=>{
        if(difficulty === 'Easy' || difficulty === 'Medium' || difficulty === 'Hard'){
            setButtonEnabled(true)
        }
        else{
            setButtonEnabled(false)
        }
    },[difficulty])
    return (
        <>
            <div className={styles.settings_wrapper}>
                    <div className={styles.slider_wrapper}>
                        <section>
                        <h2>Select Questions Difficulty Level</h2>
                        <div className={styles.buttonsWrapper}>
                            <button className={currentSelected === 'Easy'? styles.currentSelected:''}  value={'Easy'} onClick={handleSetDifficulty}>
                                Easy
                            </button>
                            <button className={currentSelected === 'Medium'? styles.currentSelected:''} value={'Medium'}  onClick={handleSetDifficulty}>
                                Medium
                            </button>
                            <button className={currentSelected === 'Hard'? styles.currentSelected:''} value={'Hard'} onClick={handleSetDifficulty}>
                                Hard
                            </button>
                        </div>
                        </section>
                        <section>
                            <h2>Select Total Number of Questions</h2>
                            <div className ={styles.slider_container}>
                                <input type="range" min="5" max="50" value={numQuestions} className={styles.slider} id="myRange" onChange={handleSetQuestion}/>
                            </div>  
                            <div className={styles.questionsnum}> Total Questions:<span>{numQuestions}</span></div>                 
                        </section>

                    </div> 
                    <Link href={{ pathname: '/quiz', query: {name,difficulty,numQuestions}}}>
                        <button disabled = {!buttonEnabled} className={styles.btn}>Start Quiz</button>
                    </Link>
                    
                </div>    
        </>
        
    )
}

export const getServerSideProps:GetServerSideProps = async (context)=>{
    return {props:{
        name:context.query.name
    }}
}

export default QuizSetting