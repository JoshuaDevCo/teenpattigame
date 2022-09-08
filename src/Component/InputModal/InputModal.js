import { React, useRef, useEffect, useState } from "react";
import "./IputModal.css";

export default function InputModal({ setOpenModal, title, timeRemaining, totalBalance, timeOver, placedClicked }) {
    const inputAmtRef = useRef(null);
    const [initialInputVal, setInitialInputVal] = useState(0);
    const [playedAmt, setPlayedAmt] = useState(0);
    const [showPlaceBtn, setShowPlaceBtn] = useState(false);
    const [showPriceSuggestion, setShowPriceSuggestion] = useState(false);
    const [betPlaced, setBetPlaced] = useState(false);



    useEffect(() => {
        inputAmtRef.current.focus();
        setShowPriceSuggestion(true);
    }, []);


    function addInputVal() {
        // inputAmtRef.current.focus();
        if (initialInputVal + 100 <= totalBalance) {
            inputAmtRef.current.value = parseFloat(initialInputVal) + 100;
            setInitialInputVal(parseFloat(inputAmtRef.current.value));
        }
        else if (initialInputVal > totalBalance) {
            inputAmtRef.current.value = totalBalance;
            setInitialInputVal(totalBalance);

        }
        togglePlaceButton();
        // if (initialInputVal >= 100) {
        //     setEnablePlaceBtn(true);

        // }
        // else {
        //     setEnablePlaceBtn(false);
        // }

    }

    function minusInputVal() {
        // inputAmtRef.current.focus();
        if (initialInputVal - 100 >= 0) {
            inputAmtRef.current.value = parseFloat(initialInputVal) - 100;
            setInitialInputVal(parseFloat(inputAmtRef.current.value));
        }
        togglePlaceButton();

    }

    function inputAmtOnChange() {
        if (parseFloat(inputAmtRef.current.value) > totalBalance) {
            inputAmtRef.current.value = totalBalance;
            setInitialInputVal(parseFloat(inputAmtRef.current.value));
        }
        else if (parseFloat(inputAmtRef.current.value) <= 0) {
            inputAmtRef.current.value = 0;
            setInitialInputVal(parseFloat(inputAmtRef.current.value));

        }
        else {
            setInitialInputVal(parseFloat(inputAmtRef.current.value));
        }
        togglePlaceButton();


    }

    function togglePlaceButton() {
        if (parseFloat(inputAmtRef.current.value) >= 10) {
            setShowPlaceBtn(true);
        }
        else {
            setShowPlaceBtn(false);

        }
    }

    function placeOrder() {
        setPlayedAmt(playedAmt + initialInputVal);
        var promise = placedClicked(initialInputVal);//promise return to handle
        promise.then(function (result) {
            if (result) {
                inputAmtRef.current.value = 0;
                setInitialInputVal(0);
                setShowPlaceBtn(false);
                setBetPlaced(true);
                setTimeout(function () {
                    setOpenModal(false);
                }, 3000);
            }

        }, function (err) {
            console.log(err);
            alert("Opps! Some error happend");
        });




       
        // setShowInputDiv(true);
    }



    return (
        <div className="modalBackground">
            <div className="modalContaineri">
                <div className="titleCloseBtni">
                    <div className="title">
                        <div style={{ display: "flex", alignItems: "center", paddingLeft: "2%", height: "100%", justifyContent: "center" }}>{"SELECTED PLAYER " + "'" + title + "'"}</div>
                    </div>
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="modalContenti">
                    <div className="bodyi">
                        <div className={timeOver ? "timeri " : "timeri"}><h1 style={{ fontWeight: "bold" }} className={timeRemaining <= 5 ? "" : ""}>{timeOver ? "Time Over !" : timeRemaining < 10 ? "00:" + "0" + timeRemaining : "00:" + timeRemaining}</h1></div>
                        <div className="winnersection">
                            <div className="inputAmtDiv">
                                <div style={{ display: "flex" }}>
                                    <div className="plusBtn" onClick={() => minusInputVal()}><a>-</a></div>
                                    <input className="inputAmtBox " type="number" placeholder="₹00.00" ref={inputAmtRef} onChange={() => inputAmtOnChange()} />
                                    <div className="plusBtn" onClick={() => addInputVal()}><a>+</a></div>
                                </div>

                            </div>

                        </div>
                        {/* {setShowPriceSuggestion && <div className="suggestionBlock" >
                            <div className="suggestionDiv">100</div>
                            <div className="suggestionDiv">200</div>
                            <div className="suggestionDiv">500</div>
                            <div className="suggestionDiv">1000</div>
                            <div className="suggestionDiv">5000</div>
                            
                            </div>} */}
                        <div style={{ marginTop: "2%" }} className={showPlaceBtn ? " plusBtn placeBtn" : "disableDivi plusBtn placeBtn"}
                            onClick={() => placeOrder()}><a>Place</a></div>
                        {!showPlaceBtn && !betPlaced && <div><p style={{ color: "red" }}>* Please enter minimun of 10₹</p></div>}


                    </div>
                    {betPlaced && <div className="rubberDiv blink_me"><div class="rubber">Approved Bet on '{title}' of ₹ {playedAmt}</div></div>}


                    <div className="footer">
                        {/* <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button> */}
                        {/* <button  onClick={() => {
                AddBtnClicked();
              }}>ADD</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}