import React, { useEffect, useState } from 'react';
import * as S from './DisitalClockstyled';

const DigitalClock = ({isOpen}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <S.ClockWrapper><S.TimeText isOpen={isOpen}>{timeStr}</S.TimeText></S.ClockWrapper>;
};

export default DigitalClock;