import React from 'react'
import PrivateRoute from '../../components/privateRoute'
import Navbar from '../../components/navbar';
import { Grid } from 'semantic-ui-react';

import Clients from '../clients'
import Home from '../home'
import Stocks from '../stocks';
import Auctions from '../auctions';
import AuctionDetails from '../auctions/details';

export default function HomeContainer() {

    return (
        <div>
            <Navbar />
            <Grid columns={1} divided style={{ marginTop: 10 }}>
                <Grid.Row>
                    <Grid.Column>
                        {/* <PrivateRoute path="/app/home" component={Home} /> */}
                        <PrivateRoute path="/app/auctions" exact component={Auctions} />
                        <PrivateRoute path="/app/auctions/:id" component={AuctionDetails} />
                        <PrivateRoute path="/app/stocks" component={Stocks} />
                        <PrivateRoute path="/app/clients" component={Clients} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
