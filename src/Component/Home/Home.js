import { React, useState, useEffect, useLayoutEffect, useRef } from 'react'
// import './Navigation.css'
import './Home.css';
import axios from 'axios';
import Navigation from '../Public_Component/Navigation/Navigation.js';
import UserInfoBar from '../UserInfo/UserInfoBar.js';
import Loader from '../Public_Component/Loader/Loader.js';
import InputModal from '../InputModal/InputModal.js';
import RecentWinners from '../RecentWinners/RecentWinners';
import BuyMeACoffee from '../BuyMeACoffee/BuyMeACoffee';

import { auth, db } from '../firebase-config'
import {
    collection,
    getDoc,
    doc,
    updateDoc,
    arrayUnion
} from "firebase/firestore";




export default function Home() {
    const [totalBalance, setTotalBalance] = useState();
    const [userDetails, setUserDetails] = useState({ name: "", email: "", totalBalance: 0, lastGameCompleted: false });
    const [showLoader, setShowLoader] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(true);
    const [toUpdateFireBase, setToUpdateFireBase] = useState(false);

    const [isAWinner, setIsAWinner] = useState(false);
    const [isBWinner, setIsBWinner] = useState(false);
    const [setPlayer1Name, setSetPlayer1Name] = useState("Select playera");
    const [setPlayer2Name, setSetPlayer2Name] = useState("Select playerb")

    const [pACard, setPACard] = useState([]);
    const [pBCard, setPBCard] = useState([]);

    const [isGameOver, setIsGameOver] = useState(false);
    const [isTimerOver, setIsTimerOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    // const [showCard, setShowCard] = useState([false,false,false,false,false,false]);
    const [showCard, setShowCard] = useState(false);
    const [showCard1, setShowCard1] = useState(false);
    const [showCard2, setShowCard2] = useState(false);
    const [showCard3, setShowCard3] = useState(false);
    const [showCard4, setShowCard4] = useState(false);
    const [showCard5, setShowCard5] = useState(false);
    const [showCard6, setShowCard6] = useState(false);
    const [isPlayerSelected, setIsPlayerSelected] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [startNewGame, setStartNewGame] = useState(false);
    const [playedAmt, setPlayedAmt] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [betPlacedSuccess, setBetPlacedSuccess] = useState(false);
    const [winnerList, setWinnerList] = useState([]);









    const [deckimg, setDeckimg] = useState([]);

    useEffect(() => {
        if (!startNewGame)
            getUsers(auth.currentUser.uid);
    }, [startNewGame]);

    const getUsers = async (uid) => {
        setShowLoader(true);
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails({
                    name: docSnap.data().name,
                    email: docSnap.data().emailId,
                    totalBalance: docSnap.data().balance,
                    lastGameCompleted: docSnap.data().lastGameCompleted
                });
                setWinnerList(docSnap.data().winnerList);
                // console.log(winnerList);
                setTotalBalance(docSnap.data().balance);
                // console.log(userDetails);
            } else {
                console.log("No such document!");
            }
            setShowLoader(false);
        }

        catch (error) {
            alert(error.message);
            setShowLoader(false);
        }

    }

    const updateBalaceFirebaseWithWinner = async (uid, amt, winner) => {
        // var tempList = winnerList;
        // tempList.push(winner);
        try {
            setShowLoader(true);
            const userDoc = await doc(db, "users", uid);
            const newFields = await { balance: amt, winnerList: arrayUnion(winner) };
            const obj = await updateDoc(userDoc, newFields);
            setShowLoader(false);

        }
        catch (error) {
            ;
            console.log(error.message);
            setShowLoader(false);

        }

    }


    const updateBalaceFirebase = async (uid, amt) => {
        var flag = false;
        try {
            setShowLoader(true);
            const userDoc = await doc(db, "users", uid);
            const newFields = await { balance: amt };
            const obj = await updateDoc(userDoc, newFields);
            setShowLoader(false);
            flag = true;
            return flag;

        }
        catch (error) {
            console.log(error.message);
            setShowLoader(false);
            flag = false;
            return flag;

        }
    };

    const rechargeAccount = (amt) => {
        var promise = updateBalaceFirebase(auth.currentUser.uid, parseFloat(totalBalance) + parseFloat(amt));
        promise.then(function (result) {
            if (result) {
                console.log(result);
                setTotalBalance(parseFloat(totalBalance) + parseFloat(amt))
                
            } 
            // , function (err) {}
        
        })


    }




    useLayoutEffect(() => {
        if (startNewGame) {
            setIsAWinner(false);
            setIsBWinner(false);
            setIsGameOver(false);
            setIsTimerOver(false);
            // setShowCard(["false","false","false","false","false","false"]);
            // setShowCard([]);
            setShowCard1(false);
            setShowCard2(false);
            setShowCard3(false);
            setShowCard4(false);
            setShowCard5(false);
            setShowCard6(false);
            setIsPlayerSelected(false);
            setSelectedPlayer("");
            setIsAWinner(false);
            setIsBWinner(false);
            setPlayedAmt(0);


        }


    }, [startNewGame]);


    // timer
    useEffect(() => {
        if (startNewGame) {
            if (timeLeft === 0) {
                // console.log("TIME LEFT IS 0");
                setTimeLeft(0);
                setIsTimerOver(true);
            }

            // exit early when we reach 0
            if (!timeLeft) return;

            // save intervalId to clear the interval when the
            // component re-renders
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            // clear interval on re-render to avoid memory leaks
            return () => clearInterval(intervalId);
        }
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft, startNewGame]);

    const getIdAsDate = () => {
        var dateObj = new Date();
        var month = dateObj.getMonth() + 1;
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();
        var hour = dateObj.getHours();
        var minute = dateObj.getMinutes();
        var second = dateObj.getSeconds();

        return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;

    }

    //check winner
    const checkAndupdateBal = (winner, pAcards, pBcards) => {
        var id = getIdAsDate();
        if (winner == "A" && selectedPlayer == "A" && betPlacedSuccess == true) {
            var tempWinnerObj = { winner: true, winnerP: "A", pAcard: pAcards, pBcard: pBcards, id: id, amount: playedAmt }
            updateBalaceFirebaseWithWinner(auth.currentUser.uid, totalBalance + playedAmt * 2, tempWinnerObj);
        }
        else if (winner == "B" && selectedPlayer == "B" && betPlacedSuccess == true) {
            var tempWinnerObj = { winner: true, winnerP: "B", pAcard: pAcards, pBcard: pBcards, id: id, amount: playedAmt }
            updateBalaceFirebaseWithWinner(auth.currentUser.uid, totalBalance + playedAmt * 2, tempWinnerObj);

        }
        else if (betPlacedSuccess == true) {
            var tempWinnerObj = { winner: false, winnerP: winner, pAcard: pAcards, pBcard: pBcards, id: id, amount: playedAmt }
            updateBalaceFirebaseWithWinner(auth.currentUser.uid, totalBalance, tempWinnerObj);
        }
        else {
            var tempWinnerObj = { winner: false, winnerP: winner, pAcard: pAcards, pBcard: pBcards, id: id, amount: playedAmt }
            updateBalaceFirebaseWithWinner(auth.currentUser.uid, totalBalance + playedAmt * 2, tempWinnerObj);
            // setTotalBalance(totalBalance-playedAmt);

        }
        // updateBalaceFirebase(auth.currentUser.uid,totalBalance + playedAmt * 2);
        // },)
        console.log(playedAmt);
    }

    //get the card
    useEffect(() => {
        if (isTimerOver) {
            axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(
                (response) => {
                    callCardApi(response.data.deck_id);
                })
        }
    }, [isTimerOver]);

    function callCardApi(deckid) {
        axios.get("https://deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=6").then((response) => {
            //var response={"cards": [{"code": "7C", "image": "https://deckofcardsapi.com/static/img/7C.png", "images": {"svg": "https://deckofcardsapi.com/static/img/7C.svg", "png": "https://deckofcardsapi.com/static/img/7C.png"}, "value": "7", "suit": "CLUBS"}, {"code": "6C", "image": "https://deckofcardsapi.com/static/img/6C.png", "images": {"svg": "https://deckofcardsapi.com/static/img/6C.svg", "png": "https://deckofcardsapi.com/static/img/6C.png"}, "value": "6", "suit": "CLUBS"}, {"code": "7S", "image": "https://deckofcardsapi.com/static/img/7S.png", "images": {"svg": "https://deckofcardsapi.com/static/img/7S.svg", "png": "https://deckofcardsapi.com/static/img/7S.png"}, "value": "7", "suit": "SPADES"}, {"code": "8C", "image": "https://deckofcardsapi.com/static/img/8C.png", "images": {"svg": "https://deckofcardsapi.com/static/img/8C.svg", "png": "https://deckofcardsapi.com/static/img/8C.png"}, "value": "8", "suit": "CLUBS"}, {"code": "QC", "image": "https://deckofcardsapi.com/static/img/QC.png", "images": {"svg": "https://deckofcardsapi.com/static/img/QC.svg", "png": "https://deckofcardsapi.com/static/img/QC.png"}, "value": "QUEEN", "suit": "CLUBS"}, {"code": "0S", "image": "https://deckofcardsapi.com/static/img/0S.png", "images": {"svg": "https://deckofcardsapi.com/static/img/0S.svg", "png": "https://deckofcardsapi.com/static/img/0S.png"}, "value": "10", "suit": "SPADES"}]};


            // setTimeout(function () {
            setDeckImage(response.data);
            // }, 5000);
            // console.log(response.data);

        })
    }

    function setDeckImage(data) {
        var tempPlayerACards = [];
        var tempPlayerBCards = [];
        setDeckimg(data.cards.map((e, i) => {
            if (i < 3) {
                tempPlayerACards.push(e);
            }
            else {
                tempPlayerBCards.push(e);
            }
            return e.images.png;
        }));

        setPACard(tempPlayerACards);
        setPBCard(tempPlayerBCards);
        showCardsOnInterval();
        playerCardValue(tempPlayerACards, tempPlayerBCards);
    }

    function playerCardValue(playerAVal, playerBVal) {
        var tempPlayerACardVal = [];
        var tempPlayerBCardVal = [];

        var tempPlayerACardSuits = [];
        var tempPlayerBCardSuits = [];

        tempPlayerACardVal = playerAVal.map((e) => {
            //    console.log(cardNumericValue(e.value));
            tempPlayerACardSuits.push(e.suit);
            return cardNumericValue(e.value);
        });

        tempPlayerBCardVal = playerBVal.map((e) => {
            tempPlayerBCardSuits.push(e.suit);
            return cardNumericValue(e.value)
        });

        var tempPlayerAScore = 0;
        var tempPlayerBScore = 0;

        tempPlayerAScore = getScore(tempPlayerACardVal, tempPlayerACardSuits);
        tempPlayerBScore = getScore(tempPlayerBCardVal, tempPlayerBCardSuits);

        var winner = checkWinner(tempPlayerAScore, tempPlayerBScore, tempPlayerACardVal, tempPlayerBCardVal);
        //    console.log(winner);
        checkAndupdateBal(winner, playerAVal, playerBVal);
    }

    function checkWinner(dealerScore, playerScore, tempPlayerACardVal, tempPlayerBCardVal) {
        var winner = "";
        if (dealerScore < playerScore) {
            winner = "A";
        } else if (playerScore < dealerScore) {
            winner = "B";
        }
        else {
            winner = updateHighCard(tempPlayerACardVal, tempPlayerBCardVal);
        }
        if (winner == "A") {
            setIsAWinner(true);
            setIsBWinner(false);

        }
        else if (winner == "B") {
            setIsBWinner(true);
            setIsAWinner(false);
        }

        return winner;



    }


    function showCardsOnInterval() {

        setTimeout(function () {
            setShowCard(true);
            setShowCard1(true);

        }, 1000)
        setTimeout(function () {
            setShowCard4(true);
        }, 2000)
        setTimeout(function () {
            setShowCard2(true);
        }, 3000)
        setTimeout(function () {
            setShowCard5(true);
        }, 4000)
        setTimeout(function () {
            setShowCard3(true);
        }, 5000)
        setTimeout(function () {
            setShowCard6(true);
        }, 6000);

        setTimeout(function () {
            setIsGameOver(true);
        }, 8000);


        setTimeout(function () {
            // setf(false);s
            setStartNewGame(false);
            setPlayedAmt(0);
        }, 10500);





    }


    //numeric value for suit Ace is '1'
    function cardNumericValue(value) {
        switch (value) {
            case "ACE":
                return 1;
            case "2":
                return 2;
            case "3":
                return 3;
            case "4":
                return 4;
            case "5":
                return 5;
            case "6":
                return 6;
            case "7":
                return 7;
            case "8":
                return 8;
            case "9":
                return 9;
            case "10":
                return 10;
            case "JACK":
                return 11;
            case "QUEEN":
                return 12;
            case "KING":
                return 13;
        }
    }

    function getScore(cardArrayValues, cardArraySuits) {

        if (isTrill(cardArrayValues))
            return 1;
        else if (isPureSequence(cardArrayValues, cardArraySuits))
            return 2;
        else if (isImPureSequence(cardArrayValues))
            return 3;
        else if (isColor(cardArraySuits))
            return 4;
        else if (isPair(cardArrayValues))
            return 5;
        return 6;

    }

    function isTrill(cardArrayValues) {

        return cardArrayValues.every((val, i, arr) => val === arr[0]);

    }

    function isPureSequence(cardArrayValues, cardArraySuits) {

        if (!(cardArraySuits.every((val, i, arr) => val === arr[0])))
            return 0;


        if (cardArrayValues[2] == cardArrayValues[1] + 1 && cardArrayValues[1] == cardArrayValues[0] + 1)
            return 1;

        //Q,K,A is also a sequence

        if (cardArrayValues[0] == 1 && cardArrayValues[1] == 12 && cardArrayValues[2] == 13)
            return 1;

        return 0;
    }

    function isImPureSequence(cardArrayValues) {

        if (cardArrayValues[2] == cardArrayValues[1] + 1 && cardArrayValues[1] == cardArrayValues[0] + 1)
            return 1;

        //Q,K,A is also a sequence

        if (cardArrayValues[0] == 1 && cardArrayValues[1] == 12 && cardArrayValues[2] == 13)
            return 1;

        return 0;
    }

    function isColor(cardArraySuits) {
        return cardArraySuits.every((val, i, arr) => val === arr[0]);
    }

    function isPair(cardArrayValues) {

        cardArrayValues.sort();
        if (cardArrayValues[0] == cardArrayValues[1] || cardArrayValues[1] == cardArrayValues[2])
            return 1;
        return 0;

    }

    //if both have the same dealer and player score
    function updateHighCard(dealerValues, playerValues) {
        var isPlayerWon = false;

        dealerValues.sort();
        playerValues.sort();

        //Ace is highest
        if (dealerValues[0] == 1)
            dealerValues[0] = 14;
        if (playerValues[0] == 1)
            playerValues[0] = 14;

        if (dealerValues[0] > playerValues[0]) {
            isPlayerWon = false;
        } else if (dealerValues[0] < playerValues[0]) {
            isPlayerWon = true;
        } else if (dealerValues[1] > playerValues[1]) {
            isPlayerWon = false;
        } else if (dealerValues[2] > playerValues[2]) {
            isPlayerWon = true;
        } else if (dealerValues[2] > playerValues[2]) {
            isPlayerWon = false;
        } else
            isPlayerWon = true;

        if (isPlayerWon == false) {
            return "A";
        }
        else
            return "B";
    }


    function onClickPlayer(player) {
        setModalOpen(true);
        setIsPlayerSelected(!isPlayerSelected);
        setSelectedPlayer(player);

    }


    function placeOrder(amt) {
        setTotalBalance(totalBalance - amt);
        var promise = updateBalaceFirebase(auth.currentUser.uid, totalBalance - amt);
        promise.then(function (result) {
            if (result) {
                setBetPlacedSuccess(true);
                setPlayedAmt(amt);
                if (selectedPlayer == "A" && !isPlayerSelected) {
                    setSetPlayer1Name("selected");
                    setSetPlayer2Name("dushman");

                }
                else if (selectedPlayer == "B" && !isPlayerSelected) {
                    setSetPlayer2Name("selected");
                    setSetPlayer1Name("dushman");
                }
            }
        }, function (err) {
            setBetPlacedSuccess(false);
            console.log(err);
            alert("Opps! Some error happend");
        });
        return promise;
    }


    function letsPlay() {
        setBetPlacedSuccess(false);
        setStartNewGame(true);
        setTimeLeft(15);
        setShowCard(false);
        setPlayedAmt(0);
    }





    return (
        <>

            {modalOpen  && <InputModal setOpenModal={setModalOpen} title={selectedPlayer} timeRemaining={timeLeft}
                totalBalance={totalBalance} timeOver={isTimerOver} placedClicked={placeOrder} />}
            <Loader showLoader={showLoader} />
            <Navigation isHomeActive={true} />
            <div className="headerClassHome" style={{
                height: "95%",
                width: "100%",
                background: "#212529",
                position: "absolute", borderRadius: "0px"
            }}>


                <UserInfoBar time={timeLeft < 10 ? "0" + timeLeft : timeLeft} balance={totalBalance} addBalance={rechargeAccount} userName={userDetails.name.charAt(0).toUpperCase() + userDetails.name.slice(1)} />
                <div className="middleContainerTable">
                <BuyMeACoffee/>
                    <div className={isAWinner && isGameOver ? "playerATable winnerTableLight" : "playerATable  normalTableLight"}>
                        <div className="playerNameText">PLAYER A {playedAmt != 0 && isPlayerSelected && betPlacedSuccess && <span>{selectedPlayer == "A" ? "+₹" + playedAmt : "-₹" + playedAmt}</span>}</div>
                        <div className="cardOuterDiv">
                            <div className="card1">
                                <div className="cardNumberText">{showCard1 ? "" : "A1"}</div>
                                {showCard1 && showCard && <img style={{ height: "100%", width: "100%"}} src={deckimg[0]} alt="" />}
                            </div>
                            <div className="card2">
                                <div className="cardNumberText">{showCard2 ? "" : "A2"}</div>
                                {showCard2 && showCard && <img style={{ height: "100%", width: "100%"}} src={deckimg[1]} alt="" />}
                            </div>
                            <div className="card3">
                                <div className="cardNumberText">{showCard3 ? "" : "A3"}</div>
                                {showCard3 && showCard && <img style={{ height: "100%", width: "100%" }} src={deckimg[2]} alt="" />}
                            </div>


                        </div>

                        {!isTimerOver && <div className={startNewGame ? selectedPlayer == "B" ? "selectPlayerA yetToSelectPlayerBox pointerNone" : selectedPlayer == "A" && betPlacedSuccess ? "selectPlayerA successSelectedPlayerBox pointerNone" : "selectPlayerA yetToSelectPlayerBox blink_me" : " selectPlayerA pointerNone"}
                            onClick={() => onClickPlayer("A")} >{setPlayer1Name}</div>}
                    </div>
                    <div className="middleLineContainer">
                        {/* <div className= { greenTimer ? "greenTimer" : yellowTimer ? "yellowTimer" : "redTimer" }>00:{timeLeft<10?"0"+timeLeft:timeLeft}</div> */}
                        {/* <div className="greenTimer">00:{timeLeft < 10 ? "0" + timeLeft : timeLeft}</div> */}

                        {startNewGame &&<div className={isGameOver && isAWinner ? "middleLine  rotateBy45 middleLineAWinner" : isBWinner && isGameOver ? "middleLine  rotateByMinus45 middleLineBWinner" : "middleLine middleLineShadow thread"}  >
                            <div className="middleLineDot"></div>
                            <div className="winnerPosterText winnerPoster pendulum thread">WINNER</div>
                            {/* <div class="shadow"></div> */}
                        </div>}

                        {!startNewGame && <div className="playBtn" onClick={() => letsPlay()}>
                            Play!
                        </div>}




                    </div>

                    <div className={isBWinner && isGameOver ? "playerBTable winnerTableLight " : "playerBTable normalTableLight"}>
                        <div className="playerNameText">PLAYER B {playedAmt != 0 && isPlayerSelected && betPlacedSuccess && <span>{selectedPlayer == "B" ? "+₹" + playedAmt : "-₹" + playedAmt}</span>}</div>
                        <div className="cardOuterDiv">
                            <div className="card1">
                                <div className="cardNumberText">{showCard4 ? "" : "b1"}</div>
                                {showCard4 && showCard && <img style={{ height: "100%", width: "100%", border: "0px" }} src={deckimg[3]} alt="" />}
                            </div>
                            <div className="card2">
                                <div className="cardNumberText">{showCard5 ? "" : "b2"}</div>
                                {showCard5 && showCard && <img style={{ height: "100%", width: "100%"}} src={deckimg[4]} alt="" />}
                            </div>
                            <div className="card3">
                                <div className="cardNumberText">{showCard6 ? "" : "b3"}</div>
                                {showCard6 && showCard && <img style={{ height: "100%", width: "100%" }} src={deckimg[5]} alt="" />}
                            </div>

                        </div>
                         {!isTimerOver && <div className={startNewGame ? selectedPlayer == "A" ? "selectPlayerB yetToSelectPlayerBox pointerNone" : selectedPlayer == "B" && betPlacedSuccess ? "selectPlayerB successSelectedPlayerBox pointerNone" : "selectPlayerB yetToSelectPlayerBox blink_me" : " selectPlayerB pointerNone"}
                            onClick={() => onClickPlayer("B")} >{setPlayer2Name}

                        </div>}
                    </div>
                </div>
                <div style={{ height: "10%",bottom: "0px",
    position: "absolute",
    width: "100%" }}>
                    <RecentWinners winners={winnerList} />
                </div>
            </div>
        </>
    )
}



