// 监听用户点击插件图标的事件
chrome.action.onClicked.addListener((tab) => {
  // 确保当前页面的URL是http或https协议，避免在chrome://等内部页面上运行
  if (tab.url.startsWith("http://") || tab.url.startsWith("https://")) {
    
    // 使用正则表达式找到URL中最后出现的一串数字
    // (\d+) 匹配一个或多个数字
    // (?!.*\d) 是一个负向先行断言，确保这串数字后面不再出现任何数字
    const newUrl = tab.url.replace(/(\d+)(?!.*\d)/, (match) => {
      // 将匹配到的数字字符串转换为整数，然后加1
      return parseInt(match, 10) + 1;
    });

    // 如果URL发生了变化（即成功找到了数字并增加了它）
    if (newUrl !== tab.url) {
      // 更新当前标签页的URL，实现页面跳转
      chrome.tabs.update(tab.id, { url: newUrl });
    } else {
      // 可选：如果URL中没有数字，可以给用户一个提示
      // 这里我们简单地在控制台打印一条日志
      console.log("URL Incrementer: No number found at the end of the URL.");
    }
  }
});