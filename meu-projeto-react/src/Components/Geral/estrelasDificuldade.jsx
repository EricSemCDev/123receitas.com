import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function EstrelasDificuldade({ level, hover = false }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const color = hover ? "group-hover:text-white" : "text-[#FF7B00]";

    if (level >= i * 2) {
      stars.push(<FaStar key={i} className={`${color}`} />);
    } else if (level === i * 2 - 1) {
      stars.push(<FaStarHalfAlt key={i} className={`${color}`} />);
    } else {
      stars.push(<FaRegStar key={i} className={`${color}`} />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
}
