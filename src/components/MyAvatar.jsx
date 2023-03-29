// utils
import { useSelector } from 'react-redux';
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export const MyAvatar = ({ ...other }) => {
  const { user } = useSelector(s => s.authSlice);

  const displayName = user?.firstName + ' ' + user?.lastName;
  return (
    <Avatar src={user?.photoURL} alt={user?.firstName} color={user?.photoURL ? 'default' : createAvatar(displayName).color} {...other}>
      {createAvatar(user?.firstName).name}
    </Avatar>
  );
};
