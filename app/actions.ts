"use server";
import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export async function addIdea(formData: FormData) {
    const titulo = formData.get("titulo") as string;
    
    if (!titulo || titulo.trim() === "") {
        throw new Error("O título da ideia não pode estar vazio.");
    }
    try{
        const client = await clientPromise;
        const db = client.db("ideabook");
        await db.collection("ideas").insertOne({
            titulo: titulo.trim() 
        });  
        revalidatePath("/"); 
    }catch(error){
        console.error("Erro ao adicionar ideia:", error);
        throw new Error("Não foi possível adicionar a ideia.");
    }
}