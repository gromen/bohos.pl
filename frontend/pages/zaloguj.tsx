import styled from 'styled-components';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import RequestReset from '../components/RequestReset';

const SigningStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function logowaniePage() {
  return (
    <SigningStyles>
      <SignIn />
      <SignUp />
      <RequestReset />
    </SigningStyles>
  );
}
