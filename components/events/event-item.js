import Button from "../ui/button";
import ArrowIcon from "../icons/arrow-icon";
import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import classes from './event-item.module.css'

const EventItem = ({ title, image, date, location, id }) => {

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const formattedAddress = location.replace(', ', '\n')
    const exploreLink = `/events/${id}`

    return (
    <li className={classes.item}>
        <img src={'/' + image} alt={title}/>
        <div className={classes.content}>
            <div className={classes.summary}>
                <h2>{title}</h2>
                <div className={classes.date}>
                    <DateIcon/>
                    <time>{humanReadableDate}</time>
                </div>
                <div className={classes.address}>
                    <AddressIcon/>
                    <address>{formattedAddress}</address>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}><ArrowIcon/></span>
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    </li>
    )
}

export default EventItem;