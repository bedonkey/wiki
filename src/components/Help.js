import React from 'react';

export default class Help extends React.Component {
    render () {
        return <div>
            <h1> Hướng dẫn sử dụng </h1>
            <h5>Đăng nhập</h5>
            <img src="/images/login.png" width="400px" height="50px"/>
            <p>Đăng nhập qua <a href="/page/-KOpOKWivZ1k_3klLnlF">user domain của cty</a></p>
            <h5>Tìm kiếm hoặc thêm bài viết</h5>
            <img src="/images/search.png" width="400px"/>
            <h5>Sửa bài viết bài viết</h5>
            <p>Phải đăng nhập mới sửa được bài viết.</p>
            <img src="/images/edit.png" width="800px"/>B
            <p>Chọn text rồi click vào các biểu tượng dưới đây để:</p>
            <p><i className="fa fa-header" aria-hidden="true"></i> - Tạo header</p>
            <p><i className="fa fa-bold" aria-hidden="true"></i> - Bôi đậm chữ</p>
            <p><i className="fa fa-italic" aria-hidden="true"></i> - In nghiêng chữ</p>
            <p><i className="fa fa-link" aria-hidden="true"></i> - Tạo link đến các bài viết khác</p>
        </div>;
    }
}