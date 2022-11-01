import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Form, Input, Checkbox, TextArea } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import { format, parseISO } from 'date-fns'

export default function EditAuctionModal({
    auction,
    open,
    setOpen,
    onFinish
}) {

    const [name, setName] = useState(auction?.name)
    const [shortDescription, setShortDescription] = useState(auction?.shortDescription)
    const [finalLongDescription, setFinalLongDescription] = useState(auction?.longDescription)
    const [importantInformation, setImportantInformation] = useState(auction?.importantInformation)
    const [timedAuction, setTimedAuction] = useState(auction?.timedAuction)
    const [buyItNowAuction, setBuyItNowAuction] = useState(auction?.buyItNowAuction)
    const [venueAddressBuyersFinancials, setVenueAddressBuyersFinancials] = useState(auction?.venueAddressBuyersFinancials)
    const [venueAddressVendorsFinancials, setVenueAddressVendorsFinancials] = useState(auction?.venueAddressVendorsFinancials)
    const [venueAddressNonFinancials, setVenueAddressNonFinancials] = useState(auction?.venueAddressNonFinancials)
    const [startDate, setStartDate] = useState(parseISO(auction?.startDate))

    const longDescription = useMemo(() => {
        return finalLongDescription || shortDescription
    }, [shortDescription, finalLongDescription])


    useEffect(() => {
        setName(auction?.name)
        setShortDescription(auction?.shortDescription)
        setFinalLongDescription(auction?.longDescription)
        setImportantInformation(auction?.importantInformation)
        setTimedAuction(auction?.timedAuction)
        setBuyItNowAuction(auction?.buyItNowAuction)
        setVenueAddressBuyersFinancials(auction?.venueAddressBuyersFinancials)
        setVenueAddressVendorsFinancials(auction?.venueAddressVendorsFinancials)
        setVenueAddressNonFinancials(auction?.venueAddressNonFinancials)
        setStartDate(parseISO(auction?.startDate))

        return () => {
            setName("")
            setShortDescription("")
            setFinalLongDescription("")
            setImportantInformation("")
            setTimedAuction(false)
            setBuyItNowAuction(false)
            setVenueAddressBuyersFinancials(false)
            setVenueAddressVendorsFinancials(false)
            setVenueAddressNonFinancials(false)
            setStartDate("")
        }
    }, [auction])

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Header>Edit auction - {auction?.id}</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input
                            placeholder='Name'
                            value={name}
                            onChange={(event, { value }) => { setName(value) }}
                        />
                    </Form.Field>
                    <Form.Field>
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
                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Important information</label>
                        <TextArea
                            placeholder='Important information'
                            value={importantInformation}
                            onChange={(event, { value }) => { setImportantInformation(value) }}
                        />
                    </Form.Field>
                    <Form.Field style={{ marginTop: 25 }}>
                        <label>Start date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </Form.Field>
                    <Form.Group widths={5}>
                        <Form.Field style={{ marginTop: 25 }}>
                            <Checkbox
                                label="Timed auction"
                                onChange={() => { setTimedAuction(!timedAuction) }}
                                checked={timedAuction}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <Checkbox
                                label="Buy it now auction"
                                onChange={() => { setBuyItNowAuction(!buyItNowAuction) }}
                                checked={buyItNowAuction}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <Checkbox
                                label="Venue address buyers financials"
                                onChange={() => { setVenueAddressBuyersFinancials(!venueAddressBuyersFinancials) }}
                                checked={venueAddressBuyersFinancials}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <Checkbox
                                label="Venue address vendors financials"
                                onChange={() => { setVenueAddressVendorsFinancials(!venueAddressVendorsFinancials) }}
                                checked={venueAddressVendorsFinancials}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginTop: 25 }}>
                            <Checkbox
                                label="Venue address non financials"
                                onChange={() => { setVenueAddressNonFinancials(!venueAddressNonFinancials) }}
                                checked={venueAddressNonFinancials}
                            />
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
                            name,
                            shortDescription,
                            longDescription,
                            importantInformation,
                            timedAuction,
                            buyItNowAuction,
                            venueAddressBuyersFinancials,
                            venueAddressVendorsFinancials,
                            venueAddressNonFinancials,
                            startDate: format(startDate.setDate(startDate.getDate() + 1), "yyyy-MM-dd")
                        })
                        setOpen(false)
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}