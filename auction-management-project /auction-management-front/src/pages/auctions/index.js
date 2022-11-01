import React, { useEffect, useState, useMemo } from 'react'
import { notify } from 'react-notify-toast'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Label, Card, Input, Button, Icon, Pagination } from 'semantic-ui-react'
import axios from '../../api'
import AuctionCard from '../../components/auctionCard'
import AddAuctionModal from '../../components/modals/addAuction'
import _ from 'lodash'

export default function Auctions() {

    const pageSize = 8
    const history = useHistory()
    const match = useRouteMatch();
    const [auctions, setAuctions] = useState([])
    const [search, setSearch] = useState('')
    const [token, setToken] = useState("")
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        const jsonAuthData = localStorage.getItem("@authData")
        if (!jsonAuthData) {
            history.push('/login')
        }
        else {
            if (match.url === "/app/auctions") {
                const { access_token } = JSON.parse(jsonAuthData);
                setToken(access_token)
                getAuctions(access_token)
            }
        }
    }, [history])

    const renderizedAuctions = useMemo(() => {
        return auctions.filter(auction =>
            auction?.name?.includes(search)
            || auction?.startDate?.includes(search)
            || auction?.longDescription?.includes(search)
            || auction?.importantInformation?.toString().includes(search)
        )
    }, [auctions, search])

    async function getAuctions(token) {
        try {
            const response = await axios.get('/auctions',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                setAuctions(response.data)
            }
        } catch (err) {
            notify.show("Unable to get the list of auctions, please try again", "error")
        }
    }

    async function createNewAuction(auction) {
        try {
            const response = await axios.post('/auctions',
                auction,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                notify.show("Successfully created new auction", "success")
                getAuctions(token)
            }
        } catch (err) {
            notify.show("Unable to create new auction", "error")
        }
    }

    return (
        <>
            <div style={{ padding: 80 }}>
                <Card style={{ width: '100%' }}>
                    <Card.Content style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Label ribbon color="black" style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            Auctions list
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
                                onClick={() => { setCreateModalOpen(true) }}
                                icon
                                labelPosition='left'
                                color="black"
                                size='small'>
                                <Icon name='add' /> Add auction
                            </Button>
                        </div>
                    </Card.Content>
                    <Card.Content>
                        <Card.Group itemsPerRow={4}>
                            {_.chunk(renderizedAuctions, pageSize)[activePage - 1]?.map(auction => (
                                <AuctionCard
                                    image="https://static.thenounproject.com/png/1927884-200.png"
                                    title={auction?.name}
                                    meta={auction?.startDate}
                                    description={auction?.longDescription}
                                    footerIcon="exclamation"
                                    footerText={auction?.importantInformation}
                                    onClick={() => {
                                        history.push('/app/auctions/' + auction?.id, { token })
                                    }}
                                />
                            ))}
                        </Card.Group>
                    </Card.Content>
                    <Card.Content style={{ textAlign: 'center' }} >
                        <Pagination
                            activePage={activePage}
                            totalPages={Math.ceil(renderizedAuctions.length / pageSize)}
                            onPageChange={(e, { activePage }) => {
                                setActivePage(activePage)
                            }}
                        />
                    </Card.Content>
                </Card>

            </div >
            {token && <AddAuctionModal
                open={createModalOpen}
                setOpen={() => { setCreateModalOpen(!createModalOpen) }}
                token={token}
                onFinish={(auction) => {
                    createNewAuction(auction)
                }}
            />}
        </>
    )
}
