import PropTypes from "prop-types";
import { Avatar, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { getCategoryBackendValue, getCategoryIcon } from "../services/constants";

function ExperienceCategory({ category }) {
    const isCategoryList = category === "Lista de Categorias";
    const IconComponent = getCategoryIcon(category);
    const categoriaBackend = isCategoryList ? "" : getCategoryBackendValue(category);

    return (
        <Link to={isCategoryList ? "/category-list" : `/category/${encodeURIComponent(categoriaBackend)}`} style={{ textDecoration: "none" }}>
            <Stack
                direction="column"
                alignItems="center"
                sx={{
                    ":hover .avatar-container": { bgcolor: isCategoryList ? "#1976D2" : "#270c6b" },
                }}
            >
                <Avatar
                    className="avatar-container"
                    sx={{
                        bgcolor: isCategoryList ? "#1976D2" : "rgb(154, 154, 154)",
                        transition: "transform 0.3s ease",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
                        marginBottom: "7px",
                        width: 80,
                        height: 80,
                        ":hover": { transform: "scale(1.2)" },
                    }}
                >
                    <IconComponent sx={{ fontSize: 40 }} />
                </Avatar>
                <p
                    style={{
                        textAlign: "center",
                        margin: 0,
                        fontSize: "15px",
                        fontFamily: "'Poppins', sans-serif",
                        color: isCategoryList ? "#1976D2" : "rgb(86, 86, 86)",
                        width: "100px",
                    }}
                >
                    {category}
                </p>
            </Stack>
        </Link>
    );
}

ExperienceCategory.propTypes = {
    category: PropTypes.string.isRequired,
};

export default ExperienceCategory;