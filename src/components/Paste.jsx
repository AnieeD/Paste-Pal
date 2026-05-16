import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard")
  }

  async function handleShare(paste) {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        toast.success("Shared successfully")
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error("Unable to share")
        }
      }
      return
    }

    const fallbackText = `${paste.title}\n\n${paste.content}\n\n${shareUrl}`
    navigator.clipboard.writeText(fallbackText)
      .then(() => toast.success("Share text copied to clipboard"))
      .catch(() => toast.error("Unable to copy share text"))
  }


  return (
    <div>
      <input 
        className='p-2 rounded-2xl min-w-150 mt-5 bg-black'
        type="search"
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 && 
          filteredData.map(
            (paste) => {
              return (
                <div className='border rounded-2xl p-4' key={paste?._id}>
                  <div className='flex justify-center'>
                    {paste.title}
                  </div>
                  <div className='flex justify-center'>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button className='rounded-2xl bg-black mt-4 w-20 h-8'>
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>
                    <Link to={`/pastes/${paste?._id}`} className='rounded-2xl bg-black mt-4 w-20 h-8 flex items-center justify-center'>
                      View
                    </Link>
                    <button onClick={() => handleDelete(paste?._id)} className='rounded-2xl bg-black mt-4 w-20 h-8'>
                      Delete
                    </button>
                    <button onClick={() => handleCopy(paste?.content)} className='rounded-2xl bg-black mt-4 w-20 h-8'>
                      Copy
                    </button>
                    <button onClick={() => handleShare(paste)} className='rounded-2xl bg-black mt-4 w-20 h-8'>
                      Share
                    </button>
                  </div>
                  <div className='flex justify-center mt-3'>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
