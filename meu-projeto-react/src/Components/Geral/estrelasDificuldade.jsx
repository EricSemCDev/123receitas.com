import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function EstrelasDificuldade({ level }) {
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      const value = i * 2;
      stars.push(
        <div key={i} className="w-5 h-5 flex justify-center items-center">
          {level >= value ? (
            <FaStar className="text-[#FF7B00] text-sm" />
          ) : level === value - 1 ? (
            <FaStarHalfAlt className="text-[#FF7B00] text-sm" />
          ) : (
            <FaRegStar className="text-[#FF7B00] text-sm" />
          )}
        </div>
      );
    }
    return stars;
  };

  return <div className="flex space-x-1">{renderStars()}</div>;
}
