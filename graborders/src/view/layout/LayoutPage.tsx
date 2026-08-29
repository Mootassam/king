import React from "react";
import TabBottomNavigator from "./TabBottomNavigator";
import ScrollToTop from "./ScrollToTop";
import ChatWidget from "src/view/shared/chat/ChatWidget";
function LayoutPage(props) {
  return (
    <div className="">
      {/* <Header /> */}
      <ScrollToTop />
      <div className="children__content">{props.children}</div>
      <TabBottomNavigator />
      <ChatWidget />
    </div>
  );
}

export default LayoutPage;
