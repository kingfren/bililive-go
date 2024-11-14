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

interface FileListProps extends RouteComponentProps<{ path: string }> {}

interface FileInfo {
  name: string;
  size: number;
  isDir: boolean;
  modTime: string;
}

export const FileList: React.FC<FileListProps> = ({ match, history }) => {
  const [files, setFiles] = React.useState<FileInfo[]>([]);
  const path = decodeURIComponent(match.params.path || '');

  const loadFiles = async () => {
    try {
      const response = await API.get(`/files/${path}`);
      setFiles(response.data);
    } catch (error) {
      console.error('加载文件列表失败:', error);
    }
  };

  React.useEffect(() => {
    loadFiles();
  }, [path]);

  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: FileInfo) => (
        <Link to={`/files/${path}/${text}`}>
          {record.isDir ? <FolderOutlined /> : <FileOutlined />} {text}
        </Link>
      ),
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      render: (size: number) => Utils.formatFileSize(size),
    },
    {
      title: '修改时间',
      dataIndex: 'modTime',
      key: 'modTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: FileInfo) => (
        <span>
          <a href={`/api/download/${path}/${record.name}`}>
            <DownloadOutlined /> 下载
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.name)}>
            <DeleteOutlined /> 删除
          </a>
        </span>
      ),
    },
  ];

  const handleDelete = async (fileName: string) => {
    try {
      await API.delete(`/files/${path}/${fileName}`);
      await loadFiles();
    } catch (error) {
      console.error('删除文件失败:', error);
    }
  };

  const breadcrumbItems = ['files', ...path.split('/')].map((item, index, arr) => {
    const itemPath = arr.slice(1, index + 1).join('/');
    return (
      <Breadcrumb.Item key={index}>
        {index === 0 ? (
          <Link to="/files">文件</Link>
        ) : (
          <Link to={`/files/${itemPath}`}>{item}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className="file-list">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      <Table 
        columns={columns} 
        dataSource={files}
        rowKey="name"
        pagination={false}
      />
    </div>
  );
};