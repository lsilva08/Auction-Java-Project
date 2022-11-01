import Axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'

export default function EditClientModal({
    client,
    open,
    setOpen,
    onFinish
}) {
    const [finalDisplayName, setFinalDisplayName] = useState(client?.displayName)
    const [title, setTitle] = useState(client?.title || "Mr.")
    const [firstName, setFirstName] = useState(client?.firstName)
    const [lastName, setLastName] = useState(client?.lastName)
    const [address, setAddress] = useState(client?.address)
    const [town, setTown] = useState(client?.town)
    const [country, setCountry] = useState(client?.country)
    const [postcode, setPostcode] = useState(client?.postcode)
    const [email, setEmail] = useState(client?.email)
    const [phone, setPhone] = useState(client?.phone)

    const [countries, setCountries] = useState([])

    const displayName = useMemo(() => {
        return finalDisplayName || (firstName + " " + lastName)
    }, [finalDisplayName, firstName, lastName])

    const countriesOptions = useMemo(() => {
        return countries.map(countryName => {
            return {
                key: countryName,
                text: countryName,
                value: countryName
            }
        })
    }, [countries])

    const titleOptions = [
        { key: 'Mr.', text: 'Mr.', value: 'Mr.' },
        { key: 'Mrs.', text: 'Mrs.', value: 'Mrs.' },
        { key: 'Miss.', text: 'Miss.', value: 'Miss.' },
        { key: 'Sir.', text: 'Sir.', value: 'Sir.' },
        { key: 'Dr.', text: 'Dr.', value: 'Dr.' },
        { key: 'Lady.', text: 'Lady.', value: 'Lady.' },
        { key: 'Lord.', text: 'Lord.', value: 'Lord.' },
    ]

    useEffect(() => {
        async function findCountries() {
            const response = await Axios.get(
                'https://parseapi.back4app.com/classes/Country?limit=300&order=name&keys=name',
                {
                    headers: {
                        'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
                        'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
                    }
                }
            )
            setCountries(response.data.results.map(c => c.name))
        }
        findCountries()
        return () => {
            setFinalDisplayName("")
            setTitle("")
            setFirstName("")
            setLastName("")
            setAddress("")
            setTown("")
            setCountry("")
            setPostcode("")
            setEmail("")
            setPhone("")
        }
    }, [])

    useEffect(() => {
        setFinalDisplayName(client?.displayName)
        setTitle(client?.title || "Mr.")
        setFirstName(client?.firstName)
        setLastName(client?.lastName)
        setAddress(client?.address)
        setTown(client?.town)
        setCountry(client?.country)
        setPostcode(client?.postcode)
        setEmail(client?.email)
        setPhone(client?.phone)

        return () => {
            setFinalDisplayName("")
            setTitle("")
            setFirstName("")
            setLastName("")
            setAddress("")
            setTown("")
            setCountry("")
            setPostcode("")
            setEmail("")
            setPhone("")
        }
    }, [client])

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Header>Edit client - {client?.id}</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group widths="equal" style={{ marginTop: 25 }}>
                        <Form.Field
                            control={Select}
                            options={titleOptions}
                            label={{ children: 'Title', htmlFor: 'form-select-control-title' }}
                            placeholder='Title'
                            searchInput={{ id: 'form-select-control-gender' }}
                            value={title}
                            onChange={(event, { value }) => {
                                setTitle(value)
                            }}
                        />
                        <Form.Field>
                            <label>First Name</label>
                            <Input
                                placeholder='First Name'
                                value={firstName}
                                onChange={(event, { value }) => { setFirstName(value) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <Input
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(event, { value }) => { setLastName(value) }}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Display name</label>
                        <Input
                            placeholder='Display name'
                            value={displayName}
                            onChange={(event, { value }) => { setFinalDisplayName(value) }}
                        />
                    </Form.Field>
                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Address</label>
                        <Input
                            placeholder='Address'
                            value={address}
                            onChange={(event, { value }) => { setAddress(value) }}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Town</label>
                            <Input
                                placeholder='Town'
                                value={town}
                                onChange={(event, { value }) => { setTown(value) }}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Post code</label>
                            <Input
                                placeholder='Post code'
                                value={postcode}
                                onChange={(event, { value }) => { setPostcode(value) }}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}
                            control={Select}
                            options={countriesOptions}
                            label={{ children: 'Country', htmlFor: 'form-select-control-country' }}
                            placeholder='Country'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                            value={country}
                            onChange={(event, { value }) => { setCountry(value) }}
                        >
                        </Form.Field>
                    </Form.Group>

                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Email</label>
                        <Input
                            placeholder='Email'
                            value={email}
                            onChange={(event, { value }) => { setEmail(value) }}
                        />
                    </Form.Field>
                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Phone</label>
                        <Input
                            placeholder='Phone'
                            value={phone}
                            onChange={(event, { value }) => { setPhone(value) }}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Update"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => {
                        onFinish({
                            id: client?.id,
                            displayName: finalDisplayName || (firstName + " " + lastName),
                            title,
                            firstName,
                            lastName,
                            address,
                            town,
                            country,
                            postcode,
                            email,
                            phone,
                        })
                        setOpen(false)
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}