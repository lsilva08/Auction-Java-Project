import React, { useMemo, useState } from 'react'
import { Button, Modal, Form, Input, TextArea, Checkbox } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import { format } from 'date-fns'

export default function AddAuctionModal({
    open,
    setOpen,
    onFinish
}) {

    const [name, setName] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [finalLongDescription, setFinalLongDescription] = useState("")
    const [importantInformation, setImportantInformation] = useState("")
    const [timedAuction, setTimedAuction] = useState(false)
    const [buyItNowAuction, setBuyItNowAuction] = useState(false)
    const [venueAddressBuyersFinancials, setVenueAddressBuyersFinancials] = useState(false)
    const [venueAddressVendorsFinancials, setVenueAddressVendorsFinancials] = useState(false)
    const [venueAddressNonFinancials, setVenueAddressNonFinancials] = useState(false)
    const [startDate, setStartDate] = useState(new Date());

    const longDescription = useMemo(() => {
        return finalLongDescription || shortDescription
    }, [shortDescription, finalLongDescription])


    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Header>Add new auction</Modal.Header>
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
                            placeholder='Important information'
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
                    content="Create"
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