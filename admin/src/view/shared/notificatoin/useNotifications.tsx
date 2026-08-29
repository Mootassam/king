
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSocket } from 'src/modules/shared/socket/socketClient';
import userListActions from 'src/modules/user/list/userListActions';

export default function useNotifications(
  userId: string,
  isAdmin: boolean = false,
) {

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) return;

    // Reuses the same socket connection (and correct, environment-aware
    // URL) as the live chat feature, instead of opening a second one
    // hardcoded to a different host.
    const socket = getSocket(userId, isAdmin);
    if (!socket) return;

    // Debug success message
    socket.on('success', (data) => {
      console.log('✅ Backend says:', data);
    });

    // Listen to new notifications
    const handleAdmin = async () => {
      await dispatch(userListActions.count());
    };
    socket.on('admin', handleAdmin);

    // Cleanup on unmount
    return () => {
      socket.off('success');
      socket.off('admin', handleAdmin);
    };
  }, [dispatch, userId, isAdmin]);
}
