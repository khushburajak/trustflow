import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    specifications: '',
    image: null
  });

  const categories = ['Electronics', 'Fashion', 'Home and Kitchen', 'Health and Beauty', 'Books', 'Accessories'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      showToastMessage('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const getAuthHeadersForFormData = () => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleEditClick = async (product) => {
    try {
      const response = await axios.get(`/api/products/${product._id}`);
      const productData = response.data;

      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        category: productData.category || '',
        specifications: productData.specifications || '',
        image: null
      });
      setSelectedProduct(productData);
      setShowEditModal(true);
    } catch (err) {
      console.error('Error fetching product details:', err);
      showToastMessage('Failed to load product details', 'error');
    }
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      specifications: '',
      image: null
    });
    setSelectedProduct(null);
    setShowAddModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/products/${selectedProduct._id}`, getAuthHeaders());
      setProducts(products.filter(p => p._id !== selectedProduct._id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
      showToastMessage('Product deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting product:', err);
      showToastMessage('Failed to delete product', 'error');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('specifications', formData.specifications);

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (selectedProduct) {
        const response = await axios.put(`/api/products/${selectedProduct._id}`, formDataToSend, getAuthHeadersForFormData());
        const updatedProducts = products.map(p =>
          p._id === selectedProduct._id ? response.data : p
        );
        setProducts(updatedProducts);
        setShowEditModal(false);
        showToastMessage('Product updated successfully', 'success');
      } else {
        const response = await axios.post('/api/products', formDataToSend, getAuthHeadersForFormData());
        setProducts([...products, response.data]);
        setShowAddModal(false);
        showToastMessage('Product added successfully', 'success');
      }

      setSelectedProduct(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        specifications: '',
        image: null
      });
    } catch (err) {
      console.error('Error saving product:', err);
      showToastMessage('Failed to save product', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      specifications: '',
      image: null
    });
  };

  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  };

  const addButtonStyles = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  };

  const tableContainerStyles = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyles = {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#333',
    borderBottom: '2px solid #dee2e6',
  };

  const tdStyles = {
    padding: '16px',
    borderBottom: '1px solid #dee2e6',
    color: '#555',
  };

  const actionButtonStyles = {
    padding: '6px 12px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  };

  const editButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#007bff',
    color: 'white',
  };

  const deleteButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const modalOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyles = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
  };

  const modalHeaderStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  };

  const formGroupStyles = {
    marginBottom: '16px',
  };

  const labelStyles = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#333',
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
  };

  const textareaStyles = {
    ...inputStyles,
    minHeight: '80px',
    resize: 'vertical',
  };

  const selectStyles = {
    ...inputStyles,
  };

  const modalButtonContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  };

  const primaryButtonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  };

  const secondaryButtonStyles = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  };

  const dangerButtonStyles = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  };

  const loadingStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  };

  const errorStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#dc3545',
  };

  const toastStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: toastType === 'success' ? '#28a745' : '#dc3545',
    color: 'white',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '300px',
    zIndex: 1001,
    animation: 'slideIn 0.3s ease-out',
  };

  const toastHiddenStyles = {
    display: 'none',
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: 'auto',
  };

  const styleSheet = document.styleSheets[0];
  if (styleSheet && !document.querySelector('#toast-animation-manage')) {
    const keyframes = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    const style = document.createElement('style');
    style.id = 'toast-animation-manage';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  if (loading) {
    return <div style={loadingStyles}>Loading products...</div>;
  }

  if (error && products.length === 0) {
    return <div style={errorStyles}>{error}</div>;
  }

  return (
    <div style={pageStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>Manage Products</h1>
        <button
          style={addButtonStyles}
          onClick={handleAddClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#218838';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#28a745';
          }}
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div style={tableContainerStyles}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Name</th>
              <th style={thStyles}>Description</th>
              <th style={thStyles}>Category</th>
              <th style={thStyles}>Specifications</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td style={tdStyles}>{product.name}</td>
                <td style={tdStyles}>
                  {product.description?.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </td>
                <td style={tdStyles}>{product.category}</td>
                <td style={tdStyles}>{product.specifications}</td>
                <td style={tdStyles}>
                  <button
                    style={editButtonStyles}
                    onClick={() => handleEditClick(product)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#0056b3';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#007bff';
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyles}
                    onClick={() => handleDeleteClick(product)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#c82333';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#dc3545';
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={modalOverlayStyles} onClick={closeModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Confirm Deletion</h2>
            <p>Are you sure you want to delete the product: <strong>{selectedProduct?.name}</strong>?</p>
            <div style={modalButtonContainerStyles}>
              <button style={secondaryButtonStyles} onClick={closeModal}>
                Cancel
              </button>
              <button style={dangerButtonStyles} onClick={handleDeleteConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div style={modalOverlayStyles} onClick={closeModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Edit Product</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={formGroupStyles}>
                <label style={labelStyles}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyles}
                  required
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={textareaStyles}
                  required
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={selectStyles}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Specifications</label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  style={textareaStyles}
                  required
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  style={inputStyles}
                  accept="image/*"
                />
              </div>

              <div style={modalButtonContainerStyles}>
                <button type="button" style={secondaryButtonStyles} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" style={primaryButtonStyles}>
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div style={modalOverlayStyles} onClick={closeModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Add New Product</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={formGroupStyles}>
                <label style={labelStyles}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyles}
                  required
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={textareaStyles}
                  required
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={selectStyles}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Specifications</label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  style={textareaStyles}
                  required
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  style={inputStyles}
                  accept="image/*"
                  required
                />
              </div>

              <div style={modalButtonContainerStyles}>
                <button type="button" style={secondaryButtonStyles} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" style={primaryButtonStyles}>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div style={showToast ? toastStyles : toastHiddenStyles}>
        <span style={{ fontSize: '20px' }}>
          {toastType === 'success' ? '✅' : '❌'}
        </span>
        <span style={{ flex: 1, fontWeight: '500' }}>
          {toastMessage}
        </span>
        <button onClick={handleCloseToast} style={closeButtonStyles}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ManageProducts;