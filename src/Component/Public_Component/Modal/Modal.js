import {React,useRef,useEffect} from "react";
import "./Modal.css";

export default function Modal({ setOpenModal, title,addClicked }) {
  const inputAmtRef = useRef(null);

  useEffect(() => {      
    inputAmtRef.current.focus();
},[]);

  const AddBtnClicked = ()=>{
    if(inputAmtRef.current.value>=100)
    {
    addClicked(inputAmtRef.current.value);
    setOpenModal(false);
    }
    else{
    alert("Please Enter Valid or minimun of 100");
    }

  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <div className="title">
            <div style={{ display: "flex", alignItems: "center", paddingLeft: "2%", height: "100%" }}>{title}</div>
          </div>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="modalContent">
          <div className="body">
            <div style={{ display: 'flex', textTransform: "initial", fontWeight: "bold", justifyContent: "space-around", padding: "1%" }}> Enter Amount
              <div style={{ width: "50%" }}>
                <input style={{ width: "80%",    background: "#bdbdbd" }} type="number"  ref={inputAmtRef}></input>
              </div>
            </div>
            <div style={{ display: 'flex', textTransform: "initial", fontWeight: "bold", justifyContent: "space-around", padding: "1%" }}>
              Payment Type
              <div style={{ width: "50%",cursor:"not-allowed" }}>
                <select disabled style={{ width: "80%", background: "#bdbdbd"}} value="Select">
                  <option value="Orange">Trial</option>
                  <option value="Radish">Email</option>
                  <option value="Cherry">Focut ka</option>
                </select>
              </div>
            </div>
          </div>


          <div className="footer">
            {/* <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button> */}
            <button  onClick={() => {
                AddBtnClicked();
              }}>ADD</button>
          </div>
        </div>
      </div>
    </div>
  );
}