import React from 'react';
import { useUserState } from '../../users';
import Traveler from '../traveler/traveler';
import styles from './travelers.module.css';

const Travelers = () => {
    const person = useUserState();
    return(
        <ul className={styles.users}>
            {person.map((person) => (
                <Traveler key={person.id} person={person} id={person.id} />
            ))}
        </ul>
    );
};

export default Travelers;