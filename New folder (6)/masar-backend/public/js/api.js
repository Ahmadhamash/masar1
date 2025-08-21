// API Configuration and Helper Functions
class MasarAPI {
  constructor() {
    this.baseURL = '/api';
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Package methods
  async getPackages(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/packages${queryString ? '?' + queryString : ''}`);
  }

  async getPackage(id) {
    return this.request(`/packages/${id}`);
  }

  async createPackage(packageData) {
    return this.request('/packages', {
      method: 'POST',
      body: JSON.stringify(packageData)
    });
  }

  async updatePackage(id, packageData) {
    return this.request(`/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(packageData)
    });
  }

  async deletePackage(id) {
    return this.request(`/packages/${id}`, {
      method: 'DELETE'
    });
  }

  // Mentor methods
  async getMentors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/mentors${queryString ? '?' + queryString : ''}`);
  }

  async createMentor(mentorData) {
    return this.request('/mentors', {
      method: 'POST',
      body: JSON.stringify(mentorData)
    });
  }

  async updateMentor(id, mentorData) {
    return this.request(`/mentors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mentorData)
    });
  }

  async deleteMentor(id) {
    return this.request(`/mentors/${id}`, {
      method: 'DELETE'
    });
  }

  // Order methods
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/orders${queryString ? '?' + queryString : ''}`);
  }

  async getOrderStats() {
    return this.request('/orders/stats');
  }

  // User methods
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/users${queryString ? '?' + queryString : ''}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    });
  }

  async getUserStats() {
    return this.request('/users/stats');
  }

  // Holland Assessment methods
  async getHollandQuestions() {
    return this.request('/holland/questions');
  }

  async submitHollandAssessment(answers) {
    return this.request('/holland/submit', {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  }

  // AI methods
  async generateLearningPath(specialty) {
    return this.request('/ai/learning-path', {
      method: 'POST',
      body: JSON.stringify({ specialty })
    });
  }

  // Session methods
  async getSessions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/sessions${queryString ? '?' + queryString : ''}`);
  }

  async createSession(sessionData) {
    return this.request('/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  }

  async updateSessionStatus(id, status, notes) {
    return this.request(`/sessions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes })
    });
  }

  async submitFeedback(sessionId, rating, comment) {
    return this.request(`/sessions/${sessionId}/feedback`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment })
    });
  }
}

// Initialize API instance
const api = new MasarAPI();