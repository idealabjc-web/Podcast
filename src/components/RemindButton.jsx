import { useState } from 'react'

export default function RemindButton() {
  const [set, setSet] = useState(false)
  return <button className={`rm ${set ? 'set' : ''}`} onClick={() => setSet(!set)}>{set ? '✓ Reminder set' : 'Remind me'}</button>
}
