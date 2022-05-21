import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

type ComponentProps = {
  query: {
    token: string;
  };
};

export default function ResetujPage({ query }: ComponentProps) {
  if (!query.token) {
    return (
      <div>
        <p>Przepraszamy, ale musisz posiadać token do zresetowania hasła</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Resetuj hasło {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
