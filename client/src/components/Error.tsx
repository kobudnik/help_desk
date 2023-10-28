import { Link } from 'react-router-dom';
import stormTroop from '../../starw.jpeg';

function Error() {
  return (
    <div className="error-page flex flex-col items-center justify-center h-screen w-screen text-3xl text-yellow-600">
      <img src={stormTroop} alt="Error Image" />
      <h1 className="mb-5">These are not the tickets you are looking for</h1>

      <Link
        to="/"
        className="text-3xl text-blue-600 inline-block mb-11 mt-4 hover:text-blue-500"
      >
        {' '}
        Go Home
      </Link>
    </div>
  );
}

export { Error };
