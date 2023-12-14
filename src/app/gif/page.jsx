"use server"
import React from 'react'
import Next from './next';



export default async function Gif(req, res) {
  const response = await fetch("https://api.giphy.com/v1/stickers/trending?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=100");
  const data = await response.json();
  const gif = data.data;

  return (
    <div className='flex items-center bg-slate-200 flex-col w-screen justify-center h-screen rounded p-10'>
      <Next e={gif} />
    </div>
  )
}
