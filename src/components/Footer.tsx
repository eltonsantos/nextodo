export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="w-full text-center text-gray-500 py-4 mt-12">
    © {anoAtual}{" "}
    <a href="https://eltonmelosantos.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      Elton Santos
    </a>
  </footer>
  );
}
