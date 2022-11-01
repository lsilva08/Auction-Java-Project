import React, { useEffect, useState, useMemo } from 'react'
import { notify } from 'react-notify-toast'
import { useHistory } from 'react-router-dom'
import { Table, Label, Card, Button, Icon, Popup, Input, Pagination } from 'semantic-ui-react'
import axios from '../../api'
import AddStockModal from '../../components/modals/addStock'
import EditStockModal from '../../components/modals/editStock'
import _ from 'lodash'

export default function Stocks() {

    const pageSize = 10
    const history = useHistory()
    const [stocks, setStocks] = useState([])
    const [search, setSearch] = useState('')
    const [token, setToken] = useState("")
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deletePopupStockId, setDeletePopupStockId] = useState(null)
    const [selectedStock, setSelectedStock] = useState(null)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        const jsonAuthData = localStorage.getItem("@authData")
        if (!jsonAuthData) {
            history.push('/login')
        }
        else {
            const { access_token } = JSON.parse(jsonAuthData);
            setToken(access_token)
            getStocks(access_token)
        }
    }, [])

    const renderizedStocks = useMemo(() => {
        return stocks.filter(stock =>
            stock.name.includes(search)
            || stock.store.includes(search)
            || stock.category.includes(search)
            || stock.reserve.toString().includes(search)
            || stock.initialEstimate.toString().includes(search)
            || stock.finalEstimate.toString().includes(search)
            || stock.buyNowPrice.toString().includes(search)
            || stock.longDescription.includes(search)
            || stock.quantity.toString().includes(search)
            || stock.weight.toString().includes(search)
        )
    }, [stocks, search])

    async function getStocks(token) {
        try {
            const response = await axios.get('/stocks',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                setStocks(response.data)
            }
        } catch (err) {
            notify.show("Unable to get the list of stocks, please try again", "error")
        }
    }

    async function createNewStock(stock) {
        try {
            const response = await axios.post('/stocks',
                stock,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                notify.show("Successfully created new stock", "success")
                getStocks(token)
            }
        } catch (err) {
            notify.show("Unable to create new stock", "error")
        }
    }

    async function editStock(stock) {
        try {
            const response = await axios.put(`/stocks/${stock.id}`,
                stock,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                notify.show("Successfully updated stock " + stock.id, "success")
                getStocks(token)
            }
        } catch (err) {
            notify.show("Unable to update stock", "error")
        }
    }

    async function removeStock(id) {
        try {
            const response = await axios.delete(`/stocks/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 204) {
                notify.show("Successfully deleted stock " + id, "success")
                getStocks(token)
            }
        } catch (err) {
            notify.show("Unable to delete stock", "error")
        }
    }

    return (
        <>
            <div style={{ padding: 80 }}>
                <Card style={{ width: '100%' }}>
                    <Card.Content style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Label ribbon color="black" style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            Stocks list
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
                                <Icon name='add' /> Add stock
                            </Button>

                        </div>
                    </Card.Content>
                    <Card.Content>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Store</Table.HeaderCell>
                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                    <Table.HeaderCell>Reserve</Table.HeaderCell>
                                    <Table.HeaderCell>Estimate Price</Table.HeaderCell>
                                    <Table.HeaderCell>Buy now price</Table.HeaderCell>
                                    <Table.HeaderCell>Long Description</Table.HeaderCell>
                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Weight</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    _.chunk(renderizedStocks, pageSize)[activePage - 1]?.map(stock => (
                                        <Table.Row key={stock.id}>
                                            <Table.Cell style={{ fontWeight: 'bold' }} >{stock.id}</Table.Cell>
                                            <Table.Cell>{stock.store}</Table.Cell>
                                            <Table.Cell>{stock.category}</Table.Cell>
                                            <Table.Cell>{stock.reserve}</Table.Cell>
                                            <Table.Cell>{stock.initialEstimate} - {stock.finalEstimate}</Table.Cell>
                                            <Table.Cell>{stock.buyNowPrice}</Table.Cell>
                                            <Table.Cell>{stock.longDescription}</Table.Cell>
                                            <Table.Cell>{stock.quantity}</Table.Cell>
                                            <Table.Cell>{stock.weight}</Table.Cell>
                                            <Table.Cell>
                                                <Button.Group>
                                                    <Button icon="edit" onClick={() => {
                                                        setSelectedStock(stock)
                                                        setEditModalOpen(true)
                                                    }}></Button>
                                                    <Button.Or />
                                                    <Popup
                                                        open={deletePopupStockId === stock?.id}
                                                        onClose={() => { setDeletePopupStockId(null) }}
                                                        onOpen={() => { setDeletePopupStockId(stock?.id) }}
                                                        trigger={
                                                            <Button
                                                                negative
                                                                icon="remove"
                                                            />
                                                        }
                                                        content={
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                                                <p>Are you sure you want to delete this stock?</p>
                                                                <Button.Group>
                                                                    <Button
                                                                        color='red'
                                                                        content='No'
                                                                        onClick={() => {
                                                                            setDeletePopupStockId(null)
                                                                        }} />
                                                                    <Button.Or />
                                                                    <Button
                                                                        color='green'
                                                                        content='Yes'
                                                                        onClick={() => {
                                                                            removeStock(stock.id)
                                                                            setDeletePopupStockId(null)
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
                                            totalPages={Math.ceil(renderizedStocks.length / pageSize)}
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
            {token && <AddStockModal
                open={createModalOpen}
                setOpen={() => { setCreateModalOpen(!createModalOpen) }}
                token={token}
                onFinish={(stock) => {
                    createNewStock(stock)
                }}
            />}
            {token && <EditStockModal
                open={editModalOpen}
                setOpen={() => { setEditModalOpen(!editModalOpen) }}
                token={token}
                stock={selectedStock}
                onFinish={(stock) => {
                    editStock(stock)
                }}
            />}

        </>
    )
}
