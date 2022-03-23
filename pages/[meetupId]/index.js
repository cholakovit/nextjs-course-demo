import { Fragment } from "react";
//import { getStaticProps } from "..";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetails(props) {
    return (
        <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description} />
    )
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://madal:madal@cluster0.uv14l.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

    client.close()

    return {
        fallback: false,
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    //fetch data for a single meetup

    //context.params

    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://madal:madal@cluster0.uv14l.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

    client.close()

    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                title={selectedMeetup.title}
                address={selectedMeetup.address}
                image={selectedMeetup.image}
                description={selectedMeetup.description}
            />
        </Fragment>
    )

    // return {
    //     props: {
    //         meetupData: {
    //             id: selectedMeetup._id.toString(),
    //             title: selectedMeetup.title,
    //             address: selectedMeetup.address,
    //             image: selectedMeetup.image,
    //             description: selectedMeetup.description
    //         }
    //     }
    // }
}