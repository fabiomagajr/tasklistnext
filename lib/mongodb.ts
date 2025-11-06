// Importa o cliente do MongoDB
import { MongoClient } from 'mongodb'

// Verifica se a MONGODB_URI (nosso "endereço") foi definida no .env.local
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

// Guarda o endereço em uma variável
const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

// Este bloco é para o ambiente de DESENVOLVIMENTO (quando rodamos 'npm run dev')
// Queremos evitar que o "hot reload" (atualização automática do código)
// crie centenas de conexões.
if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, usamos uma variável global para preservar a conexão
  // entre as recargas do hot reload.
  // 'globalThis' é um objeto global especial.
  
  // Tipamos a variável global para que o TypeScript saiba o que estamos fazendo
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    // Se a conexão ainda não existe, nós a criamos
    client = new MongoClient(uri, options)
    // E guardamos a "promessa" dessa conexão na variável global
    globalWithMongo._mongoClientPromise = client.connect()
  }
  // Usamos a conexão que já estava guardada
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // Em PRODUÇÃO (quando fizermos o deploy), é mais simples.
  // Apenas criamos o cliente e conectamos uma vez.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Exportamos a "promessa" da conexão.
// É com isso que nosso App vai interagir.
export default clientPromise