function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-500 text-white py-4 flex justify-evenly">
      <a
        href="https://linkedin.com/in/kobudnik"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-800"
      >
        LinkedIn
      </a>
      <span> &copy; 2023 Created by Ken Budnik </span>
      <a
        href="https://github.com/kobudnik/help_desk_exercise"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-800"
      >
        GitHub
      </a>
    </div>
  );
}
export { Footer };
