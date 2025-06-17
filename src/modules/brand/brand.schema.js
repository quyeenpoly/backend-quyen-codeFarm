import {z} from "zod";

const brandSchema = z.object({
    title: z.string().min(1, "Title is required !"),
    description: z.string().optional(),
    slug: z.string().min(1,"Slug is required !"),
    deletedAt: z.date().nullable().optional(),
    status: z.number().default(1).optional(),
    image: z.string().optional(),
    
})
export default brandSchema;