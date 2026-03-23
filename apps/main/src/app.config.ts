export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/components/index",
    "pages/tdesign-chat/index",
  ],
  subPackages: [
    {
      root: "pages/sub-one",
      pages: ["sub-chat/index"],
      independent: true,
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
