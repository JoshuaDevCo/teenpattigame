import React from 'react'
import './Loader.css'
export default function Loader(props) {
    return (
        <>

            <div className={props.showLoader? "loaderContainer":"loaderContainer DN"}>
                <div class="wrapper">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <span>Loading</span>
                </div>
            </div>

        </>
    )
}
