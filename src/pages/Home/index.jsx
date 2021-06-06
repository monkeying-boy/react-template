import Demo from '@/components/Demo'
import SvgIcon from '@/icons/SvgIcon'
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function Home(params) {
  return(
    <div>
      home 组件
      <Demo></Demo>
      -------
      <SvgIcon iconClass="chart"/>
      <Tooltip title="search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
    </div>
  )
}