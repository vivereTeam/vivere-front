import ExperienceCategory from "../../components/ExperienceCategory.jsx";
import { Typography } from "@mui/material";


function CategoryListPage() {
    return (
        <>  
            <Typography>
                <h1 style={{ marginBottom: "20px" }}>Categorias</h1>
            </Typography>

            <div
                style={{
                    backgroundColor: "hsl(0, 0.00%, 91.40%)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                <ExperienceCategory category="Work" />
                <ExperienceCategory category="Education" />
                <ExperienceCategory category="Travel" />
                <ExperienceCategory category="Unknown" />
            </div>
        </>
    );
}

export default CategoryListPage;