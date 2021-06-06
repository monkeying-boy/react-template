import { useHistory } from "react-router-dom";
import { Button } from "antd";
export default function NoMatch() {
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }
  return <>
    404 页面
    <Button onClick={handleClick}>回到首页</Button>
  </>;
}
