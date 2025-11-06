"use client";
import { addIdea } from "@/app/actions";
import { useRef } from "react";

export default function AddIdeaForm(){
    const formRef = useRef<HTMLFormElement>(null);
    async function actionWrapper(formData: FormData){
        await addIdea(formData);
        // Resetar o formulário após o envio
        formRef.current?.reset();
    }
    return (
        <form ref={formRef} action={actionWrapper} className="w-full max-w-2xl mb-12">
            <div className="flex gap-4">
                <input
                    type="text"
                    name="titulo"
                    placeholder="Qual sua nova ideia?"
                    required
                    className="flex-grow p-4 rounded-lg gb-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-lg transition-colors"
                >
                    Adicionar
                </button>
            </div>
        </form>
    )
}