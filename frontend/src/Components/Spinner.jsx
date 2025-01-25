import React from 'react'
function Spinner() {
  return (
    <div className='h-[106vh] flex items-center justify-center -mt-10 fixed inset-0  bg-black opacity-60 backdrop-blur-sm z-10'>
        <div  className=''>
            <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" width={120} />

        </div>
    </div>
  )
}

export default Spinner