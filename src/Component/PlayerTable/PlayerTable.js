import React from 'react'

export default function PlayerTable() {
    return (
        <>

            <div className={isAWinner && isGameOver ? "playerATable winnerTableLight" : "playerATable  normalTableLight"}>
                <div className="playerNameText">PLAYER A {playedAmt != 0 && isPlayerSelected && <span>{selectedPlayer == "A" ? "+₹" + playedAmt : "-₹" + playedAmt}</span>}</div>
                <div className="cardOuterDiv">
                    <div className="card1">
                        <div className="cardNumberText">CARD A1</div>
                        {showCard1 && showCard && <img style={{ height: "100%", width: "100%", marginTop: "-70%" }} src={deckimg[0]} alt="" />}
                    </div>
                    <div className="card2">
                        <div className="cardNumberText">CARD a2</div>
                        {showCard2 && showCard && <img style={{ height: "100%", width: "100%", marginTop: "-70%" }} src={deckimg[1]} alt="" />}
                    </div>
                    <div className="card3">
                        <div className="cardNumberText">CARD a3</div>
                        {showCard3 && showCard && <img style={{ height: "100%", width: "100%", marginTop: "-70%" }} src={deckimg[2]} alt="" />}
                    </div>


                </div>
                {startNewGame && < div className=
                    {isPlayerSelected ?
                        selectedPlayer == "A" ?
                            showInputDiv ?
                                "selectPlayerA successSelectedPlayerBox pointerNone"
                                : "selectPlayerA successSelectedPlayerBox"
                            : showInputDiv ?
                                "selectPlayerA yetToSelectPlayerBox pointerNone"
                                : "selectPlayerA yetToSelectPlayerBox"
                        : showInputDiv
                            ? "selectPlayerA yetToSelectPlayerBox disableDiv"
                            : "selectPlayerA yetToSelectPlayerBox  blink_me"}
                    onClick={() => onClickPlayer("A")} >{setPlayer1Name}</div>}
                {selectedPlayer == "A" && isPlayerSelected &&
                    <div className={true ? false ? "pointerNone inputAmtDiv" : "inputAmtDiv" : isTimerOver ? "DN" : "DN"}>
                        {!showInputDiv && <div style={{ display: "flex" }}>
                            <div className="plusBtn" onClick={() => minusInputVal()}><a>-</a></div>
                            <input className="inputAmtBox " type="number" placeholder="₹00.00" ref={inputAmtRef} onChange={() => inputAmtOnChange()} />
                            <div className="plusBtn" onClick={() => addInputVal()}><a>+</a></div>
                        </div>}
                        {!showInputDiv && <div style={{ display: "block", marginTop: "1%" }} className={" plusBtn placeBtn"}
                            onClick={() => placeOrder()}><a>place</a></div>}
                    </div>}
            </div>
            <div className="middleLineContainer">
                {/* <div className= { greenTimer ? "greenTimer" : yellowTimer ? "yellowTimer" : "redTimer" }>00:{timeLeft<10?"0"+timeLeft:timeLeft}</div> */}
                <div className="greenTimer">00:{timeLeft < 10 ? "0" + timeLeft : timeLeft}</div>

                <div className={isGameOver && isAWinner ? "middleLine  rotateBy45 middleLineAWinner" : isBWinner && isGameOver ? "middleLine  rotateByMinus45 middleLineBWinner" : "middleLine middleLineShadow  thread"}  >
                    <div className="middleLineDot"></div>
                    <div className="winnerPosterText winnerPoster pendulum thread">WINNER</div>
                    {/* <div class="shadow"></div> */}
                </div>

                {!startNewGame && <div className="playBtn" onClick={() => letsPlay()}>
                    Play!
                </div>}




            </div>

            <div className={isBWinner && isGameOver ? "playerBTable winnerTableLight " : "playerBTable normalTableLight"}>
                <div className="playerNameText">PLAYER B {playedAmt != 0 && isPlayerSelected && <span>{selectedPlayer == "B" ? "+₹" + playedAmt : "-₹" + playedAmt}</span>}</div>
                <div className="cardOuterDiv">
                    <div className="card1">
                        <div className="cardNumberText">CARD b1</div>
                        {showCard4 && showCard && <img style={{ height: "100%", width: "100%", border: "0px", marginTop: "-70%" }} src={deckimg[3]} alt="" />}
                    </div>
                    <div className="card2">
                        <div className="cardNumberText">CARD b2</div>
                        {showCard5 && showCard && <img style={{ height: "100%", width: "100%", marginTop: "-70%" }} src={deckimg[4]} alt="" />}
                    </div>
                    <div className="card3">
                        <div className="cardNumberText">CARD b3</div>
                        {showCard6 && showCard && <img style={{ height: "100%", width: "100%", marginTop: "-70%" }} src={deckimg[5]} alt="" />}
                    </div>

                </div>
                {startNewGame && < div className={isPlayerSelected ?
                    selectedPlayer == "B" ?
                        showInputDiv ?
                            "selectPlayerB successSelectedPlayerBox pointerNone"
                            : "selectPlayerB successSelectedPlayerBox"
                        : showInputDiv ?
                            "selectPlayerB yetToSelectPlayerBox pointerNone"
                            : "selectPlayerB yetToSelectPlayerBox"
                    : showInputDiv
                        ? "selectPlayerB yetToSelectPlayerBox disableDiv"
                        : "selectPlayerB yetToSelectPlayerBox  blink_me"}
                    onClick={() => onClickPlayer("B")} >{setPlayer2Name}

                </div>}
                {selectedPlayer == "B" && isPlayerSelected &&
                    <div className={true ? false ? "pointerNone inputAmtDiv" : "inputAmtDiv" : isTimerOver ? "DN" : "DN"}>
                        {!showInputDiv && <div style={{ display: "flex" }}>
                            <div className="plusBtn" onClick={() => minusInputVal()}><a>-</a></div>
                            <input className="inputAmtBox " type="number" placeholder="₹00.00" ref={inputAmtRef} onChange={() => inputAmtOnChange()} />
                            <div className="plusBtn" onClick={() => addInputVal()}><a>+</a></div>
                        </div>}
                        {!showInputDiv && <div style={{ display: "block", marginTop: "1%" }} className={" plusBtn placeBtn"}
                            onClick={() => placeOrder()}><a>place</a></div>}
                    </div>}
            </div>

        </>
    )
}
