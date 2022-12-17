import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [roll, setRoll] = React.useState(0)
    const [time, settime] = React.useState({startTime:0,endTime:0,duration:0})
    // localStorage.setItem("besttime",0)
    const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            settime(x=>{return {...x,endTime:new Date()}});
            settime(x=>{return {...x,duration:(x.endTime.getTime()-x.startTime.getTime())/1000}});
            settime(
                x=>{
                    if(x.duration<Number(localStorage.getItem("bestTime")) || localStorage.getItem("bestTime")=="0"){
                        localStorage.setItem("bestTime",x.duration)
                    }
                    return {...x}});
            

            // console.log(localStorage.getItem("besttime"))
            // localStorage.setItem("besttime",time.duration)

        }
    }, [dice])
    
    React.useEffect(()=>{
            let time=localStorage.getItem("bestTime")?"":localStorage.setItem("bestTime","0");
            settime({startTime:new Date(),endTime:0,duration:0});

    },[])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }  

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setRoll(x=>{return x+1})
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setRoll(0)
            settime({startTime:new Date(),endTime:0,duration:0});
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <span>number of rolls is {roll}</span>
            <span>you finish in {time.duration}, best time ever is {localStorage.getItem("bestTime")}</span>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}