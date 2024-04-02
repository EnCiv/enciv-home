import React from 'react'
import TopNavBar from 'civil-pursuit/app/components/top-nav-bar'

export default function Home(props) {
    const { subject, description } = props
    return (
        <div>
            <TopNavBar mode={'dark'} />
            <div style={{ textAlign: 'center' }}>{subject}</div>
            <div style={{ textAlign: 'center' }}>{description}</div>
            <div style={{ textAlign: 'center' }}>Welcome!</div>
        </div>
    )
}
