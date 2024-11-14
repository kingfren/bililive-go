import React from "react";
import API from "../../utils/api";
import { Breadcrumb, Divider, Table } from "antd";
import { 
  FileOutlined, 
  FolderOutlined,
  DeleteOutlined,
  DownloadOutlined 
} from '@ant-design/icons';
import { Link, RouteComponentProps } from "react-router-dom";
import Utils from "../../utils/common";
import './file-list.css';

// ... 其他代码保持不变

// 使用新的图标组件
// 原来的 <Icon type="file" /> 改为 <FileOutlined />
// 原来的 <Icon type="folder" /> 改为 <FolderOutlined />
// 以此类推 