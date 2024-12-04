import { Box, Flex, Switch, Text } from '@radix-ui/themes'
import React, { useContext } from 'react'
import { DarkModeContext } from '../../contexts/DarkModeContext';

const Header = () => {

  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const onChangeToggle = () => {
    setDarkMode(!darkMode);
  }

  return (
    <Flex height="60px" align={"center"} gap={"3"}  style={{backgroundColor:"var(--accent-2)"}}>
      <Box px={"6"}>
        <Text as='div' size="6">
          Ego Novel
        </Text>
      </Box>
      <div style={{
        flexGrow: 1
      }}></div>

      <Box px={"6"}>

        <Switch size="1" checked={darkMode} onClick={onChangeToggle} />
      </Box>
    </Flex>
  )
}

export default Header
