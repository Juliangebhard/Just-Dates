import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";
import { text } from "stream/consumers";

const id: string = "1";

export const userRouter = createTRPCRouter({
    showUser: privateProcedure
    .input(z.object({ id: z.string(), text: z.string(), name: z.string() }))
    .query(({ input }) => {
        console.log(input.id)
        console.log(input.text);

        // database interactions
        // request to google api
        
        return {
        greeting: `Hello ${input.text}`,
        id: input.id,
        name: input.name,
        };
    }),
    changeUser: privateProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(({ input }) => {
        console.log(input.id)
        console.log(input.text);

        // database interactions
        // request to google api
        
        return {
        greeting: `Hello ${input.text}`,
        };
    }),
})