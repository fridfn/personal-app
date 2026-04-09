import { get, set, remove, ref } from "firebase/database";

export async function migrateSubscription(user) {
  const anonId = localStorage.getItem("anon_id");
  if (!anonId) return;

  const anonRef = ref(db, `subscription/${anonId}`);
  const uidRef = ref(db, `subscription/${user.uid}`);

  const snap = await get(anonRef);

  if (snap.exists()) {
    const data = snap.val();

    // overwrite atau merge?
    await set(uidRef, {
      ...data,
      migratedFrom: anonId,
      migratedAt: Date.now()
    });

    // hapus anonymous
    await remove(anonRef);

    // optional: hapus anon id dari local
    localStorage.removeItem("anon_id");
  }
}
