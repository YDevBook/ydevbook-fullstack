import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';

const credentials = {
  type: 'service_account',
  project_id: process.env.GCS_PROJECT_ID,
  private_key_id: process.env.GCS_PRIVATE_KEY_ID,
  private_key: process.env.GCS_PRIVATE_KEY,
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
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
