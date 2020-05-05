import { Upload, Icon, Modal, message } from 'antd';
import React from 'react'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
// 用于图片上传的图片
export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,  //标识是否显示大图预览界面
    previewImage: '',         //大图的url
    fileList: [
      {
        uid: '-1',   //每个file有唯一的id，建议为负数，防止与内部产生的id冲突
        name: 'image.png',  //图片文件名
        status: 'done',     //图片状态：done-已经上传,uploading上传中，removed已删除，
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  getImgs = () => '124125';

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  /*file: 当前操作的图片文件（上传/删除）
  filelist： 所有已上传图片文件对象的数组
  */
  handleChange = ({ file,fileList }) => {
      console.log('handlechange()',file.status,file);

      // 一旦上传成功，将当前上传的file信息修正
      if(file.status === 'done'){
          const result = file.response;
          if(result.status===0) {
              message.success('上传成功');
              const {name,url} = result.data;
              file = fileList[fileList.length-1];
              file.name =name;
              file.url = url;
          }else{
              message.error('上传图片失败');
          }
      }

      //在操作（上传/删除）过程中更新
      this.setState({ fileList });
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"  //上传图片的接口地址
          accept='image/*'  //只接收图片格式
          listType="picture-card"   //展示图片的格式卡片模式，可为text文本模式
          name = 'image'  //请求参数名
          fileList={fileList}  //指定所有已上传文件列表
          onPreview={this.handlePreview}  //显示指定file的大图
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
