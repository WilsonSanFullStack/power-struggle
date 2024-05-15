import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';
// Load environment variables from a `.env` file
dotenv.config();

const secretKey = process.env.SECRETKEY;

export const generateToken = (payload: object): string => {
  // Signs the payload with the secret key and returns the generated token
  return jwt.sign(payload, secretKey!, { expiresIn: '1h' });
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey!, { complete: true }, (err: VerifyErrors | null, decoded: object | undefined) => {
      if (err) {
        reject(new Error('Invalid token')); // Rechazar el token inválido con un error
      } else {
        resolve(decoded); // Resolver la promesa con los datos decodificados
      }
    });
  });
};
