import React, {
  useState,
  useRef,
  ChangeEvent,
  FocusEvent,
  ReactElement,
} from "react";

import {
  Box,
  Text,
  TextArea,
  Popover,
  Dropdown,
  Button,
  Flex,
  IconButton,
  Avatar,
  TextField,
} from "gestalt";
import Textarea from "ui/components/textarea";
import { LayoutApp, LayoutHome } from "ui/components/layouts";

const PinBuilder = () => {
  return (
    <div className="">
      <Box
        borderStyle="shadow"
        margin={5}
        paddingY={3}
        paddingX={6}
        rounding={5}
      >
        <Flex justifyContent="between">
          <OrderDropdownExample />
          <CustomButtonPopoverBoard />
        </Flex>
        <Flex>
          <Box>
            {/* Drag an drop upload */}
            <Btn text="Guardar desde el sitio" />
          </Box>
          <Box>
            <Flex>
              <div>
                <Box width={300}>
                  <Textarea
                    getText={(text: string, valid: boolean) =>
                      console.log({ text, valid })
                    }
                    placeholder="Añadir un titulo"
                    fontSize={36}
                    max={50}
                    bold={true}
                  />
                </Box>

                <UserAvatar />
                <Box width={300}>
                  <Textarea
                    getText={(text: string, valid: boolean) =>
                      console.log({ text, valid })
                    }
                    placeholder="Description"
                    fontSize={18}
                    max={200}
                  />
                </Box>
                <Btn text="Add alternative text" />
                <Box width={300}>
                  <Textarea
                    getText={(text: string, valid: boolean) =>
                      console.log({ text, valid })
                    }
                    placeholder="More description"
                    fontSize={15}
                    max={50}
                  />
                </Box>
              </div>
              <div>
                <DestinationLink />
              </div>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

function OrderDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }: { item: any }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="selectlist-dropdown-example3"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="Menu"
        bgColor="lightGray"
        icon="ellipsis"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="xs"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="selectlist-dropdown-example3"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Delete Pin", label: "Delete Pin" }}
            selected={selected}
          />

          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Duplicate Pin", label: "Duplicate Pin" }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}
function TextAreaAbout() {
  const [open, setOpen] = React.useState(false);

  const errorAccessibilityLabel = "";

  const characterCount = 200;
  return (
    <Box width={400}>
      <TextArea
        label="Focus the TextArea to show the Popover"
        id="my-example"
        onChange={() => {}}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        maxLength={{ characterCount, errorAccessibilityLabel }}
      />
      {open && (
        <Text size="100">
          Describe your image with detail so visually impaired users can
          understand your Pin
        </Text>
      )}
    </Box>
  );
}

function UserAvatar() {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Avatar
        name="Shanice"
        accessibilityLabel="Shanice, Verified account"
        size="lg"
        src="https://i.ibb.co/7tGKGvb/shanice.jpg"
      />
      <Text>Shanice Palomino XD</Text>
    </Flex>
  );
}

interface btnProps {
  text?: string;
}

function Btn({ text = "Texto de boton" }: btnProps) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Button accessibilityLabel="Menu" size="lg" text={text} />
    </Flex>
  );
}

function DestinationLink() {
  return (
    <TextField
      id="textfieldexampleA11yVisible"
      onChange={() => {}}
      label=""
      size="lg"
    />
  );
}

function CustomButtonPopoverBoard() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="header-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="custom-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Section label="Currently in">
            <Dropdown.Link
              href="#"
              option={{ value: "item 1", label: "Custom link 1" }}
            >
              <Box width="100%">
                <Flex gap={2} alignItems="center">
                  <Avatar
                    name="Tia"
                    size="md"
                    src="https://i.ibb.co/7tGKGvb/shanice.jpg"
                  />
                  <Flex direction="column">
                    <Text>Tia Marz</Text>
                    <Text size="200" color="subtle">
                      Personal
                    </Text>
                    <Text size="200" color="subtle">
                      fffdfffffffffffffffff
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Dropdown.Link>
          </Dropdown.Section>
          <Dropdown.Section label="Your accounts">
            <Dropdown.Link
              href="#"
              option={{ value: "item 2", label: "Another custom link" }}
            >
              <Box width="100%">
                <Flex gap={2} alignItems="center">
                  <Avatar
                    name="Bruno"
                    size="md"
                    src="https://i.ibb.co/4Mbhbnb/Bruno.jpg"
                  />
                  <Flex direction="column">
                    <Text>Bruno</Text>
                    <Text size="200" color="subtle">
                      Business
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Dropdown.Link>
          </Dropdown.Section>
          <Dropdown.Section label="More options">
            <Dropdown.Link
              href="#"
              option={{ value: "settings", label: "Settings" }}
            />
            <Dropdown.Link
              href="#"
              isExternal
              option={{ value: "help", label: "Get help" }}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}

PinBuilder.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default PinBuilder;
