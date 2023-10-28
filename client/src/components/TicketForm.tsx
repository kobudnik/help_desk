import { useState, ChangeEvent, useEffect } from 'react';
function TicketForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const [validationStatus, setValidationStatus] = useState<string>('');

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

  const handleFocus = (e: FormEvent) => {
    setValidationStatus('');
  };

  const handleSubmit = async () => {
    if (name.length < 5 || description.length < 5) {
      setValidationStatus('Minimum 5 chars');
      return;
    }
    if (email.length < 3 || subject.length < 3) {
      setValidationStatus('Minimum 3 chars');
      return;
    }
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
        setValidationStatus('Form submitted successfully!');
      }
    } catch (error: unknown) {
      let errMessage =
        'Form submission failed. Please ensure you have filled out the fields properly.';
      if (error instanceof Object && 'message' in error) {
        errMessage += ' ' + error.message;
      }
      setValidationStatus(errMessage);
    }

    // Clear form inputs
    setName('');
    setEmail('');
    setSubject('');
    setDescription('');
  };
  return (
    <form className="  bg-yellow-100  w-1/2 flex flex-col  items-center justify-center">
      <div className="  w-full">
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
              className="block w-full p-2.5 rounded-lg text-white border  bg-gray-700 border-gray-600 focus:ring-2 focus:border-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              value={name}
              onChange={handleNameChange}
              onFocus={handleFocus}
              aria-label="Name"
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
              aria-label="email"
              className="block w-full p-2.5 rounded-lg text-white border  bg-gray-700 border-gray-600 focus:ring-2 focus:border-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="We'll get back to you here."
              value={email}
              onChange={handleEmailChange}
              onFocus={handleFocus}
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
              aria-label="subject"
              className="block w-full p-2.5 rounded-lg text-white border  bg-gray-700 border-gray-600 focus:ring-2 focus:border-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's this about?"
              value={subject}
              onChange={handleSubjectChange}
              onFocus={handleFocus}
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
            id="description"
            rows={2}
            className="block w-full p-2.5 rounded-lg text-white border  bg-gray-700 border-gray-600 focus:ring-2 focus:border-1 focus:ring-blue-500 focus:border-blue-500"
            value={description}
            onChange={handleDescriptionChange}
            onFocus={handleFocus}
            aria-label="description"
            placeholder="Tell us about the issue."
          ></textarea>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="button"
            aria-label="submit"
            className="block bg-cyan-900 hover:bg-cyan-950 mt-4 text-white font-bold py-8 px-32 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="w-full flex justify-around text-lg text-primary">
          {' '}
          {validationStatus && <span>{validationStatus}</span>}
        </div>
      </div>
    </form>
  );
}

export { TicketForm };
