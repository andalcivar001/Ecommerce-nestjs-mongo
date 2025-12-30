import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const uuid = uuidv4();

const client = process.env.GCP_CLIENT_EMAIL;
const key = process.env.GCP_PRIVATE_KEY;

if (!client) {
  console.error('Variable de enterno CCP_CLIENT_EMAIL no encontrada');
} else {
  console.error('client es valido');
}

if (!key) {
  console.error('Variable de enterno CCP_PRIVATE_KEY no encontrada');
} else {
  console.error('key es valido');
}

const storage = new Storage({
  projectId: 'ecommerce-imagenes-3b10a',
  //keyFilename: './serviceAccountKey.json',
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucket = storage.bucket('ecommerce-imagenes-3b10a.firebasestorage.app');
// const bucket = storage.bucket('ecommerce-imagenes-3b10a.appspot.com');

/**
 * Subir archivo a Firebase Storage
 */
export default async function uploadFile(
  file: Express.Multer.File,
  pathImage: string,
): Promise<string> {
  const uuid = uuidv4();

  const fileUpload = bucket.file(pathImage);

  const writeStream = fileUpload.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
    metadata: {
      firebaseStorageDownloadTokens: uuid,
    },
  });

  // ✅ CAMBIO CLAVE PARA VERCEL
  await pipeline(Readable.from(file.buffer), writeStream);

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
    fileUpload.name,
  )}?alt=media&token=${uuid}`;
}
