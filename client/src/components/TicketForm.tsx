import { useState, ChangeEvent } from 'react';
function TicketForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  type FormEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  const handleNameChange = (e: FormEvent) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: FormEvent) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e: FormEvent) => {
    setSubject(e.target.value);
  };

  const handleDescriptionChange = (e: FormEvent) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          description,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Server response:', data);
      } else {
        console.error('Server error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form className="  bg-yellow-100 w-full flex flex-col  items-center justify-center pl-60">
      <div className=" px-40 w-full ">
        <div className="sm:col-span-4">
          <label
            htmlFor="name"
            className="block mb-2 text-md font-medium text-gray-900"
          >
            Name
          </label>
          <div className="my-2">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="username"
              className="block w-3/4 p-2.5 rounded-lg text-white bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="text-md font-medium leading-6 text-gray-900 "
          >
            Email
          </label>
          <div className="my-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-3/4 p-2.5 rounded-lg text-white bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="We'll get back to you here."
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
        </div>

        <div className="col-span-full ">
          <label
            htmlFor="subject"
            className="block text-md font-medium leading-6 text-gray-900"
          >
            Subject
          </label>
          <div className="my-2">
            <input
              type="text"
              name="subject"
              id="subject"
              className="block w-3/4 p-2.5 rounded-lg text-white bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's this about?"
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-md font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="message"
            rows={3}
            className="block p-2.5 w-3/4 max-h-44 text-md  rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
            placeholder="Tell us about the issue."
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="w-3/4 flex justify-center">
          <button
            type="button"
            className="block bg-primary hover:bg-indigo-900 mt-4 text-white font-bold py-8 px-32 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export { TicketForm };
