import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 }, })
        .onUploadComplete(async () => { }),
    profileUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }, })
        .onUploadComplete(async () => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;