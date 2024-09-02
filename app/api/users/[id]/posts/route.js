import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params }) => {     /* These params get populated when you pass DYNAMIC variables through the URL !!!*/
    try {
        await connectToDB()

        const prompts = await Prompt.find({
            creator: params.id  /* This is how we access the variables passed through the dynamic route !!!*/
        }).populate("creator")

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts.", {status: 500})
    }
}