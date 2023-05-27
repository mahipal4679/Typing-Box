import React, { useEffect, useState } from 'react'
import './TypingBox.css'

function TypingBox() {
  const [text, setText] = useState();
  const [timer, setTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [countKey, setCountKey] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const referenceText = "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies. React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js";

// useEffect hook for Timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

// Btn start
  const handleStart = () => {
    setIsRunning(true);
  };

//Btn Stop
  const handleStop = () => {
    setIsRunning(false);
  };

 // function for HandleInput
  const handleInputChange = (e) => {
    const { value } = e.target;
    setText(value);

    //Count for number of word pressed
    const word = value.trim().split(' ').length;
    setCountKey(word);
  }

  //function for ClearInput Text
  const HandleClear = () => {
    setText(" ");
  }

 //For Accuracacy
  const calculateAccuracy = () => {
    const typedWords = text.trim().split(' ');
    const referenceWords = referenceText.trim().split(' ');

    let correctCount = 0;
    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === referenceWords[i]) {
        correctCount++;
      }
    }
     //formula for Accuracy..
    const calculatedAccuracy = (correctCount / referenceWords.length) * 100;
    setAccuracy(calculatedAccuracy.toFixed(2));
  };


  return (
    <div className="container">
      <h1>TYPING-BOX</h1>
      <div className='timer'>
        <h2>TIMER [{timer}] sec</h2>
        <button className='btn' onClick={handleStart}>Start</button>
        <button className='btn' onClick={handleStop}>Stop</button>
      </div>

      <div className='Reference-text'>
        {referenceText}
      </div>

      <div>
        <textarea
          value={text}
          onChange={handleInputChange}
          placeholder="Write Some Text Here!!!">
        </textarea>
      </div>

      <div>
        <div className='left'>
          {countKey}
        </div>
        <div className='right'>
          {accuracy}%
        </div>
      </div>

      <button className='btn-calAccrcy' onClick={calculateAccuracy}>Accuracy</button>
      <button className='btn-clear' onClick={HandleClear}> Clear</button>
    </div>

  )
}

export default TypingBox