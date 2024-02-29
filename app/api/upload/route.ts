import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req: any) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");
    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET_KEY || "",
      },
    });

    const ext = file?.name?.split(".")?.slice(-1)?.[0];
    const newFileName = uniqid() + "." + ext;

    let chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const bucket = "dawid-food-ordering";
    s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file?.type,
        Body: buffer,
      })
    );

    return Response.json(
      "https://" + bucket + ".s3.amazonaws.com/" + newFileName
    );
  }
  return Response.json(true);
}
