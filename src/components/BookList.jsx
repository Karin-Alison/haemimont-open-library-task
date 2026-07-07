export default function BookList({books}) {
  return (
    <ul>
      {books.map((book, index) => (
        <li key={index}>
          <strong>{book.title}</strong>
        </li>
      ))}
    </ul>
  );
}