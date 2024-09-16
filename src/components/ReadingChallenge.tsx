"use client"
import React, { useState } from 'react';

const ReadingChallenge = () => {
  const [goal, setGoal] = useState(0);
  const [progress, setProgress] = useState(0);
  const handleGoalChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setGoal(value);
      // Reset to 0 when goal changes
      setProgress(0);
    }
  };
  const handleProgressChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= goal) {
      setProgress(value);
    } else {
      e.target.value = goal; // reset the input value to the goal
    }
  };
  const getProgressBarColor = (progress: number, goal: number) => {
    const colors = [
      '#FF3737',
      '#ff5200',
      '#fbda61', 
      '#619ffb', 
      '#184fa1', 
      '#87d39b', 
      '#2dc72d', 
    ];
    const progressPercentage = (progress / goal) * 100;
    const colorIndex = Math.floor((progressPercentage / 100) * (colors.length - 1));
    return colors[colorIndex];
  };

  const progressBarStyle = {
    width: `${(progress / goal) * 100}%`,
    backgroundColor: getProgressBarColor(progress, goal),
    height: '20px',
    borderRadius: '10px',
    margin: '10px 0',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    transition: 'width 0.5s ease-in-out',
  };

  return (
    <div className='w-full md:w-1/2 lg:w-1/3 border-rose-600 border-[1px] p-5 rounded-[10px_40px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)_0_6px_20px_0_rgba(0,0,0,0.19)]'>
      <h2 className='text-rose-600'>Reading Challenge</h2>
      <p className='font-semibold'>Set your monthly reading goal:</p>
      <input
        type="number"
        value={goal}
        onChange={handleGoalChange}
        placeholder="Enter your goal"
        min="0" //to prevent negative values
        className='outline-none w-[50px] pl-2 cursor-pointer hover:bg-rose-200'
      />
      <p className='font-semibold'>Track your progress:</p>
      <input
        type="number"
        value={progress}
        onChange={handleProgressChange}
        placeholder="Enter your progress"
        min="0"
        max={goal} //to prevent exceeding the goal
        className='outline-none w-[50px] pl-2 cursor-pointer hover:bg-rose-200'
      />
      <p className='text-rose-600'>Progress: {progress} / {goal}</p>
      <div style={{ width: '100%', backgroundColor: '#ccc', height: '20px', borderRadius: '10px', margin: '10px 0' }}>
        <div style={progressBarStyle} />
      </div>
    </div>
  );
};

export default ReadingChallenge;