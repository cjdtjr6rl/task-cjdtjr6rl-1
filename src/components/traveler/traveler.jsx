import React, { memo, useCallback, useState } from 'react';
import { useUserDispatch } from '../../users';
import styles from './traveler.module.css';

const Traveler = memo(({ person, id }) => {
    const [users, setUsers] = useState(person);
    const { Celast, Cefirst, Ckname, Cmale, Cbirth } = person;
    const [elast, setElast] = useState(users.Celast);
    const [efirst, setEfirst] = useState(users.Cefirst);
    const [kname, setKname] = useState(users.Ckname);
    const [male, setMale] = useState(users.Cmale);
    const [birth, setBirth] = useState(users.Cbirth);
    
    const dispatch = useUserDispatch();

    const onChange = useCallback((e) => {
        function check(k, val) {
            dispatch({
                type: "CHECK_VALIDATION",
                id,
                k,
                val,
            })
        }
        const {name, value} = e.target;
        const target = e.currentTarget;
        const key = Object.keys(users);
        const val = false;
        
        if(target.name === 'elast') {
            target.value = target.value.replace(/[^A-Za-z\s]/,"");
            const k = key[11];
            if(target.value.length >= 2) {
                setElast(false);
            } else if(target.value.length < 2) {
                setElast(true);
                check(k, val)
            }
        } else if(target.name === 'efirst') {
            target.value = target.value.replace(/[^A-Za-z\s]/,"");
            const k = key[12];
            if(target.value.length >= 2) {
                setEfirst(false);
            } else if(target.value.length < 2) {
                setEfirst(true);
                check(k, val)
            }
        } else if(target.name === 'kname') {
            target.value = target.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|]/,"");
            const k = key[13];
            if(target.value.length >= 2) {
                setKname(false);
            } else if(target.value.length < 2) {
                setKname(true);
                check(k, val)
            }
        } else if(target.name === 'gender') {
            const k = key[14];
            setMale(target.value);
            check(k, val)
        } else if(target.name === 'birth') {
            target.value = target.value.replace(/[^0-9]/,"");
            const k = key[15];
            if(target.value.length >= 6) {
                setBirth(false);
            } else if(target.value.length < 6) {
                setBirth(true);
                check(k, val)
            }
        }
        setUsers({
            ...users,
            [name]: value
        })
        dispatch({
            type: "CHANGE_VALUE",
            id,
            name,
            value,
        })
    }, [dispatch, id, users]);

    return (
        <>
            <li className={styles.user}>
                <div className={styles.person}>
                    여행자<span className={styles.number}>1</span>
                </div>
                <div className={styles.notice}>예약하시는 모든 분의 정보를 여권 상과 동일하게 기입해 주시기바랍니다.</div>
                <article className={styles.english}>
                    <div className={styles.ename}>
                        <div className={styles.title}>영문 이름</div>
                        <input className={`${styles.input} ${(Celast || elast) && styles.inputwarn}`} type="text" name="elast" placeholder="Gil Dong" maxLength="20" onChange={onChange} />
                        { (Celast || elast) && <p className={styles.alert}>영어로 2자 이상 입력해주세요.</p> }
                    </div>
                    <div className={styles.ename}>
                        <div className={styles.title}>영문 성</div>
                        <input className={`${styles.input} ${(Cefirst || efirst) && styles.inputwarn}`} type="text" name="efirst" placeholder="Hong" maxLength="20" onChange={onChange} />
                        { (Cefirst || efirst) && <p className={styles.alert}>영어로 2자 이상 입력해주세요.</p> }
                    </div>
                </article>
                <article className={styles.koreaname}>
                    <div className={styles.title}>한글 이름</div>
                    <input className={`${styles.input} ${(Ckname || kname) && styles.inputwarn}`} type="text" name="kname" placeholder="홍길동" maxLength="20" onChange={onChange} />
                    { (Ckname || kname) && <p className={styles.alert}>한글로 2자 이상 입력해주세요.</p> }
                </article>
                <article className={styles.gender}>
                    <div className={styles.title}>성별</div>
                    <input className={styles.hidden} type="checkbox" id="male" value="남" name="gender" onChange={onChange} />
                    <input className={styles.hidden} type="checkbox" id="female" value="여" name="gender" onChange={onChange} />
                    <div className={styles.gchoice}>
                        <label htmlFor="male" className={`${styles.button} ${(Cmale || male) === '남' && styles.gigi}`}>남</label>
                        <label htmlFor="female" className={`${styles.button} ${(Cmale || male) === '여' && styles.gigi}`}>여</label>
                    </div>
                    { (Cmale || male) === true && <p className={styles.alert}>성별을 선택해 주세요.</p> }
                </article>
                <article className={styles.birth}>
                    <div className={styles.title}>생년월일</div>
                    <input className={`${styles.input} ${(Cbirth || birth) && styles.inputwarn}`} type="text" name="birth" placeholder="YYDDMM" maxLength="6" onChange={onChange} />
                    { (Cbirth || birth) && <p className={styles.alert}>숫자로 6자를 입력해 주세요.</p> }
                </article>
            </li>
        </>
    );
});

export default Traveler;