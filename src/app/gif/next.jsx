"use client"
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Meme from './meme';

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
        <div className="bg-white mainBox overflow-scroll relative rounded-xl p-10">
            <div className='flex z-40 flex-wrap gap-2 justify-center items-center'>
                <div className=' bg-slate-200 flex gap-3 md:w-full lg:w-5/6 rounded-xl p-3'>
                    <Image src={"/Search icon.png"} alt='search' width={30} height={30}></Image>
                    <input value={search} onChange={e => setsearch(e.target.value)} className='bg-slate-200 font-bold text-xl w-5/6 focus:outline-none focus:border-transparent px-2' placeholder='Search for stickers' type="text" />
                </div>
                <button className='p-2 rounded-xl bg-black text-white hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={Search}>Search</button>
                <button className='p-2 rounded-xl bg-black text-white hover:bg-blue-700 hover:text-white w-32 h-14 text-xl font-bold' onClick={()=>{Cookies.remove('Token'); router.replace("/");}}>Log out</button>
            </div>
            {show.length == 0 && !loading && <Meme e={e} next={next} page={page} setNext={setNext} setPage={setPage} home={false} setShow={setShow} setsearch={setsearch}/>}
            {show.length != 0 && !loading && <Meme e={show} next={next} page={page} setNext={setNext} setPage={setPage} home={true} setShow={setShow} setsearch={setsearch}/>}
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
