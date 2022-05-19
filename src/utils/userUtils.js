import { EncryptJWT, jwtDecrypt } from 'jose';

export const getUserJwt = async (name, email, id) => {
    return await new EncryptJWT(
        {
            'urn:menur:username': name,
            'urn:menur:email': email,
            'urn:menur:userid': id
        }
    )
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .encrypt(Buffer.from(process.env.REACT_APP_LOCAL_SECRET));
}

export const getUserJwtDecrypted = async (jwt) => {
    return await jwtDecrypt(jwt, process.env.REACT_APP_LOCAL_SECRET);
}