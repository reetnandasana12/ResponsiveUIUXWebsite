// App.js
// src > JS App.js
// import React, { useState, useMemo, useEffect } from 'react'
// export default function App() {
// const [number, setNumber] = useState(0)
// const [dark, setDark] = useState(false)
// const doubleNumber = useMemo (() => {
// return slowFunction (number)
// }, [number])
// const themeStyles = useMemo (() => {
// return {
// backgroundColor: dark? 'black' : 'white',
// color: dark? 'white' : 'black'
// }
// }, [dark])
// useEffect (() => {
// console.log('Theme Changed')
// }, [themeStyles])
// return (
// <input type="number" value={number} onChange={e => setNumber(parseInt
// (e.target.value))} />
// <button onClick={() => setDark (prevDark => !prevDark)}>Change Theme</button>
// <div style={themeStyles}>{doubleNumber}</div>
// </>
// }