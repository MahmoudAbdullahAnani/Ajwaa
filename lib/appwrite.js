import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.sora",
  projectId: "660d0e00da0472f3ad52",
  storageId: "660d0e59e293896f1eaf",
  databaseId: "660d14b2b809e838959a",
  userCollectionId: "660d14c0e8ae0ea842b8",
  videoCollectionId: "660d157fcb8675efe308",
};

export const BACKEND_DOMAIN_PRODUCTION =
  "https://my-trip-back-end.onrender.com";

// // Register user
// export async function createUser(email, password, username) {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       username
//     );

//     if (!newAccount) throw Error;

//     const avatarUrl = avatars.getInitials(username);

//     await signIn(email, password);

//     const newUser = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       ID.unique(),
//       {
//         accountId: newAccount.$id,
//         email: email,
//         username: username,
//         avatar: avatarUrl,
//       }
//     );

//     return newUser;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// Sign In
export async function signIn(email, password) {
  try {
    const res = await axios.post(`${BACKEND_DOMAIN_PRODUCTION}/signin`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

// SignUp
export async function SignUp(email, password, name) {
  try {
    const lastName = name.split(" ")[1] || "";
    // 1) axios post req on /signup
    const res = await axios.post(`${BACKEND_DOMAIN_PRODUCTION}/signup`, {
      firstName: name.split(" ")[0] || "",
      lastName,
      email,
      userName: `${name.split(" ")[0]}-${lastName}`,
      password,
    });
    await AsyncStorage.setItem(
      "EmailUserName",
      JSON.stringify({ email, userName: `${name.split(" ")[0]}-${lastName}` })
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

// VerificationAccountCode
export async function VerificationAccountCode(code) {
  const data = await AsyncStorage.getItem("EmailUserName");
  try {
    const res = await axios.patch(
      `https://my-trip-back-end.onrender.com/signup`,
      {
        verificationAccountCode: code,
        email: JSON.parse(data).email,
        userName: JSON.parse(data).userName,
      }
    );
    // console.log("res.data==> ", res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

// SendMSG
export async function 

SendMSG(name, email, msg) {
  try {
    const res = await axios.post(`${BACKEND_DOMAIN_PRODUCTION}/msg`, {
      name,
      email,
      msg,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

// // Sign Out
// export async function signOut() {
//   try {
//     const session = await account.deleteSession("current");

//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Upload File
// export async function uploadFile(file, type) {
//   if (!file) return;

//   const { mimeType, ...rest } = file;
//   const asset = { type: mimeType, ...rest };

//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       asset
//     );

//     const fileUrl = await getFilePreview(uploadedFile.$id, type);
//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get File Preview
// export async function getFilePreview(fileId, type) {
//   let fileUrl;

//   try {
//     if (type === "video") {
//       fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
//     } else if (type === "image") {
//       fileUrl = storage.getFilePreview(
//         appwriteConfig.storageId,
//         fileId,
//         2000,
//         2000,
//         "top",
//         100
//       );
//     } else {
//       throw new Error("Invalid file type");
//     }

//     if (!fileUrl) throw Error;

//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Create Video Post
// export async function createVideoPost(form) {
//   try {
//     const [thumbnailUrl, videoUrl] = await Promise.all([
//       uploadFile(form.thumbnail, "image"),
//       uploadFile(form.video, "video"),
//     ]);

//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       ID.unique(),
//       {
//         title: form.title,
//         thumbnail: thumbnailUrl,
//         video: videoUrl,
//         prompt: form.prompt,
//         creator: form.userId,
//       }
//     );

//     return newPost;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get all video Posts
// export async function getAllPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts created by user
// export async function getUserPosts(userId) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.equal("creator", userId)]
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts that matches search query
// export async function searchPosts(query) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.search("title", query)]
//     );

//     if (!posts) throw new Error("Something went wrong");

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get latest created video posts
// export async function getLatestPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.orderDesc("$createdAt"), Query.limit(7)]
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
