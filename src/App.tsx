import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div>Hello World</div>
    </ConfigProvider>
  );
}

export default App;
