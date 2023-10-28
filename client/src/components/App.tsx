import { TicketForm } from './TicketForm';

function App() {
  return (
    <>
      <div className="w-full bg-yellow-100 h-screen">
        <p className="font-2xl block text-center pt-12 font-extrabold text-gray-500 text-5xl mb-2">
          {' '}
          Having Trouble? Submit a Request
        </p>
        <div className="flex justify-center  w-full bg-yellow-100 h-screen">
          <TicketForm />{' '}
        </div>
      </div>
    </>
  );
}

export default App;

/*  <div className="flex p-10 w-5/6 pt-10 mt-10 bg-pink-100 justify-center align-middle">*/
