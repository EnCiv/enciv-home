import React, {useState} from 'react'
import TopNavBar from 'civil-pursuit/app/components/top-nav-bar'
import BrevoJoin from '../components/brevo-join'

export default function Home(props) {
    const { subject, description } = props
    const [showRegForm,setRegForm]=useState(false)

    return (
        <div>
            <TopNavBar mode={'dark'} />
            <div>
                <button onClick={()=>setRegForm(!showRegForm)}>
                    {"Join the Community"}
                </button>
                {showRegForm && <BrevoJoin />}
            </div>
            <div>This is the rest of the web site</div>
        </div>
    )
}
