import { FC, isValidElement } from 'react';
import { Avatar as MAvatar, AvatarGroup as MAvatarGroup } from '@mui/material';
import styles from './avatar.module.scss';

interface AvatarBaseProps {
  grouped?: boolean;
  type?: 'primary' | 'secondary';
  variant?: 'square' | 'rounded' | 'circular';
  className?: string;
  children?: React.ReactNode;
}

interface AvatarProps extends AvatarBaseProps {
  strict?: boolean;
  name?: string;
  src?: string;
}

interface AvatarGroupProps extends AvatarBaseProps {
  max?: number;
  total?: number;
  items?: AvatarProps[];
}

const stringToColor = (string: string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

const AvatarSingle: FC<AvatarProps> = (props) => {
  const { type = 'primary', variant = 'circular', className, strict, name, src, children } = props;

  if (!!src || isValidElement(children)) {
    return (
      <div className={`${styles.avatarWrapper} ${styles[type]}`}>
        <MAvatar alt={name} srcSet={src} variant={variant} className={className}>
          {children}
        </MAvatar>
      </div>
    );
  }
  if (src === undefined && (children !== undefined || !!name)) {
    if (!strict)
      return (
        <div className={`${styles.avatarWrapper}`}>
          <MAvatar {...stringAvatar(name ?? '')} variant={variant} className={className} />
        </div>
      );
    return (
      <div className={`${styles.avatarWrapper} ${styles[type]}`}>
        <MAvatar {...stringAvatar(name ?? '')} variant={variant} className={className} />
      </div>
    );
  }
};

const AvatarGroup: FC<AvatarGroupProps> = (props) => {
  const { type = 'primary', variant = 'circular', className, max, total, items } = props;

  return (
    <div className={`${styles.avatarWrapper} ${styles[type]}`}>
      <MAvatarGroup
        max={max}
        total={total}
        variant={variant}
        className={className}
        sx={{ '& .MuiAvatar-root': { border: 'none', margin: '0 0.1rem' } }}
      >
        {items?.map((item, index) => <AvatarSingle key={`${item.name} ${index}`} {...item} />)}
      </MAvatarGroup>
    </div>
  );
};

const Avatar: FC<AvatarBaseProps | AvatarProps | AvatarGroupProps> = (props) => {
  const { grouped = false } = props;
  if (grouped) {
    return <AvatarGroup {...props} />;
  }
  return <AvatarSingle {...props} />;
};

// EXAMPLE USAGE
{
  /* <div>
        Avatar with icon
        <Avatar name="test">
          <AddIcon />
        </Avatar>
      </div>
      <div>
        Avatar with Name not strict
        <Avatar name="Adway Byju">Adway Byju</Avatar>
      </div>
      <div>
        Avatar with Name strict
        <Avatar name="Adway Byju" strict>
          Adway Byju
        </Avatar>
      </div>
      <div>
        Avatar Group
        <Avatar
          grouped
          max={4}
          total={12}
          type="secondary"
          items={[
            { name: 'Adway Byju', src: 'https://picsum.photos/200/300' },
            { name: 'Adway Byju', src: 'https://picsum.photos/200/300' },
            { name: 'Adway Byju', src: 'https://picsum.photos/200/300' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
          ]}
        />
      </div> */
}

export { Avatar, AvatarProps, AvatarGroupProps };
