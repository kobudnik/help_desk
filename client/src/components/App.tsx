import { TicketForm } from './TicketForm';

function App() {
  return (
    <>
      <div className="w-full bg-yellow-100">
        <p className="font-2xl block text-center pt-16 font-extrabold text-gray-500 mb-2">
          {' '}
          <span className="text-3xl mb-4  text-gray-500 mr-11 pr-11">
            {' '}
            Having Trouble?
          </span>
          <span className="text-pink-500 block text-5xl mr-28">
            Submit a Request
          </span>
        </p>
        <div className="flex justify-center  w-full bg-yellow-100 h-screen">
          <TicketForm />{' '}
        </div>
      </div>
    </>
  );
}

export default App;
