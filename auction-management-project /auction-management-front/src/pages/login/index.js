import React, { useState } from 'react'
import { notify } from 'react-notify-toast'
import { useHistory } from 'react-router-dom'
import { Card, Label, Form, Button, Input } from 'semantic-ui-react'
import axios from '../../api'

function Login() {

    const history = useHistory()
    const authClient = "client"
    const authSecret = "123"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [hasError, setHasError] = useState(false)


    async function login() {
        try {
            const formData = new FormData()
            formData.set('grant_type', 'password')
            formData.set('username', username)
            formData.set('password', password)

            const response = await axios.post(
                '/oauth/token',
                formData,
                {
                    auth: {
                        username: authClient,
                        password: authSecret
                    }
                }
            )
            if (response.status === 200) {
                localStorage.setItem('@authData', JSON.stringify(response.data))
                history.push('/app/auctions')
            }
        }
        catch (err) {
            setHasError(true)
            notify.show("Invalid username or password, please verify your credentials", "error")
        }
    }


    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '30vw', minHeight: '30%' }} >
                <Card.Content header={() => (
                    <Label ribbon color="black" style={{ fontSize: 15 }}>Login</Label>
                )} />
                <Card.Content>
                    <Form>
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Username</label>
                            <Input error={hasError} placeholder='Username' value={username} onChange={(event, { value }) => { setUsername(value) }} />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Password</label>
                            <Input error={hasError} type="password" placeholder='Password' value={password} onChange={(event, { value }) => { setPassword(value) }} />
                        </Form.Field>
                        <Form.Field style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                            <Button type='submit' color="black" onClick={login}>Sign in</Button>
                        </Form.Field>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    );
}

export default Login;
