import useUser from "apps/UserAccount/hooks/useUser";
import {
  Flex,
  Button,
  Box,
  Dropdown,
  Icon,
  SearchField,
  IconButton,
  Avatar,
  Mask,
  TapArea,
  Tooltip,
} from "gestalt";
import React, { FC, useEffect, useRef, useState } from "react";

type ChildrenJSX = {
  children: JSX.Element;
};

export const LayoutHome: FC<ChildrenJSX> = ({ children }) => {
  return (
    <div>
      <nav className="flex justify-between items-center py-3 p-5">
        <div className="flex items-center">
          <svg
            height="32"
            width="32"
            fill="red"
            viewBox="0 0 24 24"
            aria-label="Pinterest"
            role="img"
          >
            <path d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"></path>
          </svg>
          <span className="text-red-600 font-bold text-lg ml-2">Pinterest</span>
        </div>
        <div className="flex items-center">
          <ul className="hidden md:flex items-center">
            <li className="mx-4">
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                About
              </a>
            </li>
            <li className="mx-4">
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                Business
              </a>
            </li>
            <li className="mx-4">
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                Press
              </a>
            </li>
          </ul>
          <button className="mx-2 py-2 px-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700">
            Log in
          </button>
          <button className="mx-2 py-2 px-4 rounded-full bg-gray-300 font-semibold hover:bg-gray-400">
            Sign up
          </button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export const LayoutApp: FC<ChildrenJSX> = ({ children }) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="">
      <nav className="flex items-center justify-between flex-wrap p-3">
        <Flex alignItems="center" flex="grow" gap={{ row: 2, column: 0 }}>
          <TapArea fullHeight>
            <Icon
              accessibilityLabel="Pinterest"
              color="brandPrimary"
              icon="pinterest"
              size={20}
            />
          </TapArea>
          <div className="hidden sm:block">
            <BtnNormal />
          </div>
          <BtnDropdownExample />
          <Flex.Item flex="grow">
            <div className="hidden md:block">
              <SearchField
                size="md"
                accessibilityLabel="Search all of Pinterest"
                accessibilityClearButtonLabel="Clear search field"
                id="searchFieldA11yExample"
                onChange={({ value }) => setValue(value)}
                placeholder="Search and explore"
                value={value}
              />
            </div>
            <div className="block md:hidden">
              <IconButton
                accessibilityLabel="Profile"
                icon="search"
                size="lg"
              />
            </div>
          </Flex.Item>
          <Flex
            justifyContent="center"
            gap={{ row: 0, column: 0 }}
            alignItems="center"
          >
            <Tooltip text="Jaime es Kbro :V">

            <IconButton
              accessibilityLabel="Notifications"
              icon="speech-ellipsis"
              size="lg"
              />
            </Tooltip>
            <Tooltip text="Cristorata">
              
            <IconButton accessibilityLabel="Profile" icon="bell" size="lg" />
            </Tooltip>
            <Tooltip text="Chin Chin fan de DC">
              
            <IconButton
              accessibilityLabel="Profile"
              icon="speech-ellipsis"
              size="lg"
              />
              </Tooltip>
            <Tooltip  text="You profile" inline>

            <Box
              color="lightWash"
              onMouseDown={() => null}
              onMouseUp={() => null}
              padding={2}
              rounding="circle"
            >
              <Avatar
                size="xs"
                src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
                name="Keerthi"
                />
            </Box>
                </Tooltip>
            <Tooltip text="Alvaro gil" inline>

            <IconButton
              accessibilityLabel="Profile"
              icon="arrow-down"
              size="xs"
              />
              </Tooltip>
          </Flex>
        </Flex>
      </nav>

      <main>{children}</main>
    </div>
  );
};

// 850 - > ocultar boton home
//650 -- > coultar la barra de busqueda , solo icon hacia la derecha

function BtnDropdownExample() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const anchorRef = useRef(null);

  const onSelect = ({ item }) => setSelected(item);

  return (
    <Box display="flex" justifyContent="center" width="100%" height="80%">
      <Button
        color="transparent"
        accessibilityControls="action-variant-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        size="md"
        text={"Create"}
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="action-variant-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Cozy", label: "Cozy" }}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Comfy", label: "Comfy" }}
          />
        </Dropdown>
      )}
    </Box>
  );
}

function BtnNormal() {
  return (
    <Flex alignItems="center" height="80%" justifyContent="center" width="100%">
      <Button accessibilityLabel="Following" text="Home" selected size="md" />
    </Flex>
  );
}
