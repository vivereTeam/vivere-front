import { useParams } from "react-router-dom";

function CategoriaPage() {
    const { category } = useParams();
    const formattedCategory = decodeURIComponent(category).replace(/-/g, " ");

    return (
        <div style={{ padding: "20px" }}>
            <h1>Detalhes da Categoria</h1>
            <p>Você está visualizando: {formattedCategory}</p>
        </div>
    );
}

export default CategoriaPage;
