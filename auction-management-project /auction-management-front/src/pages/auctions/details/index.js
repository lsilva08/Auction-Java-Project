import React, { useEffect, useState } from 'react'
import { notify } from 'react-notify-toast'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Header, Image, Tab, List, Checkbox, Icon, Button, Popup } from 'semantic-ui-react'
import api from '../../../api'
import EditAuctionModal from '../../../components/modals/editAuction'

export const DetailsRow = ({ label, value, checkbox }) => {
    return (
        <Grid.Row>
            <Grid.Column style={{ marginLeft: 5 }}>
                <b style={{ marginRight: 15 }}>{label}: </b>
                {
                    checkbox
                        ? (
                            <Checkbox checked={value} />
                        )
                        : (
                            value
                        )
                }
            </Grid.Column>
        </Grid.Row>
    )
}

const Details = ({ auction }) => {
    return (
        <Tab.Pane>
            <Grid>
                <DetailsRow label="Name" value={auction?.name} />
                <DetailsRow label="Short description" value={auction?.shortDescription} />
                <DetailsRow label="Long description" value={auction?.longDescription} />
                <DetailsRow label="Important information" value={auction?.importantInformation} />
                <DetailsRow label="Start date" value={auction?.startDate} />
                <DetailsRow label="Timed auction" checkbox value={auction?.timedAuction} />
                <DetailsRow label="Buy it now auction" checkbox value={auction?.buyItNowAuction} />
                <DetailsRow label="Venue address buyers financials" checkbox value={auction?.venueAddressBuyersFinancials} />
                <DetailsRow label="Venue address vendors financials" checkbox value={auction?.venueAddressVendorsFinancials} />
                <DetailsRow label="Venue address non financials" checkbox value={auction?.venueAddressNonFinancials} />
            </Grid>
        </Tab.Pane>
    )
}

const RelatedStocks = ({ auction, token }) => {

    const [stocks, setStocks] = useState([])

    useEffect(async () => {
        const response = await api.get(`auctions/${auction?.id}/stocks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setStocks(response.data)

        return () => {
            setStocks([])
        }
    }, [token, auction])

    return (
        <Tab.Pane>
            <List selection verticalAlign='middle'>
                {stocks.map(stock => (
                    <List.Item style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon name="box" size="large" />
                        <List.Content>
                            <List.Header>{stock.name} (x{stock.quantity})</List.Header>
                            {stock?.client?.firstName} {stock?.client?.lastName}<br />
                            {stock?.shortDescription}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </Tab.Pane>
    )

}

export default function AuctionDetails() {

    const history = useHistory()
    const { id } = useParams()
    const [auction, setAuction] = useState()
    const [token, setToken] = useState("")
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [deletePopupOpen, setDeletePopupOpen] = useState(false)

    const panes = [
        { menuItem: 'Details', render: () => <Details auction={auction} /> },
        { menuItem: 'Stocks', render: () => <RelatedStocks auction={auction} token={token} /> }
    ]

    async function getAuction() {
        try {
            const response = await api.get(`/auctions/${auction.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                setAuction(response.data)
            }
        } catch (err) {
            notify.show("Unable to get auction information", "error")
        }
    }

    async function editAuction(editedAuction) {
        try {
            const response = await api.put(`/auctions/${editedAuction.id}`,
                { ...editedAuction, stocks: [] },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                notify.show("Successfully updated auction " + editedAuction.id, "success")
                getAuction()
            }
        } catch (err) {
            notify.show("Unable to update auction", "error")
        }
    }

    async function removeAuction(id) {
        try {
            const response = await api.delete(`/auctions/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 204) {
                notify.show("Successfully deleted auction " + id, "success")
                getAuction()
            }
        } catch (err) {
            notify.show("Unable to delete auction", "error")
        }
    }

    useEffect(() => {
        const jsonAuthData = localStorage.getItem("@authData")
        if (!jsonAuthData) {
            history.push('/login')
        }
        else {
            const { access_token } = JSON.parse(jsonAuthData);
            setToken(access_token)
        }
    }, [])

    useEffect(async () => {
        if (token) {
            const response = await api.get(`/auctions/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            setAuction(response.data)
        }
        return () => {
            setAuction()
        }
    }, [token])

    return (
        <>
            <Grid columns={3} divided>
                <Grid.Row columns={1}>
                    <Grid.Column style={{ backgroundColor: '#F5F5F5', padding: 20 }}>
                        <Header as='h2'>
                            <Image circular src='https://static.thenounproject.com/png/1927884-200.png' />
                            <Header.Content>
                                {auction?.name}
                                <Header.Subheader>{auction?.longDescription}</Header.Subheader>
                            </Header.Content>
                            <Header.Content style={{ marginLeft: 50 }}>
                                <Button circular icon='edit' size="medium" onClick={() => { setUpdateModalOpen(true) }} />
                                <Popup
                                    open={deletePopupOpen}
                                    onClose={() => { setDeletePopupOpen(false) }}
                                    onOpen={() => { setDeletePopupOpen(true) }}
                                    trigger={
                                        <Button circular icon='trash' color="red" size="medium" onClick={() => {

                                        }} />
                                    }
                                    content={
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <p>Are you sure you want to delete this auction?</p>
                                            <Button.Group>
                                                <Button
                                                    color='red'
                                                    content='No'
                                                    onClick={() => {
                                                        setDeletePopupOpen(false)
                                                    }} />
                                                <Button.Or />
                                                <Button
                                                    color='green'
                                                    content='Yes'
                                                    onClick={() => {
                                                        removeAuction(auction?.id)
                                                        setDeletePopupOpen(false)
                                                        history.goBack()
                                                    }} />
                                            </Button.Group>
                                        </div>
                                    }
                                    on='click'
                                    position='top right'
                                />
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Tab panes={panes} style={{ width: '96vw', marginLeft: '2vw' }} />
                </Grid.Row>
            </Grid>
            {token && <EditAuctionModal
                open={updateModalOpen}
                setOpen={() => { setUpdateModalOpen(!updateModalOpen) }}
                token={token}
                auction={auction}
                onFinish={(editedAuction) => {
                    editAuction({ ...editedAuction, id: auction.id })
                }}
            />}
        </>
    )
}
