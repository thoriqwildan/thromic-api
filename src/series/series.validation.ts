import { z, ZodType } from "zod";

export const TypeEnum = z.enum(["MANHWA", "MANGA", "MANHUA"])

export class SeriesValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        imgUrl: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(255),
        author_name: z.array(z.string().min(1)).nonempty('At least one author is required'),
        genre_name: z.array(z.string().min(1)).nonempty('At least one author is required'),
        artist_name: z.array(z.string().min(1)).nonempty('At least one author is required'),
        type: TypeEnum,
        release: z.string().min(1).max(100)
    })
}