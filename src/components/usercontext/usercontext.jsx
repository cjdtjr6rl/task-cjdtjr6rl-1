import React, { memo, useState } from 'react';
import { useUserDispatch, useUserNextId, useUserState } from '../../users';
import Reservation from '../reservation/reservation';
import styles from './usercontext.module.css';

const UserContext = memo(() => {
    const [form, setForm] = useState({
        all: false,
        necessary: false,
        option: false
    });
    const { all, necessary, option } = form;

    const dispatch = useUserDispatch();
    const nextId = useUserNextId();
    const people = useUserState();
    const [users, setUsers] = useState(people[0]);
    const elast = users.Celast;
    const efirst = users.Cefirst;
    const kname = users.Ckname;
    const male= users.Cmale;
    const birth = users.Cbirth;
    const hour = users.Chour;
    const minute = users.Cminute;
    const pname = users.Cpname;
    const phone = users.Cphone;
    const extra = users.Cextra;

    function check(v, id, k) {
        if(v) {
            setUsers({
                ...users,
                Celast: !elast,
                Cefirst: !efirst,
                Ckname: !kname,
                Cmale: !male,
                Cbirth: !birth,
                Chour: !hour,
                Cminute: !minute,
                Cpname: !pname,
                Cphone: !phone,
                Cextra: !extra,
            })
            dispatch({
                type: "CHECK_VALIDATION",
                id,
                k,
                v,
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = nextId.current - 1;
        const key = Object.keys(users);
        const val = Object.values(users);
        let count = 0;
        if(people[0].elast.length < 2) {
            const k = key[11];
            const v = val[11];
            check(v, id, k);
            count++;
        }
        if(people[0].efirst.length < 2) {
            const k = key[12];
            const v = val[12];
            check(v, id, k);
            count++;
        }
        if(people[0].kname.length < 2) {
            const k = key[13];
            const v = val[13];
            check(v, id, k);
            count++;
        }
        if(people[0].gender === '') {
            const k = key[14];
            const v = val[14];
            check(v, id, k);
            count++;
        }
        if(people[0].birth.length < 6) {
            const k = key[15];
            const v = val[15];
            check(v, id, k);
            count++;
        }
        if(people[0].hour === '시') {
            const k = key[16];
            const v = val[16];
            check(v, id, k);
            count++;
        }
        if(people[0].minute === '분') {
            const k = key[17];
            const v = val[17];
            check(v, id, k);
            count++;
        }
        if(people[0].pname.length < 2) {
            const k = key[18];
            const v = val[18];
            check(v, id, k);
            count++;
        }
        if(people[0].phone.length < 6) {
            const k = key[19];
            const v = val[19];
            check(v, id, k);
            count++;
        }
        if(people[0].extra.length < 1) {
            const k = key[20];
            const v = val[20];
            check(v, id, k);
            count++;
        }
        if(people[0].cc === false) {
            const k = key[21];
            const v = val[21];
            setUsers({
                ...users,
                Celast: !elast,
                Cefirst: !efirst,
                Ckname: !kname,
                Cmale: !male,
                Cbirth: !birth,
                Chour: !hour,
                Cminute: !minute,
                Cpname: !pname,
                Cphone: !phone,
                Cextra: !extra,
            })
            dispatch({
                type: "CHECK_VALIDATION",
                id,
                k,
                v,
            })
        }
        if(count === 0) {
            setForm({
                all: false,
                necessary: false,
                option: false
            });
            dispatch({
                type: "RESERVATION",
                id,
            });
            nextId.current += 1;
        }
    }

    const onSubmit = (check) => {
        const { name, checked } = check.target;
        if(name === 'all') {
            setForm({
                ...form,
                all: checked,
                necessary: checked,
                option: checked
            })
        } else {
            setForm({
                ...form,
                [name]: checked
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.app}>
            <div className={styles.body}>
                <Reservation />
                <section className={styles.form}>
                    <span className={styles.title}>약관 동의</span>
                    <div className={styles.allcheck}>
                        <div className={styles.first}>
                            <input name="all" className={styles.checkbox} type="checkbox" onChange={onSubmit} checked={all} />
                            <b className={styles.agree}>전체 약관 동의</b>
                        </div>
                        <div className={styles.select}>
                            <div className={styles.check}>
                                <input name="necessary" className={styles.checkbox} type="checkbox" onChange={onSubmit} checked={necessary} />
                                <span className={styles.agree}>여행자 약관 동의 (필수)</span>
                            </div>
                            <div className={styles.check}>
                                <input name="option" className={styles.checkbox} type="checkbox" onChange={onSubmit} checked={option} />
                                <span className={styles.agree}>특가 항공권 및 할인 혜택 안내 동의 (선택)</span>
                            </div>
                        </div>
                        {
                            necessary ? <button type="submit" className={styles.submit}>결제하기</button> : <button className={styles.nope} disabled>결제하기</button>
                        }
                    </div>
                </section>
            </div>
        </form>
    );
});

export default UserContext;