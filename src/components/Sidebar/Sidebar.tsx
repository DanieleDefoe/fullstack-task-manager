'use client';

import { useGlobalState } from '@/context';
import { arrowLeft, bars, dark, light, logout, menu } from '@/utilities';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import styled from 'styled-components';
import { Button } from '..';
import { UserButton, useClerk, useUser } from '@clerk/nextjs';

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  .toggle-nav {
    position: absolute;
    right: -66px;
    top: 1rem;
    padding: 0.8rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};

    background-color: ${(props) => props.theme.colorBg2};
    display: none;
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    justify-content: space-between;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorWhite};

    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: column;
    text-align: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};
      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;

      line-height: 1.4rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.55s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        transition: all 0.55s ease;
        object-fit: cover;
      }
    }

    > h1 {
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem;
    padding-left: 2.1rem;
    margin: 0.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;

    &::after {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: '';
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }

  .sign-out button:hover {
    color: ${(props) => props.theme.colorWhite} !important;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;
    transform: ${(props) =>
      props.collapsed ? 'translateX(calc(-100% - 1rem))' : 'translateX(0)'};
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 0.1);

    .toggle-nav {
      display: block;
    }
  }
`;

export function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const { user } = useUser();

  const { firstName, lastName, imageUrl } = user! || {
    firstName: '',
    lastName: '',
    imageUrl: '',
  };

  const handleClick = (link: string) => {
    router.push(link);
  };

  const handleSignOut = async () => {
    await signOut(() => router.push('/signin'));
  };

  return (
    <SidebarStyled theme={theme} collapsed={collapsed ? true : false}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>

        {imageUrl && (
          <div className="image">
            <Image
              src={imageUrl}
              priority
              alt="avatar"
              width={70}
              height={70}
            />
          </div>
        )}
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        {(firstName || lastName) && (
          <h1 className="capitalize">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </h1>
        )}
      </div>
      <ul className="nav-items">
        {menu.map(({ id, icon, link, title }) => (
          <li
            key={id}
            className={`nav-item ${pathname === link ? 'active' : ''}`}
            onClick={() => handleClick(link)}
          >
            {icon}
            <Link href={link}>{title}</Link>
          </li>
        ))}
      </ul>
      <div className="sign-out relative mb-[1.5rem] ml-auto mr-auto">
        <Button
          name="Sign Out"
          type="submit"
          padding="0.4rem 0.8rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          icon={logout}
          click={handleSignOut}
        />
      </div>
    </SidebarStyled>
  );
}
