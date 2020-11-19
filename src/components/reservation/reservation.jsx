import React from 'react';
import { useUserState } from '../../users';
import DetailInfo from '../detailinfo/detailinfo';
import Travelers from '../travelers/travelers';
import styles from './reservation.module.css';

function Reservation() {
    const person = useUserState();
    return (
        <section className={styles.reservation}>
            <Travelers />
            {person.map((person) => (
                <DetailInfo key={person.id} person={person} id={person.id} />
            ))}
        </section>
    );
};

export default Reservation;