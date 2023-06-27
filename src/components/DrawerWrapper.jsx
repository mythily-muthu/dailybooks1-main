import { Drawer } from "antd";
import React from "react";

const DrawerWrapper = ({ setOpen, open, children }) => {
  return (
    <Drawer
      maskClosable={false}
      placement="right"
      closable={false}
      onClose={setOpen}
      open={open}
      getContainer={false}
      width="65%"
    >
      {children}
    </Drawer>
  );
};

export default DrawerWrapper;
