import { TicketForm } from './TicketForm';

function App() {
  return (
    <>
      <div className="w-full bg-yellow-100 h-screen">
        <div className="flex flex-col justify-center items-center bg-yellow-100">
          <p className="font-2xl  pt-16 font-extrabold text-gray-500 mb-2">
            {' '}
            <span className="text-3xl block pl-20 text-gray-500">
              {' '}
              Having Trouble?
            </span>
            <span className="text-pink-500 block text-5xl ">
              Submit a Request
            </span>
          </p>
          <TicketForm />{' '}
        </div>
      </div>
    </>
  );
}

export default App;
