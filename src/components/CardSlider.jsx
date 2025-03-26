import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton, Grid } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ExperienceCard from "./ExperienceCard";
import LargeExperienceCard from "./LargeExperienceCard";

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: "-40px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: "-40px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

function CardSlider({ experiences, removeExperience, isLargeCard }) {
  const minCardsForSlider = isLargeCard ? 2 : 4;
  const hasEnoughForSlider = experiences.length >= minCardsForSlider;

  const settings = {
    dots: hasEnoughForSlider,
    infinite: hasEnoughForSlider,
    speed: 500,
    slidesToShow: isLargeCard ? 1 : 3,
    slidesToScroll: 1,
    nextArrow: hasEnoughForSlider ? <NextArrow /> : null,
    prevArrow: hasEnoughForSlider ? <PrevArrow /> : null,
  };

  if (!hasEnoughForSlider) {
    return (
      <Grid container spacing={2}>
        {experiences.map((exp) => (
          <Grid item xs={isLargeCard ? 12 : 4} key={exp.id}>
            {isLargeCard ? (
              <LargeExperienceCard
                event={exp}
                removeExperience={removeExperience}
              />
            ) : (
              <ExperienceCard
                event={exp}
                removeExperience={removeExperience}
              />
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Slider {...settings}>
        {experiences.map((exp) => (
          <div key={exp.id} style={{ padding: "10px" }}>
            {isLargeCard ? (
              <LargeExperienceCard
                event={exp}
                removeExperience={removeExperience}
              />
            ) : (
              <ExperienceCard
                event={exp}
                removeExperience={removeExperience}
              />
            )}
          </div>
        ))}
      </Slider>
    </Box>
  );
}

export default CardSlider;