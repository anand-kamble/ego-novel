import { Box, Button, Flex, Switch, Text } from '@radix-ui/themes'
import React, { useContext } from 'react'
import { DarkModeContext } from '../../contexts/DarkModeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router';
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

const Header = () => {

  const { loggedIn } = useSelector((state: RootState) => state.user);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const onChangeToggle = () => {
    setDarkMode(!darkMode);
  }

  const handleSignIn = () => {
    window.location.href = "/signin";
  }

  const goHome = () => {
    window.location.href = "/";
  }

  return (
    <Flex height="60px" align={"center"} gap={"3"} style={{ backgroundColor: "var(--accent-2)" }}>
      <Box px={"6"}>
        <Text as='div' size="6" onClick={goHome} style={{ cursor: "pointer" }}>
          Ego Novel
        </Text>
      </Box>
      <div style={{
        flexGrow: 1
      }}></div>

      {!loggedIn ? <Box px={"3"}>
        <Button variant="classic" onClick={handleSignIn}>Sign In</Button>
      </Box> : null}
      <Box px={"3"}>
        <Flex gap="2">
          <SunIcon />
          <Switch size="1" checked={darkMode} onClick={onChangeToggle} />
          <MoonIcon />
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
