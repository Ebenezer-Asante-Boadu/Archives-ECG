import { getFirestore, getDocs, collection, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { Gender, Status, type User } from "./types";
import { getEnumValue } from "@/helpers/enum_helpers";

export async function fetchUsers(): Promise<User[] | null> {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');
  try {
    const snapshot = await getDocs(usersCollection);
    const users: User[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
       let _status  = getEnumValue(data.status, Status);
       let _gender = getEnumValue(data.gender, Gender);

       if(_status == null || _gender == null) return null;

      users.push({
        staff_id: data.staff_id,
        email: data.email,
        name: data.name,
        uid: doc.id,
        status: _status,
        gender : _gender,
        profile: data.profile
      });
    });

    return users;

  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}

export async function searchUserByName(userName: string): Promise<User[]> {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');
   // Create a query that searches for names starting with the given userName
   const q = query(
    usersCollection,
    orderBy('name'),
    startAt(userName),
    endAt(userName + '\uf8ff')
);
  // const q = query(usersCollection, where('name', '==', userName));
  const querySnapshot = await getDocs(q);

  const users: User[] = [];
  querySnapshot.forEach((doc) => {
      users.push({ uid: doc.id, ...doc.data() } as User);
  });

  return users;
}