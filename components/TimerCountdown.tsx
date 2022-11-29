import React from 'react';
import Countdown from 'react-countdown';
import styles from '../styles/timercountdown.module.css'

// Random component
const Completionist = () => <span>Quiz Is Over!</span>;
const crt = (t:number)=>{
  return t<=1?'':'s'
}

type TimerEnd = {removeTimer:()=>void,numQuestions:number}

export const CountDownTimer = ({removeTimer,numQuestions}:TimerEnd)=>{
  
  type Time = {hours:number,minutes:number,seconds:number,completed:boolean}
// Renderer callback with condition

const renderer = ({hours, minutes, seconds, completed}:Time) => {
    
  if (completed) {
    removeTimer()
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    
    return <span className = {styles.timercountdown}><span>This Quiz Will End In:</span>{hours > 0 && `${hours} hour${crt(hours)},`} {minutes > 0 && `${minutes} minute${crt(minutes)},`} {seconds > 0 && `${seconds} second${crt(seconds)}.`}</span>;
  }
};
  return (
    <Countdown
      date={Date.now() + (15000 * numQuestions)}
      renderer={renderer}
    />
  )
}
