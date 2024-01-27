import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import { Stream } from 'stream';

const credentials = {
  type: 'service_account',
  project_id: process.env.GCS_PROJECT_ID,
  private_key_id: process.env.GCS_PRIVATE_KEY_ID,
  private_key: process.env.GCS_PRIVATE_KEY?.split('\\n').join('\n'),
  client_email: process.env.GCS_CLIENT_EMAIL,
  client_id: process.env.GCS_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.GCS_CLIENT_CERT_URL,
  universe_domain: 'googleapis.com'
};

const storage = new Storage({ credentials });
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || '');

export const uploadFile = async (
  file: File,
  directory: string,
  publicAccess = true
) => {
  try {
    fs.writeFileSync('./' + file.name, Buffer.from(await file.arrayBuffer()));

    const options = {
      destination: path.join(directory, file.name),
      public: publicAccess
    };
    const response = await bucket.upload('./' + file.name, options);
    fs.unlinkSync('./' + file.name);
    return response;
  } catch (error) {
    throw error;
  }
};

export const streamFileUpload = async (
  file: File,
  directory: string,
  publicAccess = true
) => {
  try {
    const bucketFile = bucket.file(path.join(directory, file.name));
    const passthroughStream = new Stream.PassThrough();
    passthroughStream.write(Buffer.from(await file.arrayBuffer()));
    passthroughStream.end();
    const wait = new Promise<void>((resolve, reject) => {
      const pipe = passthroughStream.pipe(bucketFile.createWriteStream());
      pipe.on('finish', () => {
        resolve();
      });
      pipe.on('error', (error) => reject(error));
    });
    await wait;
    return bucketFile;
  } catch (error) {
    throw error;
  }
};
