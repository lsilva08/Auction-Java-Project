import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import './styles.css'

export default function AuctionCard({
    image,
    title,
    meta,
    description,
    footerIcon,
    footerText,
    onClick
}) {
    return (
        <Card className="auction-card" onClick={onClick}>
            <Card.Content>
                <Image floated="left" src={image} size="tiny" />
                <Card.Header>{title}</Card.Header>
                <Card.Meta>{meta}</Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name={footerIcon} />
                    {footerText}
                </a>
            </Card.Content>
        </Card>
    )
}