import * as tus from "tus-js-client";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_BUCKET = "imagenes";
const LARGE_VIDEO_THRESHOLD_BYTES = 50 * 1024 * 1024;

type VideoUploadOptions = {
  bucket?: string;
  folder?: string;
  onProgress?: (progress: number) => void;
};

const buildFilePath = (file: File, folder: string) => {
  const ext = file.name.split(".").pop() || "bin";
  return `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
};

const getPublicUrl = (bucket: string, filePath: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

export const uploadImage = async (file: File, folder: string = "general"): Promise<string> => {
  const bucket = DEFAULT_BUCKET;
  const filePath = buildFilePath(file, folder);

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
  });

  if (error) throw new Error(error.message);
  return getPublicUrl(bucket, filePath);
};

export const uploadVideoResumable = async (file: File, options: VideoUploadOptions = {}): Promise<string> => {
  const bucket = options.bucket ?? DEFAULT_BUCKET;
  const folder = options.folder ?? "programa-videos";
  const filePath = buildFilePath(file, folder);

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;

  if (sessionError || !accessToken) {
    throw new Error("Tu sesión expiró. Iniciá sesión de nuevo para subir videos pesados.");
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) throw new Error("No se encontró la configuración del backend para subir videos.");

  await new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `${supabaseUrl}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      chunkSize: 6 * 1024 * 1024,
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "x-upsert": "false",
      },
      metadata: {
        bucketName: bucket,
        objectName: filePath,
        contentType: file.type || "video/mp4",
        cacheControl: "3600",
      },
      onError: (error) => reject(error),
      onProgress: (bytesUploaded, bytesTotal) => {
        if (!bytesTotal) return;
        const pct = Math.min(100, Math.round((bytesUploaded / bytesTotal) * 100));
        options.onProgress?.(pct);
      },
      onSuccess: () => resolve(),
    });

    upload
      .findPreviousUploads()
      .then((previousUploads) => {
        if (previousUploads.length > 0) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start();
      })
      .catch(() => upload.start());
  });

  options.onProgress?.(100);
  return getPublicUrl(bucket, filePath);
};

export const uploadProgramVideo = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  if (file.size > LARGE_VIDEO_THRESHOLD_BYTES) {
    return uploadVideoResumable(file, { folder: "programa-videos", onProgress });
  }

  return uploadImage(file, "programa-videos");
};
