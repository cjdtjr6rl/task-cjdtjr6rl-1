import React, { memo, useCallback, useState } from 'react';
import { useUserDispatch } from '../../users';
import styles from './detailinfo.module.css';

const DetailInfo = memo(({ person, id }) => {
    const time = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    const minute = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];
    const [users, setUsers] = useState(person);
    const { Chour, Cminute, Cpname, Cphone, Cextra } = person;
    const [hour, setHour] = useState(users.Chour);
    const [min, setMin] = useState(users.Cminute);
    const [pname, setPname] = useState(users.Cpname);
    const [phone, setPhone] = useState(users.Cphone);
    const [extra, setExtra] = useState(users.Cextra);
    
    const dispatch = useUserDispatch();
    const onChange = useCallback((e) => {
        function check(k) {
            dispatch({
                type: "CHECK_VALIDATION",
                id,
                k,
                val,
            })
        }
        const {name, value} = e.target;
        const total = e.currentTarget;
        const key = Object.keys(users);
        const val = false;
        if(total.name === 'hour' && total.value !== 'no') {
            const k = key[16];
            setHour(false);
            check(k);
        } else if(total.name === 'hour' && total.value === 'no') {
            setHour(true);
        } else if(total.name === 'minute' && total.value !== 'no') {
            const k = key[17];
            setMin(false);
            check(k);
        } else if(total.name === 'minute' && total.value === 'no') {
            setMin(true);
        } else if(total.name === 'pname') {
            total.value = total.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|]/,"");
            if(total.value.length >= 2) {
                setPname(false);
            } else if(total.value.length < 2) {
                const k = key[18];
                setPname(true);
                check(k);
            }
        } else if(total.name === 'phone') {
            total.value = total.value.replace(/[^0-9]/,"");
            if(total.value.length >= 6) {
                setPhone(false);
            } else if(total.value.length < 6) {
                const k = key[19];
                setPhone(true);
                check(k);
            }
        } else if(total.name === 'extra' && total.value.length >= 1) {
            const k = key[20];
            setExtra(false);
            check(k);
        } else if(total.name === 'extra' && total.value.length < 1) {
            
            setExtra(true);
            
        }
        setUsers({
            ...users,
            [name]: value
        })
        dispatch({
            type: "CHANGE_VALUE",
            id,
            name,
            value
        })
    }, [dispatch, id, users]);

    return (
        <section className={styles.info}>
            <div className={styles.time}>
                <div className={styles.title}>
                    숙소 도착 예정 시간
                </div>
                <div className={styles.allselect}>
                    <div className={styles.when}>
                        <select className={`${styles.select} ${(Chour || hour) && styles.inputwarn}`} name="hour" placeholder="시" onChange={onChange}>
                            <option value="no">시</option>
                            {Object.keys(time).map(time => (
                                <option key={time} value={`${time}시`}>{`${time}시`}</option>
                            ))}
                        </select>
                        { (Chour || hour) && <p className={styles.alert}>시간을 선택해 주세요.</p> }
                    </div>
                    <div className={styles.when}>
                        <select className={`${styles.select} ${ (Cminute || min) && styles.inputwarn}`} name="minute" placeholder="분" onChange={onChange}>
                            <option value='no'>분</option>
                            {Object.keys(minute).map(minute => (
                                <option key={minute} value={`${minute}분`}>{`${minute}분`}</option>
                            ))}
                        </select>
                        {(Cminute || min) && <p className={styles.alert}>분을 선택해 주세요.</p> }
                    </div>
                </div>
            </div>
            <div className={styles.phone}>
                <div className={styles.title}>
                    상세 핸드폰 정보
                </div>
                <div className={styles.userinfo}>
                    <div className={styles.name}>사용자 이름</div>
                    <input className={`${styles.input} ${(Cpname || pname) && styles.inputwarn}`} type="text" name="pname" placeholder="홍길동" maxLength="20" onChange={onChange} />
                    { (Cpname || pname) && <p className={styles.alert}>한글로 2자 이상 입력해주세요.</p> }
                </div>
                <div className={styles.userinfo}>
                    <div className={styles.name}>핸드폰 번호</div>
                    <div className={styles.number}>
                        <select className={styles.country}>
                            <option value="+82(대한민국)">+82(대한민국)</option>
                        </select>
                        <div className={styles.num}>
                            <input className={`${styles.input} ${(Cphone || phone) && styles.inputwarn}`} type="text" name="phone" placeholder="'-'없이 입력해주세요." maxLength="20" onChange={onChange} />
                            { (Cphone || phone) && <p className={styles.alert}>핸드폰번호를 형식에 맞게 입력해주세요.</p> }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.extra}>
                <div className={styles.title}>
                    기타 예약 정보
                </div>
                <div className={styles.drive}>
                    오시는 교통 수단을 적어주세요.
                    <textarea className={`${styles.textarea} ${(Cextra || extra) && styles.inputwarn}`} name="extra" placeholder="답변을 입력해주세요." maxLength="200" onChange={onChange}></textarea>
                    { (Cextra || extra) && <p className={styles.alert}>필수 항목입니다.</p> }
                </div>
            </div>
        </section>
    );
});

export default DetailInfo;