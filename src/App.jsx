import { useCallback, useEffect, useRef, useState } from 'react'

function App () {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState(false)

  // useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllow) str += '0123456789'
    if (charAllow) str += '!@#$%^&*()_+'
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllow, charAllow, setPassword])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charAllow, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-red-500 bg-gray-800 flex flex-wrap justify-center item-center'>
        <h1 className='text-white text-center text-3xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden m-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className='outline-none bg-green-500 text-white shrink-0 py-2 px-4 hover:bg-green-600'
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={e => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllow}
              id='numberInput'
              onChange={() => {
                setNumberAllow(prev => !prev)
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllow}
              id='characterInput'
              onChange={() => {
                setCharAllow(prev => !prev)
              }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
