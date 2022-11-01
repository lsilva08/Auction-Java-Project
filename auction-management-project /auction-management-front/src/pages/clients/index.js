import React, { useEffect, useMemo, useState } from 'react'
import { notify } from 'react-notify-toast'
import { useHistory } from 'react-router-dom'
import { Table, Label, Card, Button, Icon, Popup, Input, Pagination } from 'semantic-ui-react'
import axios from '../../api'
import AddClientModal from '../../components/modals/addClient'
import EditClientModal from '../../components/modals/editClient'
import _ from 'lodash'

export default function Clients() {

    const pageSize = 10
    const history = useHistory()
    const [clients, setClients] = useState([])
    const [search, setSearch] = useState('')
    const [token, setToken] = useState("")
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deletePopupClientId, setDeletePopupClientId] = useState(null)
    const [selectedClient, setSelectedClient] = useState(null)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        const jsonAuthData = localStorage.getItem("@authData")
        if (!jsonAuthData) {
            history.push('/login')
        }
        else {
            const { access_token } = JSON.parse(jsonAuthData);
            setToken(access_token)
            getClients(access_token)
        }
    }, [])

    const renderizedClients = useMemo(() => {
        return clients.filter(client =>
            client.id.toString().includes(search)
            || (client.firstName + " " + client.lastName).includes(search)
            || client.address.includes(search)
            || client.town.includes(search)
            || client.country.includes(search)
            || client.postcode.includes(search)
            || client.email.includes(search)
            || client.phone.includes(search)
        )
    }, [clients, search])

    async function getClients(token) {
        try {
            const response = await axios.get('/clients',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                setClients(response.data)
            }
        } catch (err) {
            notify.show("Unable to get the list of clients, please try again", "error")
        }
    }

    async function createNewClient(client) {
        try {
            const response = await axios.post('/clients',
                client,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                notify.show("Successfully created new client", "success")
                getClients(token)
            }
        } catch (err) {
            notify.show("Unable to create new client", "error")
        }
    }

    async function editClient(client) {
        try {
            const response = await axios.put(`/clients/${client.id}`,
                client,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                notify.show("Successfully updated client " + client.id, "success")
                getClients(token)
            }
        } catch (err) {
            notify.show("Unable to update client", "error")
        }
    }

    async function removeClient(id) {
        try {
            const response = await axios.delete(`/clients/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 204) {
                notify.show("Successfully deleted client " + id, "success")
                getClients(token)
            }
        } catch (err) {
            notify.show("Unable to delete client", "error")
        }
    }

    return (
        <>
            <div style={{ padding: 80 }}>
                <Card style={{ width: '100%' }}>
                    <Card.Content style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Label ribbon color="black" style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            Clients list
                        </Label>
                        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Input
                                icon='search'
                                style={{ width: 500, marginRight: 30 }}
                                size="large"
                                value={search}
                                onChange={(event, { value }) => { setSearch(value) }}
                                placeholder='Search...'
                            />
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                color="black"
                                style={{ color: 'white' }}
                                onClick={() => { setCreateModalOpen(true) }}
                                size='small'>
                                <Icon name='add' /> Add client
                            </Button>
                        </div>

                    </Card.Content>
                    <Card.Content>
                        <Table>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Address</Table.HeaderCell>
                                    <Table.HeaderCell>Town</Table.HeaderCell>
                                    <Table.HeaderCell>Country</Table.HeaderCell>
                                    <Table.HeaderCell>Post Code</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Phone</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    _.chunk(renderizedClients, pageSize)[activePage - 1]?.map(client => (
                                        <Table.Row key={client.id}>
                                            <Table.Cell style={{ fontWeight: 'bold' }} >{client.id}</Table.Cell>
                                            <Table.Cell>{client.firstName} {client.lastName}</Table.Cell>
                                            <Table.Cell>{client.address}</Table.Cell>
                                            <Table.Cell>{client.town}</Table.Cell>
                                            <Table.Cell>{client.country}</Table.Cell>
                                            <Table.Cell>{client.postcode}</Table.Cell>
                                            <Table.Cell>{client.email}</Table.Cell>
                                            <Table.Cell>{client.phone}</Table.Cell>
                                            <Table.Cell>
                                                <Button.Group>
                                                    <Button icon="edit" onClick={() => {
                                                        setSelectedClient(client)
                                                        setEditModalOpen(true)
                                                    }}></Button>
                                                    <Button.Or />
                                                    <Popup
                                                        open={deletePopupClientId === client?.id}
                                                        onClose={() => { setDeletePopupClientId(null) }}
                                                        onOpen={() => { setDeletePopupClientId(client?.id) }}
                                                        trigger={
                                                            <Button
                                                                negative
                                                                icon="remove"
                                                            />
                                                        }
                                                        content={
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                                                <p>Are you sure you want to delete this client?</p>
                                                                <Button.Group>
                                                                    <Button
                                                                        color='red'
                                                                        content='No'
                                                                        onClick={() => {
                                                                            setDeletePopupClientId(null)
                                                                        }} />
                                                                    <Button.Or />
                                                                    <Button
                                                                        color='green'
                                                                        content='Yes'
                                                                        onClick={() => {
                                                                            removeClient(client.id)
                                                                            setDeletePopupClientId(null)
                                                                        }} />
                                                                </Button.Group>
                                                            </div>
                                                        }
                                                        on='click'
                                                        position='top right'
                                                    />

                                                </Button.Group>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='10' style={{ textAlign: 'center' }}>
                                        <Pagination
                                            activePage={activePage}
                                            totalPages={Math.ceil(renderizedClients.length / pageSize)}
                                            onPageChange={(e, { activePage }) => {
                                                setActivePage(activePage)
                                            }}
                                        />
                                    </Table.HeaderCell>
                                </Table.Row>

                            </Table.Footer>

                        </Table>
                    </Card.Content>
                </Card>

            </div >
            <AddClientModal
                open={createModalOpen}
                setOpen={() => { setCreateModalOpen(!createModalOpen) }}
                onFinish={(client) => {
                    createNewClient(client)
                }}
            />
            <EditClientModal
                open={editModalOpen}
                setOpen={() => { setEditModalOpen(!editModalOpen) }}
                client={selectedClient}
                onFinish={(client) => {
                    editClient(client)
                }}
            />
        </>
    )
}
