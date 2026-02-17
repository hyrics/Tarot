import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BackButton } from "../../components/layout/BackButton";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("basic");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitBasic = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ ...formData, avatar });
    // 这里可以添加保存成功提示
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加密码修改逻辑
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("两次输入的新密码不一致");
      return;
    }
    // 调用API修改密码
    alert("密码修改成功");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <section className="profile-page">
      <div className="page-header">
        <BackButton>返回</BackButton>
        <h1 className="page-title">个人信息</h1>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === "basic" ? "active" : ""}`}
          onClick={() => setActiveTab("basic")}
        >
          基本信息
        </button>
        <button 
          className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          修改密码
        </button>
      </div>

      {activeTab === "basic" && (
        <form onSubmit={handleSubmitBasic} className="profile-form">
          <div className="form-group">
            <label>头像</label>
            <div className="avatar-upload">
              <div className="avatar-preview">
                <img src={avatar || "/images/default-avatar.png"} alt="用户头像" />
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="avatar-upload" className="upload-btn">
                更换头像
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">用户名</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="请输入用户名"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="请输入邮箱"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">手机号</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="请输入手机号"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">个人签名</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="介绍一下自己吧"
              rows={3}
            />
          </div>

          <button type="submit" className="primary-button">
            保存修改
          </button>
        </form>
      )}

      {activeTab === "password" && (
        <form onSubmit={handleSubmitPassword} className="profile-form">
          <div className="form-group">
            <label htmlFor="currentPassword">当前密码</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="请输入当前密码"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">新密码</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="请输入新密码"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">确认新密码</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="请再次输入新密码"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="primary-button">
            修改密码
          </button>
        </form>
      )}
    </section>
  );
}