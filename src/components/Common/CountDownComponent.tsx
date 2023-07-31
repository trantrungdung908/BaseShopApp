import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Bold, Medium} from '@/components/CommonStyled';
import {useCountdown} from '@/hooks/useCountDown';

interface CountDown {
  targetDate: string;
}

export const CountDownComponent = memo(function ({targetDate}: CountDown) {
  const {days, hours, minutes, seconds} = useCountdown(targetDate);
  return (
    <>
      {days + hours + minutes + seconds <= 0 ? (
        <Container>
          {days > 0 && (
            <ContainerTime>
              <TitleTime>{'00'}</TitleTime>
            </ContainerTime>
          )}
          {days > 0 && <TitleDot>{':'}</TitleDot>}
          <ContainerTime>
            <TitleTime>{'00'}</TitleTime>
          </ContainerTime>
          <TitleDot>{':'}</TitleDot>
          <ContainerTime>
            <TitleTime>{'00'}</TitleTime>
          </ContainerTime>
          <TitleDot>{':'}</TitleDot>
          <ContainerTime>
            <TitleTime>{'00'}</TitleTime>
          </ContainerTime>
        </Container>
      ) : (
        <Container>
          {days > 0 && (
            <ContainerTime>
              <TitleTime>{`0${days}`.slice(-2)} </TitleTime>
            </ContainerTime>
          )}
          {days > 0 && <TitleDot>{':'}</TitleDot>}
          <ContainerTime>
            <TitleTime>{`0${hours}`.slice(-2)}</TitleTime>
          </ContainerTime>
          <TitleDot>{':'}</TitleDot>
          <ContainerTime>
            <TitleTime>{`0${minutes}`.slice(-2)}</TitleTime>
          </ContainerTime>
          <TitleDot>{':'}</TitleDot>
          <ContainerTime>
            <TitleTime>{`0${seconds}`.slice(-2)}</TitleTime>
          </ContainerTime>
        </Container>
      )}
    </>
  );
});

const Container = styled.View`
  margin-left: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TitleDot = styled(Medium)`
  font-size: 16px;
`;

const ContainerTime = styled.View`
  background-color: ${Colors.black};
  padding: 1px 2px;
  border-radius: 4px;
`;

const TitleTime = styled(Bold)`
  font-size: 16px;
  color: ${Colors.white};
`;
