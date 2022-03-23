import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { Fragment } from 'react'
import Head from 'next/head'


export default function NewMeetupPage() {
    const router = useRouter()

    async function onAddMeetupHandler(enterMeetupData) {
        //console.log(enterMeetupData)
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enterMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        console.log(data)

        router.push('/')
    }

    return <Fragment>
                <Head>
                    <title>Add A New Meetup</title>
                    <meta name="description" 
                        content='Browse a huge listof highly active React meetups!' />
                </Head>
            </Fragment>
}
