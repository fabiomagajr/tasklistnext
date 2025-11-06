// Importamos nosso "conector mestre"
import clientPromise from "@/lib/mongodb";
// ObjectId é o tipo de ID que o MongoDB usa. Precisamos dele.
import { ObjectId } from "mongodb";

// [NOVO] Importamos nosso componente de formulário
import AddIdeaForm from "@/app/components/AddIdeaForm";

// ... (Interface Idea e função getIdeas continuam IDÊNTICAS) ...

interface Idea {
  _id: ObjectId; // O ID do MongoDB
  titulo: string;
}

async function getIdeas(): Promise<Idea[]> {
  try {
    const client = await clientPromise;
    const db = client.db("ideabook");
    const ideas = await db
      .collection("ideas")
      .find({})
      // [MELHORIA] Ordena as ideias pelas mais novas primeiro
      // O MongoDB usa o _id para saber a ordem de criação.
      .sort({ _id: -1 }) // -1 significa ordem descendente
      .toArray();

    return ideas as unknown as Idea[];

  } catch (error) {
    console.error("Erro ao buscar ideias:", error);
    return [];
  }
}


// --- A NOSSA PÁGINA ---
export default async function HomePage() {
  
  const ideasFromDb = await getIdeas();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      
      <h1 className="text-5xl font-bold mb-12">
        Meu Caderno de Ideias (IdeaBook)
      </h1>

      {/* [NOVO] Aqui está o nosso formulário! */}
      <AddIdeaForm />

      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-6">Minhas Ideias (do Banco LOCAL!):</h2>
        
        <ul className="space-y-4">
          {ideasFromDb.length > 0 ? (
            ideasFromDb.map((idea) => (
              <li 
                key={idea._id.toString()} 
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
              >
                <p className="text-xl">{idea.titulo}</p>
              </li>
            ))
          ) : (
            <li className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
              <p>Nenhuma ideia encontrada. Adicione uma acima!</p>
            </li>
          )}
        </ul>
      </div>

    </main>
  );
}