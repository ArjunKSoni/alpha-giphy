import Image from 'next/image';
import React from 'react'

const Meme = ({e,next,page,setNext,setPage,home,setShow,setsearch}) => {
    return (
        <div className='flex gap-3 items-center justify-center flex-col'>
            <div className='flex flex-wrap gap-3 items-center justify-center p-10'>
                <div className={`imgholder p-5 flex items-center justify-center ${next == page ? "border-blue-600 border-4" : ""} bg-slate-300 overflow-hidden rounded-xl`}>
                    <Image src={e[page].images.original.url} alt='asdf' width={500} height={500}></Image>
                </div>
                {e.length - 1 >= page + 1 && <div className={`imgholder p-5 flex items-center justify-center ${next == page + 1 ? "border-blue-600 border-4" : ""} bg-slate-300 overflow-hidden rounded-xl`}>
                    <Image src={e[page + 1].images.original.url} alt='asdf' width={500} height={500}></Image>
                </div>}
                {e.length - 1 >= page + 2 && <div className={`imgholder p-5 flex items-center justify-center ${next == page + 2 ? "border-blue-600 border-4" : ""} bg-slate-300 overflow-hidden rounded-xl`}>
                    <Image src={e[page + 2].images.original.url} alt='asdf' width={500} height={500}></Image>
                </div>}
            </div>
            <div className='flex gap-3 p-3 flex-col items-center justify-center '>
                <div className='flex lg:gap-2 md:gap-1 items-center w-5/6 justify-center'>
                    <button className='p-2 rounded bg-white transition-all hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={() => { setNext(next == 0 ? e.length - 1 : next - 1); let k = (next == 0 ? e.length - 1 : next - 1) / 3; setPage(3 * Math.floor(k)); }}>Previous</button>
                    <h2 className={`p-3 text-xl font-bold ${next == page ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page}</h2>
                    {e.length - 1 >= page + 1 && <h2 className={`p-3 text-xl font-bold ${next == page + 1 ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page + 1}</h2>}
                    {e.length - 1 >= page + 2 && <h2 className={`p-3 text-xl font-bold ${next == page + 2 ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page + 2}</h2>}
                    <button className='p-2 rounded bg-white hover:bg-blue-700 hover:text-white  w-32 h-14 text-xl font-bold' onClick={() => { setNext(next == e.length - 1 ? 0 : next + 1); let k = (next == e.length - 1 ? 0 : next + 1) / 3; setPage(3 * Math.floor(k)); }}>Next</button>
                </div>
            </div>
            {home && <button className='p-2 rounded text-white bg-black hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={() => {setPage(0); setNext(0); setShow([]); setsearch("")}}>Home</button>}
        </div>
    )
}

export default Meme
