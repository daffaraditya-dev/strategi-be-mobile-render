import { token } from 'morgan';
import { firebaseAdmin, isFirebaseReady } from '../../../../../firebase';

export async function sendFCMToTopic({ topic, title, body, data }: { topic: string; title: string; body: string; data?: Record<string, string> }) {
  if (!isFirebaseReady()) {
    console.warn('[FCM] Firebase not initialized. Skip send.');
    return null;
  }
  const message = {
    topic,
    notification: {
      title,
      body,
    },
    data,

    android: {
      notification: {
        sound: 'default',
        channelId: 'high_importance_channel',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  };

  try {
    const response = await firebaseAdmin.messaging().send(message);
    console.log('[FCM] Message sent:', response);
    return response;
  } catch (error) {
    console.error('[FCM] Failed to send message:', error);
    throw error;
  }
}
