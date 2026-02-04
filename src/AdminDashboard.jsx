import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Sample initial data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      mobile: '+1 (555) 123-4567',
      class: 'Premium',
      paymentStatus: 'Paid',
      paymentAmount: '$299',
      paymentDate: '2024-01-15',
      joinDate: '2023-12-01'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      mobile: '+1 (555) 234-5678',
      class: 'Standard',
      paymentStatus: 'Pending',
      paymentAmount: '$149',
      paymentDate: '2024-01-20',
      joinDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      mobile: '+1 (555) 345-6789',
      class: 'Premium',
      paymentStatus: 'Paid',
      paymentAmount: '$299',
      paymentDate: '2024-01-18',
      joinDate: '2023-11-15'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.k@example.com',
      mobile: '+1 (555) 456-7890',
      class: 'Basic',
      paymentStatus: 'Paid',
      paymentAmount: '$79',
      paymentDate: '2024-01-22',
      joinDate: '2024-01-05'
    }
  ]);

  const [classes, setClasses] = useState([
    { id: 1, name: 'Basic', price: '$79', features: '5 Features' },
    { id: 2, name: 'Standard', price: '$149', features: '10 Features' },
    { id: 3, name: 'Premium', price: '$299', features: 'Unlimited Features' }
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    mobile: '',
    class: 'Basic',
    paymentStatus: 'Pending',
    paymentAmount: '',
    paymentDate: '',
  });

  const [newClass, setNewClass] = useState({
    name: '',
    price: '',
    features: ''
  });

  // Stats calculation
  const stats = {
    totalUsers: users.length,
    paidUsers: users.filter(u => u.paymentStatus === 'Paid').length,
    pendingPayments: users.filter(u => u.paymentStatus === 'Pending').length,
    totalRevenue: users
      .filter(u => u.paymentStatus === 'Paid')
      .reduce((sum, u) => sum + parseFloat(u.paymentAmount.replace('$', '')), 0)
  };

  // Handle add user
  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setNewUser({
      name: '',
      email: '',
      mobile: '',
      class: 'Basic',
      paymentStatus: 'Pending',
      paymentAmount: '',
      paymentDate: ''
    });
    setShowAddUserModal(false);
  };

  // Handle delete user
  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(user => user.id !== id));
      setSelectedUser(null);
    }
  };

  // Handle add class
  const handleAddClass = (e) => {
    e.preventDefault();
    const newClassItem = {
      id: classes.length + 1,
      ...newClass
    };
    setClasses([...classes, newClassItem]);
    setNewClass({ name: '', price: '', features: '' });
    setShowAddClassModal(false);
  };

  // Handle delete class
  const handleDeleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== id));
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm)
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="9"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </div>
            <h2>AdminHub</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Users</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span>Classes</span>
          </button>

          <button className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>Analytics</span>
          </button>

          <button className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m8.66-13.66l-4.24 4.24m-4.24 4.24l-4.24 4.24m13.66.42l-4.24-4.24m-4.24-4.24L3.34 3.34"></path>
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">AD</div>
            <div className="admin-info">
              <p className="admin-name">Admin User</p>
              <p className="admin-role">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>{activeTab === 'users' ? 'User Management' : 'Class Management'}</h1>
            <p className="subtitle">Monitor and manage your {activeTab}</p>
          </div>
          <div className="header-right">
            <button className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          </div>
        </header>

        {activeTab === 'users' && (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card card-blue">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Users</p>
                  <h3 className="stat-value">{stats.totalUsers}</h3>
                </div>
              </div>

              <div className="stat-card card-green">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Paid Users</p>
                  <h3 className="stat-value">{stats.paidUsers}</h3>
                </div>
              </div>

              <div className="stat-card card-orange">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Pending</p>
                  <h3 className="stat-value">{stats.pendingPayments}</h3>
                </div>
              </div>

              <div className="stat-card card-purple">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Revenue</p>
                  <h3 className="stat-value">${stats.totalRevenue}</h3>
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="table-controls">
              <div className="search-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="add-btn" onClick={() => setShowAddUserModal(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add User
              </button>
            </div>

            {/* Users Table */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Contact</th>
                    <th>Class</th>
                    <th>Payment Status</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} onClick={() => setSelectedUser(user)}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                          <div>
                            <p className="user-name">{user.name}</p>
                            <p className="user-email">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{user.mobile}</td>
                      <td>
                        <span className={`class-badge badge-${user.class.toLowerCase()}`}>
                          {user.class}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.paymentStatus.toLowerCase()}`}>
                          {user.paymentStatus}
                        </span>
                      </td>
                      <td className="amount">{user.paymentAmount}</td>
                      <td>{user.paymentDate}</td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(user.id);
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'classes' && (
          <>
            <div className="classes-header">
              <button className="add-btn" onClick={() => setShowAddClassModal(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create New Class
              </button>
            </div>

            <div className="classes-grid">
              {classes.map(cls => (
                <div key={cls.id} className="class-card">
                  <div className="class-header">
                    <h3>{cls.name}</h3>
                    <button
                      className="delete-icon-btn"
                      onClick={() => handleDeleteClass(cls.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  <div className="class-price">{cls.price}</div>
                  <p className="class-features">{cls.features}</p>
                  <div className="class-users">
                    {users.filter(u => u.class === cls.name).length} users enrolled
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay" onClick={() => setShowAddUserModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="close-btn" onClick={() => setShowAddUserModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={newUser.mobile}
                  onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Class</label>
                  <select
                    value={newUser.class}
                    onChange={(e) => setNewUser({ ...newUser, class: e.target.value })}
                  >
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Status</label>
                  <select
                    value={newUser.paymentStatus}
                    onChange={(e) => setNewUser({ ...newUser, paymentStatus: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Payment Amount</label>
                  <input
                    type="text"
                    required
                    value={newUser.paymentAmount}
                    onChange={(e) => setNewUser({ ...newUser, paymentAmount: e.target.value })}
                    placeholder="$299"
                  />
                </div>
                <div className="form-group">
                  <label>Payment Date</label>
                  <input
                    type="date"
                    required
                    value={newUser.paymentDate}
                    onChange={(e) => setNewUser({ ...newUser, paymentDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddUserModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="modal-overlay" onClick={() => setShowAddClassModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Class</h2>
              <button className="close-btn" onClick={() => setShowAddClassModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddClass}>
              <div className="form-group">
                <label>Class Name</label>
                <input
                  type="text"
                  required
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  placeholder="Enterprise"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  required
                  value={newClass.price}
                  onChange={(e) => setNewClass({ ...newClass, price: e.target.value })}
                  placeholder="$499"
                />
              </div>
              <div className="form-group">
                <label>Features</label>
                <input
                  type="text"
                  required
                  value={newClass.features}
                  onChange={(e) => setNewClass({ ...newClass, features: e.target.value })}
                  placeholder="20 Features"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddClassModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Detail Panel */}
      {selectedUser && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>User Details</h3>
            <button className="close-btn" onClick={() => setSelectedUser(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="detail-content">
            <div className="detail-avatar-large">
              {selectedUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2>{selectedUser.name}</h2>
            <p className="detail-email">{selectedUser.email}</p>

            <div className="detail-section">
              <h4>Contact Information</h4>
              <div className="detail-item">
                <span className="detail-label">Mobile</span>
                <span className="detail-value">{selectedUser.mobile}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{selectedUser.email}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Membership</h4>
              <div className="detail-item">
                <span className="detail-label">Class</span>
                <span className={`class-badge badge-${selectedUser.class.toLowerCase()}`}>
                  {selectedUser.class}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Join Date</span>
                <span className="detail-value">{selectedUser.joinDate}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Payment Information</h4>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={`status-badge ${selectedUser.paymentStatus.toLowerCase()}`}>
                  {selectedUser.paymentStatus}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Amount</span>
                <span className="detail-value">{selectedUser.paymentAmount}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment Date</span>
                <span className="detail-value">{selectedUser.paymentDate}</span>
              </div>
            </div>

            <button
              className="danger-btn"
              onClick={() => handleDeleteUser(selectedUser.id)}
            >
              Remove User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;