import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/organisms/HeroSection";
import FeaturedEvents from "@/components/organisms/FeaturedEvents";
import EventCategories from "@/components/organisms/EventCategories";
import UpcomingEvents from "@/components/organisms/UpcomingEvents";

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/events?search=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <HeroSection onSearch={handleSearch} />
      <FeaturedEvents />
      <EventCategories />
      <UpcomingEvents />
    </div>
  );
};

export default Home;