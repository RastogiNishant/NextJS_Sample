import { Fragment } from "react"
import { useRouter } from "next/router"
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import ResultTitle from '../../components/events/results-title'
import ErrorAlert from '../../components/ui/error-alert'
import Button from "../../components/ui/button"

const FilteredEventsPage = () => {
    const router = useRouter()
    const filteredData = router.query.slug
    if (!filteredData) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className="center">Loading...</p>
                </ErrorAlert>
            </Fragment>
        )
    }

    const numYear = +filteredData[0]
    const numMonth = +filteredData[1]

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 ||  numMonth > 12 || numMonth < 1 ) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values.</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No Events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <ResultTitle date={new Date(numYear, numMonth - 1)}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}

export default FilteredEventsPage