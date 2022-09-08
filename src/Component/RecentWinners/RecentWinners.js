import {React ,useState, useEffect, useLayoutEffect, useRef } from 'react'
import './RecentWinners.css'

export default function RecentWinners({winners}) {
    const [winnersList,setWinnerList]= useState([]);
   
    
    return (
        <div className="rcntwnrsCont">
            {winners.reverse().map(function(e,i)
            {
                if(i<7)
                {
                // var colorCode = e.isWinner==true? "winnerClr blockWinner":"looserClr blockWinner"; 
                // return <div className={colorCode}>{e.winner} </div>
                return <div className="blockWinner" style={{color:e.winner?"green":e.amount!=0?"red":"white"}}>{e.winnerP} </div>
                }
            })}

            {/* <div className="blockWinner">'A' </div>
            <div className="blockWinner">'B' </div>
            <div className="blockWinner">'C' </div>
            <div className="blockWinner">'D' </div> */}
            
        </div>
    )
}
