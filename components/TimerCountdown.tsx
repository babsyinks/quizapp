import React from 'react';
import Countdown from 'react-countdown';
import { NextComponentType } from 'next';
import styles from '../styles/timercountdown.module.css'

// Random component
const Completionist = () => <span>You are good to go!</span>;
const crt = (t:number)=>{
  return t<=1?'':'s'
}

type time = {hours:number,minutes:number,seconds:number,completed:boolean}
// Renderer callback with condition
const renderer = ({hours, minutes, seconds, completed}:time) => {
    
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    
    return <span className = {styles.timercountdown}><span>This Quiz Will End In:</span>{hours > 0 && `${hours} hour${crt(hours)},`} {minutes > 0 && `${minutes} minute${crt(minutes)},`} {seconds > 0 && `${seconds} second${crt(seconds)}.`}</span>;
  }
};

export const CountDownTimer:NextComponentType = ()=>{
  return (
    <Countdown
      date={Date.now() + 150000}
      renderer={renderer}
    />
  )
}
