import React, { useState } from "react";
import { NextPage } from "next";
import styles from '../styles/quiz_setting.module.css'
const QuizSetting:NextPage = ()=>{
    const [difficulty,setDifficulty] = useState<string>('')
    interface CLickEventTarget extends EventTarget{
        value:string
    }
    interface CLickEvent extends React.MouseEvent<HTMLElement>{
        target:CLickEventTarget
    }
    const handleSetDifficulty = (e: CLickEvent)=>{
        e.preventDefault()
        setDifficulty(e.target.value)
        console.log(e.target.value)
    }
    return (
        <>
            <div className={styles.settings_wrapper}>
                    <div className={styles.slider_wrapper}>
                        <section>
                        <h2>Select Questions Difficulty Level</h2>
                        <div className={styles.buttonsWrapper}>
                            <button  value={'Easy'} onClick={handleSetDifficulty}>
                                Easy
                            </button>
                            <button value={'Medium'} onClick={handleSetDifficulty}>
                                Medium
                            </button>
                            <button value={'Hard'} onClick={handleSetDifficulty}>
                                Hard
                            </button>
                        </div>
                        </section>
                        <section>
                            <h2>Select Total Number of Questions</h2>
                            <div className ={styles.slider_container}>
                                <input type="range" min="1" max="100" value="50" className={styles.slider} id="myRange"/>
                            </div>                   
                        </section>

                    </div> 
                </div>    
                {(difficulty === 'Easy' || difficulty === 'Medium' || difficulty === 'Hard') && <button>Start Quiz</button>}
        </>
        
    )
}

export default QuizSetting