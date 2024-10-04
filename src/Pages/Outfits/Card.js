export const Card = ({ dressList }) => {
  return (
    <div className="card-container">
      <img src={dressList.imgSrc} alt={dressList.imgSrc} className="card-img" />
    </div>
  );
};
