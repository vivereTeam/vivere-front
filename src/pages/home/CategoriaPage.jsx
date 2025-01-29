import { useParams } from "react-router-dom";

function CategoriaPage() {
    const { category } = useParams();
    return (
        <div style={{ padding: "20px" }}>
            <h1>Detalhes da Categoria</h1>
            <p>Você está visualizando: {category}</p>
        </div>
    );
}

export default CategoriaPage;