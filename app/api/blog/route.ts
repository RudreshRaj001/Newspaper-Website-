import { NextResponse } from "next/server";
import * as z from "zod";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getEmail, getUserDetails } from "@/app/actions";
import db from "@/lib/db";
const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function uploadFileToS3(buffer: Buffer) {
  const newFileName = `rym-blog/${"blog"}-${Date.now()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: newFileName,
    Body: buffer,
    ContentType: "image/jpg",
  };
  const command = new PutObjectCommand(params);
  const response = await s3Client.send(command);
  
  return newFileName;
}

const requestBodySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long, Only 100 characters allowed"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content is too long, Only 5000 characters allowed"),
});
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }
    const user = await getUserDetails();
    if (!user) {
      return NextResponse.json(
        { message: "You Need To Login First" },
        { status: 404 }
      );
    }
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    const validatedData = requestBodySchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: validatedData.error.errors },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = await uploadFileToS3(buffer);
    const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileName}`;

    await db.blog.create({
      data: {
        title: validatedData.data.title,
        content: validatedData.data.content,
        imageUrl: url,
        authorId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Blog Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
