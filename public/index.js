const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) {
    el.parentElement.removeChild(el);
  }
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg} </div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.status === 200) {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/myintake');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.status === 200) {
      showAlert('success', 'Logged out successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error logging out!! Please try again.');
  }
};

const form = document.querySelector('.form--login');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const logoutBtn = document.getElementById('logout');
if (logoutBtn) logoutBtn.addEventListener('click', logout);

const signup = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/signup`,
      data,
    });
    if (res.status === 200) {
      console.log('done');
      showAlert('success', 'Account Created Successfully!');
      window.setTimeout(() => {
        location.assign('/myintake');
      }, 500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

const signupForm = document.getElementById('signup');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const data = {
      name,
      email,
      password,
      passwordConfirm,
    };
    signup(data);
  });
}

const addFoodEntry = async (food, userId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/updateCalorie`,
      data: {
        id: userId,
        food,
      },
    });
    if (res.status === 200) {
      window.setTimeout(() => {
        location.reload();
      }, 500);
    }
  } catch (error) {
    showAlert('error', 'Please enter the available food item.')
  }
};
const addFood = document.getElementById('add-food');

if (addFood) {
  console.log('kljkl');
  addFood.addEventListener('submit', (e) => {
    e.preventDefault();
    const food = document.getElementById('food-input').value;
    addFoodEntry(food, e.target.dataset.userId);
  });
}
