import { setGlobalOptions } from "firebase-functions/v2";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

setGlobalOptions({
  maxInstances: 10,
});

export const createUser = onCall(async (request) => {
  const data = request.data;

  try {
    const user = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.nama,
    });

    await admin.firestore().collection("users").doc(user.uid).set({
      uid: user.uid,
      nama: data.nama,
      nim: data.nim,
      email: data.email,
      role: data.role,
      jabatan: data.jabatan,
      kelasId: data.kelasId,
      aktif: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      uid: user.uid,
    };
  } catch (error: any) {
    throw new HttpsError(
      "internal",
      error.message
    );
  }
});