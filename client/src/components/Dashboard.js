import React from 'react'

function Dashboard(props) {
        return (
            <div>
                <p>Hello, {props.username} </p>
                <p>If you are reading this, you are apart of the circle. </p>
                <img alt="circle" src="https://ak3.picdn.net/shutterstock/videos/11746163/thumb/11.jpg" />
            </div>
        )
    
}
export default Dashboard