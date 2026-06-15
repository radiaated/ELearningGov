const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((I, idx) => (
        <div className=" text-yellow-400" key={idx}>
          {idx + 1 <= rating ? (
            <i className="fa-solid fa-star"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
