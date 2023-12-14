"use client"
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Next = ({ e }) => {
    const router=useRouter()
    const [search, setsearch] = useState("");
    const [next, setNext] = useState(0);
    const [show, setShow] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const getCookie = () => {
      const cookieValue = Cookies.get('Token');
      if (!cookieValue) {
        router.replace("/")
      }
    };

    useEffect(() => {
      getCookie();
    }, [])

    const Search = async () => {
        if (search != "") {
            setLoading(true);
            setPage(0);
            setNext(0);
            const res = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=20&q=${search}`)
            const data = await res.json();
            setShow(data.data);
            setLoading(false);
        }
        else {
            alert("Please enter sticker name!")
        }
    }

    return (
        <div className="bg-white mainBox relative rounded-xl p-10">
            <div className='flex z-40 flex-wrap gap-2 justify-center items-center'>
                <div className=' bg-slate-200 flex gap-3 w-5/6 rounded-xl p-3'>
                    <Image src={"/Search icon.png"} alt='search' width={30} height={30}></Image>
                    <input value={search} onChange={e => setsearch(e.target.value)} className='bg-slate-200 font-bold text-xl w-5/6 focus:outline-none focus:border-transparent px-2' placeholder='Search for stickers' type="text" />
                </div>
                <button className='p-2 rounded-xl bg-black text-white hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={Search}>Search</button>
                <button className='p-2 rounded-xl bg-black text-white hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={()=>{Cookies.remove('Token'); router.replace("/");}}>Log out</button>
            </div>
            {show.length == 0 && !loading && <div className='flex items-center justify-center flex-col'>
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
                <div className='flex flex-col items-center justify-center '>
                    <div className='flex gap-2 items-center w-5/6 justify-center'>
                        <button className='p-2 rounded bg-white transition-all hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={() => { setNext(next == 0 ? e.length - 1 : next - 1); let k = (next == 0 ? e.length - 1 : next - 1) / 3; setPage(3 * Math.floor(k)); }}>Previous</button>
                        <h2 className={`p-3 text-xl font-bold ${next == page ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page}</h2>
                        {e.length - 1 >= page + 1 && <h2 className={`p-3 text-xl font-bold ${next == page + 1 ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page + 1}</h2>}
                        {e.length - 1 >= page + 2 && <h2 className={`p-3 text-xl font-bold ${next == page + 2 ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page + 2}</h2>}
                        <button className='p-2 rounded bg-white hover:bg-blue-700 hover:text-white  w-32 h-14 text-xl font-bold' onClick={() => { setNext(next == e.length - 1 ? 0 : next + 1); let k = (next == e.length - 1 ? 0 : next + 1) / 3; setPage(3 * Math.floor(k)); }}>Next</button>
                    </div>
                </div>
            </div>}

            {show.length != 0 && !loading && <div>
                <div className='flex flex-wrap gap-3 items-center justify-center p-10'>
                    <div className={`imgholder flex items-center justify-center p-5 ${next == page ? "border-blue-600 border-4" : ""} bg-slate-300 overflow-hidden rounded-xl`}>
                        <Image src={show[page].images.original.url} alt='adf' width={500} height={500}></Image>
                    </div>
                    {show.length - 1 >= page + 1 && <div className={`imgholder p-5 flex items-center justify-center ${next == page + 1 ? "border-blue-600 border-4" : ""} bg-slate-300 overflow-hidden rounded-xl`}>
                        <Image src={show[page + 1].images.original.url} alt='asdf' width={500} height={500}></Image>
                    </div>}
                    {show.length - 1 >= page + 2 && <div className={`imgholder p-5 flex items-center justify-center ${next == page + 2 ? "border-blue-600 border-4" : ""} bg-slate-300 overflow-hidden rounded-xl`}>
                        <Image src={show[page + 2].images.original.url} alt='asdf' width={500} height={500}></Image>
                    </div>}
                </div>
                <div className='flex gap-3 flex-col items-center justify-center '>
                    <div className='flex gap-2 items-center w-5/6 justify-center'>
                        <button className='p-2 rounded bg-white transition-all hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={() => { setNext(next == 0 ? show.length - 1 : next - 1); let k = (next == 0 ? show.length - 1 : next - 1) / 3; setPage(3 * Math.floor(k)); }}>Previous</button>
                        <h2 className={`p-3 text-xl font-bold ${next == page ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page}</h2>
                        {show.length - 1 >= page + 1 && <h2 className={`p-3 text-xl font-bold ${next == page + 1 ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page + 1}</h2>}
                        {show.length - 1 >= page + 2 && <h2 className={`p-3 text-xl font-bold ${next == page + 2 ? "bg-red-200 border-b-4" : ""} border-red-500`}>{page + 2}</h2>}
                        <button className='p-2 rounded bg-white hover:bg-blue-700 hover:text-white  w-32 h-14 text-xl font-bold' onClick={() => { setNext(next == show.length - 1 ? 0 : next + 1); let k = (next == show.length - 1 ? 0 : next + 1) / 3; setPage(3 * Math.floor(k)); }}>Next</button>
                    </div>
                    <button className='p-2 rounded-xl bg-black text-white hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={(e) =>{setShow([]); setPage(0); setNext(0); setsearch("")}}>Home</button>
                </div>
            </div>
            }

            {loading && <div className='flex items-center justify-center h-full'>
                <div>
                    <Image className='infinite-rotate' src={"/Spinner.png"} width={50} height={50} alt='loading...'></Image>
                </div>
            </div>
            }


        </div>
    )
}

export default Next
