import React, {useState} from 'react'
import TopNavBar from 'civil-pursuit/app/components/top-nav-bar'
import HeroBlock from '../components/hero-block'
import BrevoJoin from '../components/brevo-join'

export default function Home(props) {
    const { subject, description } = props
    const [showRegForm,setRegForm]=useState(false)

    return (
        <div>
            <TopNavBar mode={'dark'} />
            <HeroBlock imgUrl={'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png'} subject={"Politics is dividing us - EnCiv is uniting us"} actionText={"Join the community"} />
        </div>
    )
}
