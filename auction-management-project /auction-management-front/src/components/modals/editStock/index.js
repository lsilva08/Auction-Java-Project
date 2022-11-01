import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Form, Input, Select, TextArea } from 'semantic-ui-react'
import api from '../../../api'

export default function AddStockModal({
    stock,
    token,
    open,
    setOpen,
    onFinish
}) {

    const [name, setName] = useState(stock?.name)
    const [store, setStore] = useState(stock?.store)
    const [category, setCategory] = useState(stock?.category)
    const [reserve, setReserve] = useState(stock?.reserve)
    const [initialEstimate, setInitialEstimate] = useState(stock?.initialEstimate)
    const [finalEstimate, setFinalEstimate] = useState(stock?.finalEstimate)
    const [buyNowPrice, setBuyNowPrice] = useState(stock?.buyNowPrice)
    const [shortDescription, setShortDescription] = useState(stock?.shortDescription)
    const [finalLongDescription, setFinalLongDescription] = useState(stock?.finalLongDescription)
    const [quantity, setQuantity] = useState(stock?.quantity)
    const [weight, setWeight] = useState(stock?.weight)
    const [notes, setNotes] = useState(stock?.notes)
    const [client, setClient] = useState(stock?.client?.id)
    const [auction, setAuction] = useState(stock?.auction?.id)

    const [clients, setClients] = useState([])
    const [auctions, setAuctions] = useState([])

    const longDescription = useMemo(() => {
        return finalLongDescription || shortDescription
    }, [shortDescription, finalLongDescription])

    const clientsOptions = useMemo(() => {
        return clients.map(client => {
            return {
                key: client.id,
                text: `${client.firstName} ${client.lastName} - ${client.id}`,
                value: client.id
            }
        })
    }, [clients])

    const auctionsOptions = useMemo(() => {
        return auctions.map(auction => {
            return {
                key: auction.id,
                text: auction.name,
                value: auction.id
            }
        })
    }, [auctions])

    useEffect(() => {
        async function findData() {
            const clientsResponse = await api.get('/clients',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            const auctionsResponse = await api.get('/auctions',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setClients(clientsResponse.data)
            setAuctions(auctionsResponse.data)
        }
        findData()
        return () => {
            setClients([])
            setAuctions([])
        }
    }, [])

    useEffect(() => {
        setName(stock?.name)
        setStore(stock?.store)
        setCategory(stock?.category)
        setReserve(stock?.reserve)
        setInitialEstimate(stock?.initialEstimate)
        setFinalEstimate(stock?.finalEstimate)
        setBuyNowPrice(stock?.buyNowPrice)
        setShortDescription(stock?.shortDescription)
        setFinalLongDescription(stock?.finalLongDescription)
        setQuantity(stock?.quantity)
        setWeight(stock?.weight)
        setNotes(stock?.notes)
        setClient(stock?.client?.id)
        setAuction(stock?.auction?.id)

        return () => {
            setName("")
            setStore("")
            setCategory("")
            setReserve("")
            setInitialEstimate(0)
            setFinalEstimate(0)
            setBuyNowPrice(0)
            setShortDescription("")
            setFinalLongDescription("")
            setQuantity("")
            setWeight("")
            setNotes("")
            setClient("")
            setAuction("")
        }
    }, [stock])

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Header>Edit stock - {stock?.id}</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group widths="equal" style={{ marginTop: 25 }}>
                        <Form.Field>
                            <label>Name</label>
                            <Input
                                placeholder='Name'
                                value={name}
                                onChange={(event, { value }) => { setName(value) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <Input
                                placeholder='Store'
                                value={store}
                                onChange={(event, { value }) => { setStore(value) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <Input
                                placeholder='Category'
                                value={category}
                                onChange={(event, { value }) => { setCategory(value) }}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths={4}>
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Reserve</label>
                            <Input
                                placeholder='Reserve'
                                value={reserve}
                                onChange={(event, { value }) => { setReserve(value) }}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Initial estimate</label>
                            <Input
                                placeholder='Initial estimate'
                                value={initialEstimate}
                                onChange={(event, { value }) => { setInitialEstimate(value) }}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Final estimate</label>
                            <Input
                                placeholder='Final estimate'
                                value={finalEstimate}
                                onChange={(event, { value }) => { setFinalEstimate(value) }}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <label>Buy now price</label>
                            <Input
                                placeholder='BuyNowPrice'
                                value={buyNowPrice}
                                onChange={(event, { value }) => { setBuyNowPrice(value) }}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Short description</label>
                        <TextArea
                            placeholder='Short description'
                            value={shortDescription}
                            onChange={(event, { value }) => { setShortDescription(value) }}
                        />
                    </Form.Field>
                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Long description</label>
                        <TextArea
                            placeholder='Long description'
                            value={longDescription}
                            onChange={(event, { value }) => { setFinalLongDescription(value) }}
                        />
                    </Form.Field>
                    <Form.Group>
                        <Form.Field style={{ marginTop: 25 }} width={4}>
                            <label>Quantity</label>
                            <Input
                                placeholder='Quantity'
                                value={quantity}
                                onChange={(event, { value }) => { setQuantity(value) }}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }} width={4}>
                            <label>Weight</label>
                            <Input
                                placeholder='Weight'
                                value={weight}
                                onChange={(event, { value }) => { setWeight(value) }}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }} width={8}>
                            <label>Notes</label>
                            <TextArea
                                placeholder='Notes'
                                value={notes}
                                onChange={(event, { value }) => { setNotes(value) }}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths={2}>
                        <Form.Field style={{ marginTop: 25 }}
                            control={Select}
                            options={clientsOptions}
                            label={{ children: 'Client', htmlFor: 'form-select-control-client' }}
                            placeholder='Client'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                            value={client}
                            onChange={(event, { value }) => { setClient(value) }}
                        >
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}
                            control={Select}
                            options={auctionsOptions}
                            label={{ children: 'Auction', htmlFor: 'form-select-control-auction' }}
                            placeholder='Auction'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                            value={auction}
                            onChange={(event, { value }) => { setAuction(value) }}
                        >
                        </Form.Field>
                    </Form.Group>

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
                            id: stock?.id,
                            name,
                            store,
                            category,
                            reserve,
                            initialEstimate,
                            finalEstimate,
                            buyNowPrice,
                            shortDescription,
                            longDescription,
                            quantity,
                            weight,
                            notes,
                            clientId: client,
                            auctionId: auction,
                        })
                        setOpen(false)
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}