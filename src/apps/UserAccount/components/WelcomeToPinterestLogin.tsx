import React, { useState } from "react";
import Image from "next/image";
//@ts-ignore
import { motion } from "framer-motion";

import {
  Button,
  Flex,
  Box,
  TextField,
  Column,
  Image as Img,
  Text,
} from "gestalt";

import useFormAuth from "apps/UserAccount/hooks/useFormAuth";
import { useAuth } from "apps/UserAccount/hooks/useAuth";

const WelcomeToPinterestLogin = () => {
  const { formState, setValues, validations, isSubmitDisable, onSubmit } =
    useFormAuth();
  const { createAccount, errorsAuth, isLoadingCreated, signInGoogle } =
    useAuth();

  const handleSubmit = (data: any) => {
    createAccount(data);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={(e) => onSubmit(e, handleSubmit)}>
        <Flex justifyContent="end">
          <Box
            borderStyle="sm"
            paddingX={2}
            paddingY={3}
            rounding={8}
            width={480}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
              gap={2}
            >
              <Box padding={4}>
                <Flex alignItems="center" justifyContent="center">
                  <Image
                    width={40}
                    height={40}
                    alt="logo"
                    fill={false}
                    style={{
                      color: "red",
                      fill: "red",
                    }}
                    src="https://graffica.info/wp-content/uploads/2017/08/badgeRGB.png"
                    blurDataURL="https://graffica.info/wp-content/uploads/2017/08/badgeRGB.png"
                    placeholder="blur"
                  />
                </Flex>
              </Box>

              <Text inline size="600" weight="bold">
                Welcome to Pinterest
              </Text>
              <Text inline size="300">
                Find new ideas to try
              </Text>

              <Box maxWidth={300}>
                <Flex justifyContent="center" direction="column">
                  <Box padding={1} width={300}>
                    <TextField
                      errorMessage={
                        !errorsAuth.email
                          ? validations.emailError
                          : errorsAuth.email
                      }
                      autoComplete="email"
                      id="best-practices-do-label"
                      label="Email"
                      placeholder="Email"
                      onChange={({ value }) => setValues({ email: value })}
                      type="text"
                      value={formState.email}
                    />
                  </Box>
                  <Box padding={1} width={300}>
                    <TextField
                      errorMessage={
                        !errorsAuth.username
                          ? validations.usernameError
                          : errorsAuth.username
                      }
                      placeholder="Username"
                      autoComplete="username"
                      id="best-practices-do-label"
                      label="Username"
                      onChange={({ value }) => setValues({ username: value })}
                      type="text"
                      value={formState.username}
                    />
                  </Box>

                  <Box padding={1} width={300}>
                    <TextField
                      placeholder="Create a password"
                      autoComplete="new-password"
                      errorMessage={validations.passwordError}
                      id="best-practices-do-error-message"
                      label="Password"
                      onChange={({ value }) => setValues({ password: value })}
                      type="password"
                      value={formState.password}
                    />
                  </Box>
                  <Box padding={1} width={300}>
                    <TextField
                      autoComplete="new-password"
                      placeholder="Repeat Password"
                      errorMessage={validations.re_passwordError}
                      id="best-practices-do-error-message"
                      label="Re-Password"
                      onChange={({ value }) =>
                        setValues({ re_password: value })
                      }
                      type="password"
                      value={formState.re_password}
                    />
                  </Box>

                  <Box paddingY={5} width={300}>
                    <Flex
                      gap={{ column: 8, row: 0 }}
                      direction="column"
                      alignItems="stretch"
                      alignContent="stretch"
                      flex="grow"
                      width="100%"
                    >
                      <Flex
                        gap={{ column: 2, row: 0 }}
                        direction="column"
                        flex="grow"
                        width="100%"
                      >
                        <Button
                          text={isLoadingCreated ? "" : " Continue"}
                          type="submit"
                          disabled={isSubmitDisable}
                          size="lg"
                          color="red"
                          accessibilityExpanded
                          accessibilityHaspopup
                          fullWidth
                        />
                        <Flex justifyContent="center">
                          <Text>or</Text>
                        </Flex>
                        <Button
                          text={"Google"}
                          type="button"
                          onClick={() => signInGoogle()}
                          size="lg"
                          color="blue"
                          accessibilityExpanded
                          accessibilityHaspopup
                          fullWidth
                        />
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </form>
    </motion.div>
  );
};

export default WelcomeToPinterestLogin;
