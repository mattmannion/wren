import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_BIRTHWORKER } from '../../utils/queries';
import { ASSOCIATE_WITH_WORKER } from '../../utils/mutations';

function BirthWorkerProfile() {
    const [associateWithWorker] = useMutation(ASSOCIATE_WITH_WORKER)
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(QUERY_BIRTHWORKER, {
        variables: { username: userParam }
    })

    const aww = async () => {
        try {
            await associateWithWorker({
                variables: {id: birthworker._id}
            })
        } catch (e) {
            console.error(e)
        }
    }

    // console.log(data)

    const birthworker = data?.birthworker || {};

    if(loading) {
        return <div>Loading BirthWorker's Profile</div>
    }

    return(
        <div>
            <h3>Viewing {birthworker.username}'s Profile</h3>
            <div>
                <p>{birthworker.firstname}</p>
                <p>{birthworker.lastname}</p>
                <p>{birthworker.email}</p>

                <button onClick={aww}>Add Worker</button>
            </div>
        </div>
    );
}

export default BirthWorkerProfile; 