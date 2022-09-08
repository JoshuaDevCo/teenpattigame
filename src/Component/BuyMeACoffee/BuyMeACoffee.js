import { React, useState } from 'react';
import './BuyMeACoffee.css'
import { Modal } from 'react-bootstrap';
import qrcode from './Buymeacoffee.jpeg'

export default function BuyMeACoffee() {
    const [smShow, setSmShow] = useState(false);
    return (
        <>
            <div className="containeCoffee">
                <div onClick={() => setSmShow(true)} className="textCoffeeContainer">Buy me a Coffee <img style={{ height: "7%", width: "100%", transform: 'rotate(90deg)', marginTop: '3%' }} src="https://www.freeiconspng.com/thumbs/coffee-icon-png/coffee-icon-png-31.png" /></div>
            </div>


            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Buy Me A Coffee:))
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 style={{textAlign:"center",borderBottom:"solid"}}>Scan this Code to pay</h4>
                    <img src={qrcode} style={{height: "10%",width: "100%"}}></img>
                    <h4 style={{textAlign:"center",borderTop:"solid"}}>Thanks:))</h4>    
                </Modal.Body>

            </Modal>
        </>
    )
}
