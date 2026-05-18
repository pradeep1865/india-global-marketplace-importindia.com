import crypto from "node:crypto";
import { env } from "../../config/env.js";

export type UploadIntent = {
  provider: "s3" | "cloudinary";
  uploadUrl: string;
  assetUrl: string;
  fields?: Record<string, string>;
  expiresIn: number;
};

export function createUploadIntent(input: { folder: string; fileName: string; contentType: string }): UploadIntent {
  const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `${input.folder}/${crypto.randomUUID()}-${safeName}`;

  if (process.env.CLOUDINARY_CLOUD_NAME) {
    return {
      provider: "cloudinary",
      uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
      assetUrl: `cloudinary://${key}`,
      fields: {
        folder: input.folder,
        resource_type: input.contentType.startsWith("video/") ? "video" : "image"
      },
      expiresIn: 300
    };
  }

  return {
    provider: "s3",
    uploadUrl: `https://${process.env.AWS_S3_BUCKET || "importindia-assets"}.s3.${process.env.AWS_REGION || "ap-south-1"}.amazonaws.com/${key}`,
    assetUrl: `s3://${process.env.AWS_S3_BUCKET || "importindia-assets"}/${key}`,
    fields: {
      key,
      "Content-Type": input.contentType,
      "x-amz-meta-platform": "importindia"
    },
    expiresIn: env.NODE_ENV === "production" ? 300 : 900
  };
}
