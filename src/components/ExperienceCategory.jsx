import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const poppinsFont = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap)"
);

poppinsFont.load().then(() => {
  document.fonts.add(poppinsFont);
});

function ExperienceCategory({ category }) {
  const categoryIcons = {
    Education: <SchoolIcon />,
    Travel: <CardTravelIcon />,
    Work: <WorkIcon />,
    Default: <HelpOutlineIcon />,
  };

  const icon = categoryIcons[category] || categoryIcons.Default;

  return (
    <Stack direction="column" alignItems="center">
      <Avatar
        sx={{
          bgcolor: "#FF5722",
          transition: "transform 0.3s ease",
          marginBottom: "7px",
          ":hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        {icon}
      </Avatar>

      <p
        style={{
          margin: 0,
          fontFamily: "'Poppins', sans-serif",
          color:"rgb(86, 86, 86)",
        }}
      >
        {category}
      </p>
    </Stack>
  );
}

ExperienceCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ExperienceCategory;
