import React from 'react'
import Navigation from '../Public_Component/Navigation/Navigation'

export default function About() {
    return (
        <>
        <Navigation isAboutActive={true}/>
        <div style={{color: 'white'}}>
            This is about page.....
        </div>
        </>
    )
}
