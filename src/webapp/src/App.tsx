import React from 'react';
import { Layout } from 'antd';
import { RoomList } from './components/RoomList';
import './styles/App.css';

const { Header, Content } = Layout;

export const App: React.FC = () => {
  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <h1>直播监控</h1>
      </Header>
      <Content className="app-content">
        <RoomList />
      </Content>
    </Layout>
  );
};
