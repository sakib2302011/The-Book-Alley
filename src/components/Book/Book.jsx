import { MdOutlineStarBorder } from "react-icons/md";

const Book = (book) => {
  
  const {image, tags, bookName, author, category, rating } = book.book;

  return (
    <div  className="card w-96 shadow-xl border border-black p-6">
      <figure className="bg-zinc-200 px-24 py-8">
        <img
          src= {image}
          alt="Shoes" className="h-44" />
      </figure>
      <div className="card-body p-0 gap-0">
        <div className="mt-6 mb-4">
          {
            tags.map( (tag, index) => <span key={index} className="bg-green-50 text-base text-success font-medium py-2 px-4 rounded-3xl me-3">{tag}</span> )
          }
        </div>
        <h2 className="text-2xl font-bold font-serif mb-4">{bookName}</h2>
        <h4 className="text-base font-medium pb-5 border-b border-dashed mb-5">By : {author}</h4>
        <div className="text-base font-medium flex justify-between">
          <h4>{category}</h4>
          <div className="flex gap-x-2 items-center">
            <span>{rating}</span>
            <MdOutlineStarBorder className="text-lg"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;