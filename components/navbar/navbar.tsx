import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { usePathname } from "expo-router";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface NavbarItemProps {
  path: string;
  iconName: string;
  children: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  path,
  iconName,
  children,
}) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Pressable onPress={() => router.navigate(path)}>
      <View
        style={[
          style.navbarItem,
          { backgroundColor: isActive ? "blue" : undefined },
        ]}
      >
        {React.cloneElement(children as React.ReactElement<any>, {
          color: isActive ? "white" : "black",
          size: 38,
          name: iconName,
        })}
      </View>
    </Pressable>
  );
};

const Navbar: React.FC = () => {
  const pathname = usePathname();

  if (!pathname.startsWith("/home")) {
    return null;
  }

  return (
    <View style={style.navbarContainer}>
      <NavbarItem path="/home/home" iconName="home">
        <AntDesign />
      </NavbarItem>
      <NavbarItem path="/home/search" iconName="search1">
        <AntDesign />
      </NavbarItem>
      <NavbarItem path="/home/my_account" iconName="account-cog-outline">
        <MaterialCommunityIcons />
      </NavbarItem>
      <NavbarItem path="/home/about_idvault" iconName="info">
        <AntDesign />
      </NavbarItem>
    </View>
  );
};

const style = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  navbarItem: {
    borderRadius: 20,
    padding: 20,
  },
});

export default Navbar;
