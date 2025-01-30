import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExperienceCard from "./ExperienceCard";
import PropTypes from "prop-types";

const CardSlider = ({ experiences }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} {...exp} />
      ))}
    </Slider>
  );
};

CardSlider.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      details: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardSlider;
