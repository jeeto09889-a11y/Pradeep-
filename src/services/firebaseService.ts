/**
 * Placeholder for Firebase service. 
 * Will be fully implemented once Firebase terms are accepted.
 */
export const firebaseReady = false;
export const db = null as any;
export const auth = null as any;

export async function sendMessage(inquiry: any) {
  console.log("Mock sending message:", inquiry);
}

export function subscribeToMessages(callback: (msgs: any[]) => void) {
  console.log("Mock subscribing to messages");
  return () => {};
}
