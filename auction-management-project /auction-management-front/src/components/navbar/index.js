import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'

export default function Navbar() {

    const history = useHistory()

    const fixed = true

    return (
        <Menu
            style={{ backgroundColor: '#1F1F23' }}
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="massive"
        >
            <Container>
                {/* <Menu.Item style={{ color: 'white' }} as='a' active onClick={() => { history.push('/app/home') }} >
                    Home
                </Menu.Item> */}
                <Menu.Item style={{ color: 'white' }} as='a' onClick={() => { history.push('/app/clients') }}>Clients</Menu.Item>
                <Menu.Item style={{ color: 'white' }} as='a' onClick={() => { history.push('/app/stocks') }}>Stocks</Menu.Item>
                <Menu.Item style={{ color: 'white' }} as='a' onClick={() => { history.push('/app/auctions') }}>Auctions</Menu.Item>
                <Menu.Item style={{ color: '' }} position='right'>
                    <Button
                        inverted={!fixed}
                        onClick={() => {
                            localStorage.removeItem('@authData')
                            history.push('/login')
                        }}
                        icon='sign-out'
                        content="Sign out"
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
