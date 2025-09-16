// 自执行函数，避免污染全局作用域
(() => {
  const currentUrl = window.location.href;
  const numberRegex = /(\d+)(?!.*\d)/; // 匹配URL中最后一个数字的正则表达式

  // 检查当前URL是否包含可以递增的数字
  if (numberRegex.test(currentUrl)) {
    // 1. 创建按钮元素
    const floatingButton = document.createElement('button');
    floatingButton.id = 'url-increment-floating-button';

    // 2. 获取图标的正确URL并设置为背景
    // chrome.runtime.getURL会返回插件内部文件的唯一、可访问的URL
    const iconUrl = chrome.runtime.getURL('icons/icon48.png');
    floatingButton.style.backgroundImage = `url(${iconUrl})`;

    // 3. 添加点击事件监听器
    floatingButton.addEventListener('click', () => {
      const newUrl = currentUrl.replace(numberRegex, (match) => {
        return parseInt(match, 10) + 1;
      });
      // 直接修改页面位置，实现跳转
      window.location.href = newUrl;
    });

    // 4. 将按钮添加到页面的body中
    document.body.appendChild(floatingButton);
  }
})();