const {z}= require('zod');
// The Validation Schema (How it should look in the API)
// Define the shape of data we expect for creating a snippet

const createSnippetSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    language: z.string().min(1, "Language is required"),
    code:z.string().min(1, "Code is required"),
});

module.exports = {
    createSnippetSchema,
};