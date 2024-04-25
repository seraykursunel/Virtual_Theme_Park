import './styles.css'
import { useState, useEffect, use } from 'react'
import Thermometer from './components/Thermometer'
import Header from './components/Header'

export default function App() {
  const [timeCount, setTimeCount] = useState(0)
  const [cursorInButton,setCursorInButton] = useState(false)
  const [buttonHeldDown, setButtonHeldDown] =useState(false) 
  const timeToDisplay = (timeCount / 100).toFixed(2)

 
  const buttonClass = !timeCount ? 'outsideButton' : undefined


  try {
    useEffect(() => {
      let interval
      if (cursorInButton && buttonHeldDown) {
        interval = setInterval(() => {
          setTimeCount((timeCount) => timeCount + 1)
        }, 10)
      }
      return () => {
        setTimeCount(0)
        if (buttonHeldDown && !cursorInButton) {
          setButtonHeldDown(false)
        }
        clearInterval(interval)
      }
    }, [cursorInButton, buttonHeldDown])
  } catch {
    console.log(
      `AHAHAHA, uygulamanız hacklendi. İki state'inizi ve dört event handler'ınızı sildim. Onları yakalayabilir misin, bulmaya çalış 😜`
    )
  }

  
  return (
    <div className='wrapper'>
      <Header time={+timeToDisplay} />
      <Thermometer time={+timeToDisplay} />
      <button className={buttonClass} onMouseEnter={()=>setCursorInButton(true)} onMouseDown={()=>setButtonHeldDown(true)} onMouseLeave={()=>setCursorInButton(false)} onMouseUp={()=>setButtonHeldDown(false)}>Basılı Tut</button>
      <p className='time'>{timeToDisplay} saniye </p>
    </div>
  )
}
